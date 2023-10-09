window.onload = function () {
// HTML 요소 가져오기
const targetImageContainer = document.getElementById('target_image_container');
const sourceImageContainer = document.getElementById('source_image_container');

// data-mydata 속성에서 데이터 가져오기
const targetBboxList = JSON.parse(targetImageContainer.getAttribute('data-mydata'));
const sourceBboxList = JSON.parse(sourceImageContainer.getAttribute('data-mydata'));
console.log(targetBboxList)
console.log(sourceBboxList)

function drawBoundingBoxes(container, bboxList, containerType) {
    // 이미지 요소 가져오기
    const image = container.querySelector('img');
        
    // 이미지의 원래 크기 가져오기
    const originalImageWidth = image.naturalWidth;
    const originalImageHeight = image.naturalHeight;
    
    // 이미지의 현재 크기 가져오기
    const currentImageWidth = image.width;
    const currentImageHeight = image.height;
    
    // 크기 비율 계산
    const widthRatio = currentImageWidth / originalImageWidth;
    const heightRatio = currentImageHeight / originalImageHeight;

    for (let i = 0; i < bboxList.length; i++) {
        
        const bbox = bboxList[i];
        console.log(bboxList[i])

        // Create a container div for the checkbox and image
        const contCheckbox = document.createElement("div");
        contCheckbox.className = "cont-checkbox";

        // Create the checkbox input element
        const checkboxInput = document.createElement("input");
        if (containerType == 'target'){
        checkboxInput.type = "checkbox";
        checkboxInput.id = `${containerType}-${i}`;
        checkboxInput.name = `${containerType}_checkbox`; // name 속성 설정
        checkboxInput.value = i; // value 속성 설정
        contCheckbox.className = "cont-checkbox";
        } else {
        checkboxInput.type = "radio";
        checkboxInput.id = `${containerType}-${i}`;
        checkboxInput.name = `${containerType}_checkbox`; // name 속성 설정
        checkboxInput.value = i; // value 속성 설정
        contCheckbox.className = "cont-checkbox";
        checkboxInput.required = true; // required 속성 추가
        }         
                
        // Create the label element for checkbox
        const label = document.createElement("label");
        label.htmlFor = `${containerType}-${i}`;

        // Create the div for info text
        const infoDiv = document.createElement("div");
        infoDiv.className = "info";
        infoDiv.textContent = "Object " + i; // Replace with the appropriate label

        // bbox의 좌표를 이미지 크기에 맞게 조정
        const adjustedX = bbox[0] * widthRatio;
        const adjustedY = bbox[1] * heightRatio;
        const adjustedWidth = (bbox[2] - bbox[0]) * widthRatio;
        const adjustedHeight = (bbox[3] - bbox[1]) * heightRatio;

        // Set the position and size of the container div
        contCheckbox.style.position = "absolute";
        contCheckbox.style.left = adjustedX + "px";
        contCheckbox.style.top = adjustedY + "px";
        contCheckbox.style.width = adjustedWidth + "px";
        contCheckbox.style.height = adjustedHeight + "px";
        contCheckbox.style.border = "2px solid blue";

        // Append all elements to the container
        label.appendChild(contCheckbox);
        contCheckbox.appendChild(checkboxInput);

        // Add the container div to the specified container
        container.appendChild(label);

        // // 클릭 이벤트 처리 (각각의 사각형에 대해 클릭 이벤트 핸들러 생성)
        // contCheckbox.addEventListener("click", createClickHandler(i));
    }
}

// target와 source에 대해 BBox 그리기
drawBoundingBoxes(targetImageContainer, targetBboxList, 'target');
drawBoundingBoxes(sourceImageContainer, sourceBboxList, 'source');

document.getElementById("swapform").addEventListener("submit", function(event) {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var checked = false;

    checkboxes.forEach(function(checkbox) {
    if (checkbox.checked) {
        checked = true;
    }
    });

    if (!checked) {
    alert("체크박스에서 하나 이상의 옵션을 선택하세요.");
    event.preventDefault(); // 폼 제출을 취소합니다.
    }
});

}