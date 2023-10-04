
const fileInputNormal = document.getElementById("fileInputNormal");
const fileUploadNormal = document.getElementById("fileUploadNormal");


const normalFileName = document.getElementById("normalFileName");

fileInputNormal.onclick = (event) => {
  fileUploadNormal.click();
};



fileUploadNormal.addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file) {
    normalFileName.innerHTML = '正常字体选中为: ' + file.name;
  } else {
    normalFileName.innerHTML = '未选择文件';
  }
});

function uploadFile() {
  const normal = fileUploadNormal.files[0];
  if (normal == null) {
    alert("请选择背景文件");
    return;
  }
  tip.innerHTML = '正在上传';
  

  if (normal != null) {
    var formData = new FormData();
    formData.append("normal", normal);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/upload/background/", true);
    xhr.onload = function () {
        alert("文件上传完毕");
        tip.innerHTML = '上传完毕'; 
    };
    xhr.send(formData);
  }
}
