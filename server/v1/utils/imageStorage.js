const multer = require('multer');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/profilePic')
    },
    filename:(req,file,cb)=>{

        cb(null,Date.now()+"-"+file.fieldname+".jpeg")
    }
})

const upload = multer({storage:storage})

module.exports = upload