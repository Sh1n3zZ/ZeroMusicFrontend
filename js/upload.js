var progress = 0
var progress_max = 0

const fileToUpload = document.getElementById("fileToUpload")
const fileInput = document.getElementById("fileInput")

fileInput.onclick = (event) => {
  fileToUpload.click();
}

const fileList = document.getElementById('fileList');
var selectedFiles = [];

// 监听文件选择事件
fileToUpload.addEventListener('change', function (event) {
  const files = event.target.files; // 获取选中的文件对象

  // 遍历文件列表，创建并添加文件项
  for (let i = 0; i < files.length; i++) {
    selectedFiles.push(files[i])
    const file = files[i];
    const listItem = document.createElement('li');
    const fileName = document.createTextNode(file.name);
    listItem.className = "List4DvemiS4ever";
    const deleteButton = document.createElement('button');
    const text = document.createTextNode('删除');
    deleteButton.appendChild(text);
    deleteButton.addEventListener('click', function () {
      listItem.remove(); // 点击删除按钮时移除文件项
      selectedFiles.remove(files)
    });

    listItem.appendChild(fileName);
    listItem.appendChild(deleteButton);
    fileList.appendChild(listItem);
  }
});

function uploadFile() {
  var files = selectedFiles;
  var currentIndex = 0;

  if (files.length === 0) {
    alert("请选择文件！");
  } else {
    progress = 0;
    progress_max = files.length;
    var fileProgress = document.getElementById("fileProgress");
    fileProgress.max = progress_max;
    fileProgress.value = 0;
    function uploadNextFile() {
      var file = files[currentIndex];
      var formData = new FormData();
      formData.append("file", file);
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "/upload/", true);
      xhr.onload = function () {
        if (xhr.status === 200) {
          console.log("上传完成：" + xhr.responseText);
          currentIndex++;
          refreshProgress();
          if (currentIndex < files.length) {
            uploadNextFile(); // 继续上传下一个文件
          }
        } else {
          refreshProgress();
          console.error("上传失败：" + xhr.status);
          alert(file.name + " 上传错误");
        }
      };

      xhr.send(formData);
    }

    uploadNextFile(); // 开始上传第一个文件
  }
}



function handleFileSelect(event) {
  var files = event.target.files;

  for (var i = 0; i < files.length; i++) {
    selectedFiles.push(files[i]);
    var listItem = document.createElement('li');
    listItem.textContent = files[i].name;
    document.getElementById('fileList').appendChild(listItem);
  }
}

function refreshProgress() {
  var fileProgress = document.getElementById("fileProgress");
  progress++;
  fileProgress.value = progress;
  if (progress === progress_max) {
    alert("上传完毕");
    fileList.innerHTML = '';
    selectedFiles = []
  }
}
