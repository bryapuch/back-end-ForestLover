const multer=require('multer')
const path=require('path')

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,req.params.id+".jpg")
    }
})

const uploadPostImage=multer({
    storage,
    limits:{
        fileSize:1024*1024*5
    },
})

module.exports=uploadPostImage