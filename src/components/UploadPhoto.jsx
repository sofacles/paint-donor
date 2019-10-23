import React, { useState } from 'react';
import axios from 'axios'

const UploadPhoto = () => {
 
  return <form 
    method="post" encType="multipart/form-data" >
    <input type="file" id="uploadPhoto"
      onChange={(f) => {
        let imageFormObj = new FormData();
        imageFormObj.append("imageName", "multer-image-" + Date.now());
        imageFormObj.append("imageData", f.target.files[0]);

        axios.post(`/api/image`, imageFormObj)
        .then((data) => {
          if (data.data.ok) {
            console.log("OK");
          }
        })
        .catch((err) => {
        debugger;
        });
      }} />
  </form>;
}

export { UploadPhoto};