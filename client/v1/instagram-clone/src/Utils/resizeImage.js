import Resizer from 'react-image-file-resizer'

const resizeFile = (file) =>{
  return new Promise((resolve,reject) => {
    if(!file){
      resolve("")
    }
    Resizer.imageFileResizer(
      file,
      250,
      250,
      "JPEG",
      60,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });
}

export const resizePost = (file)=>{
    return new Promise((resolve,reject) => {
    if(!file){
      resolve("")
    }
    Resizer.imageFileResizer(
      file,
      400,
      400,
      "JPEG",
      80,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });
}

  export default resizeFile;