var progress = 0;
var progress_max = 0;

const fileInputNormal = document.getElementById("fileInputNormal");
const fileUploadNormal = document.getElementById("fileUploadNormal");

const fileInputBold = document.getElementById("fileInputBold");
const fileUploadBold = document.getElementById("fileUploadBold");

const normalFileName = document.getElementById("normalFileName");
const boldFileName = document.getElementById("boldFileName");

var uploadCounter = 0; // 记录已上传的文件数量

fileInputNormal.onclick = (event) => {
  fileUploadNormal.click();
};

fileInputBold.onclick = (event) => {
  fileUploadBold.click();
};

fileUploadBold.addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file) {
    boldFileName.innerHTML = '粗体字体选中为: ' + file.name;
  } else {
    boldFileName.innerHTML = '未选择文件';
  }
});


fileUploadNormal.addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file) {
    normalFileName.innerHTML = '正常字体选中为: ' + file.name;
  } else {
    normalFileName.innerHTML = '未选择文件';
  }
});

function uploadFile() {
  const bold = fileUploadBold.files[0];
  const normal = fileUploadNormal.files[0];
  if (bold == null && normal == null) {
    alert("请选择字体文件");
    return;
  }
  tip.innerHTML = '正在上传';
  if (bold != null) {
    var formData = new FormData();
    formData.append("bold", bold);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/upload/boldFont/", true);
    xhr.onload = function () {
      uploadCounter++;
      if (uploadCounter === 2) {
        tip.innerHTML = '上传完毕';
        uploadCounter = 0; // 重置计数器
      }
    };
    xhr.send(formData);
  }

  if (normal != null) {
    var formData = new FormData();
    formData.append("normal", normal);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/upload/normalFont/", true);
    xhr.upload.onprogress = function (e) {
      if (e.lengthComputable) {
        console.log(e.loaded,e.total)
        console.log(e.loaded/e.total*100)
      }
    };
    xhr.onload = function () {
      uploadCounter++;
      if (uploadCounter === 2) {
        tip.innerHTML = '上传完毕';
        uploadCounter = 0; // 重置计数器
      }
    };
    xhr.send(formData);
  }
}
