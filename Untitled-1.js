// ESSA
const form = document.querySelector("#form"),
  fileInputClick = document.querySelector("#file-input"),
  fileInput = document.querySelector("#file"),
  progressArea = document.querySelector(".progress-area"),
  uploadedArea = document.querySelector(".uploaded-area"),
  Submit_Button = document.querySelector("#submit");

  // form click event
  fileInputClick.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.onchange = ({target}) => {
    console.log(target.files.length);
    console.log(target.files);
    for (let i = 0; i < target.files.length; i++) {
      let file = target.files[i]; //getting file [i]
      if (file) {
        let fileName = file.name; //getting file name
        if (fileName.length >= 20) { //if file name length is greater than 12 then split it and add ...
          let splitName = fileName.split('.');
          fileName = splitName[0].substring(0, 21) + "... ." + splitName[1];
        }
        uploadFile(fileName); //calling uploadFile with passing file name as an argument
      }
    }
  }

  // file upload function
  function uploadFile(name) {
    let xhr = new XMLHttpRequest(); //creating new xhr object (AJAX)
    xhr.open("POST", "https://hook.eu2.make.com/l9yk96yl1io3h6t7j4ezc8vfcsfp4yqw"); //sending post request to the specified URL
    xhr.upload.addEventListener("progress", ({loaded, total}) => { //file uploading progress event
      let fileLoaded = Math.floor((loaded / total) * 100);  //getting percentage of loaded file size
      let fileTotal = Math.floor(total / 1000); //gettting total file size in KB from bytes
      let fileSize;
      // if file size is less than 1024 then add only KB else convert this KB into MB
      (fileTotal < 1024) ? fileSize = fileTotal + " KB" : fileSize = (loaded / (1024*1024)).toFixed(2) + " MB";
      let progressHTML = `<div class="file-upload-item">
                            <div class="file-upload-item-content">
                              <div class="file-upload-icon" data-w-id="38dc35cc-85c3-f06e-2fce-23875333bd8a" data-animation-type="lottie" data-src="https://cdn.prod.website-files.com/665aed742848f4591b410a1b/6669a7532b1a22c15d8c64bd_loadingV4.json" data-loop="1" data-direction="1" data-autoplay="1" data-is-ix2-target="0" data-renderer="svg" data-default-duration="2.88" data-duration="0"></div>
                              <span class="file-upload-item-name">${name}</span>
                              <span class="file-upload-item-info">${fileLoaded}%</span>
                            </div>
                            <div class="file-upload-item-progress-bar">
                              <div class="file-upload-item-progress" style="width: ${fileLoaded}%"></div>
                            </div>
                          </div>`;
      uploadedArea.classList.add("onprogress");
      progressArea.innerHTML = progressHTML;

      if (loaded == total) {
        progressArea.innerHTML = "";
        let uploadedHTML = `<div class="file-upload-item">
                              <div class="file-upload-item-content">
                                <div class="file-upload-icon w-embed">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentcolor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                                    <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                                    <path d="M9 15l2 2l4 -4" />
                                  </svg>
                                </div>
                                <span class="file-upload-item-name">${name}</span>
                                <span class="file-upload-item-info">${fileSize}</span>
                              </div>
                            </div>`;
        uploadedArea.classList.remove("onprogress");
        uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML); //remove this line if you don't want to show upload history
      }
    });
    let data = new FormData(form); //FormData is an object to easily send form data
    xhr.send(data); //sending form data
  }


