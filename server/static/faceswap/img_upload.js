function DropFile(dropAreaId, fileListId) {
let dropArea = document.getElementById(dropAreaId);
let fileList = document.getElementById(fileListId);


function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight(e) {
    preventDefaults(e);
    dropArea.classList.add("highlight");
}

function unhighlight(e) {
    preventDefaults(e);
    dropArea.classList.remove("highlight");
}

function handleDrop(e) {
    preventDefaults(e);
    // unhighlight(e);
    let dt = e.dataTransfer;
    let files = dt.files;

    // 드래그 앤 드롭으로 받은 파일을 input 요소에 할당
    document.getElementById("source_image").files = files;

    handleFiles(files);

    const fileList = document.getElementById(fileListId);
    if (fileList) {
    fileList.scrollTo({ top: fileList.scrollHeight });
    }
}

function handleFiles(files) {
    files = [...files];
    files.forEach(previewFile);
    files.forEach(previewImage);
}

function previewFile(file) {
    let filediv = fileList.childNodes[0]
    console.log(file);
    fileList.replaceChild(renderFile(file),filediv);
}

function renderFile(file) {
    let fileDOM = document.createElement("div");
    fileDOM.className = "file";
    fileDOM.id = "file";

    // 파일 크기를 받아옵니다.
    let fileSize = file.size;
    let fileSizeFormatted;

    // 파일 크기를 KB 또는 MB 단위로 변환합니다.
    if (fileSize < 1024) {
    fileSizeFormatted = fileSize + " B";
    } else if (fileSize < 1024 * 1024) {
    fileSizeFormatted = (fileSize / 1024).toFixed(2) + " KB";
    } else {
    fileSizeFormatted = (fileSize / (1024 * 1024)).toFixed(2) + " MB";
    }

    fileDOM.innerHTML = `
    <div class="thumbnail">
        <img src="https://img.icons8.com/pastel-glyph/2x/image-file.png" alt="파일타입 이미지" class="image">
    </div>
    <div class="details">
        <header class="header">
        <span class="name">${file.name}</span>
        <span class="size">${fileSizeFormatted}</span>
        </header>
        <div class="progress">
        <div class="bar"></div>
        </div>
        <div class="status">
        <span class="percent">100% done</span>
        </div>
    </div>
    `;
    return fileDOM;
}

function previewImage(file) {
    
    if (file.type.startsWith("image/")) {
    let reader = new FileReader();

    reader.onload = function(event) {
        let img = new Image();
        img.src = event.target.result;

        img.onload = function() {
        let maxWidth = 300;
        let maxHeight = 220;
        let width = img.width;
        let height = img.height;

        // 이미지 크기를 제한하고 비율을 유지합니다.
        if (width > maxWidth || height > maxHeight) {
            if (width / maxWidth > height / maxHeight) {
            width = maxWidth;
            height = width * (img.height / img.width);
            } else {
            height = maxHeight;
            width = height * (img.width / img.height);
            }
        }

        let thumbnail = document.createElement("img");
        thumbnail.src = event.target.result;
        thumbnail.alt = "이미지 미리보기";
        thumbnail.className = "thumbnail";
        thumbnail.style.maxWidth = maxWidth + "px";
        thumbnail.style.maxHeight = maxHeight + "px";
        thumbnail.style.width = width + "px";
        thumbnail.style.height = height + "px";

        // <div class="preview"> 요소를 가져옵니다.
        let fileListChildNode1 = fileList.childNodes[1]
        previewDiv = document.createElement("div");
        previewDiv.className = "file";

        // <div class="preview"> 요소가 존재하지 않으면 생성하고 썸네일을 추가합니다.
        if (!fileListChildNode1) {
            fileList.appendChild(previewDiv); // 혹은 다른 부모 요소에 추가할 수 있습니다.
            previewDiv.appendChild(thumbnail);
        } else{
            fileList.replaceChild(previewDiv,fileListChildNode1);
            previewDiv.appendChild(thumbnail);
        }
        };
    };

    reader.readAsDataURL(file);
    }
}

dropArea.addEventListener("dragenter", highlight, false);
dropArea.addEventListener("dragover", highlight, false);
dropArea.addEventListener("dragleave", unhighlight, false);
dropArea.addEventListener("drop", handleDrop, false);

return {
    handleFiles
};
}

const dropFile = new DropFile("drop-file", "files");