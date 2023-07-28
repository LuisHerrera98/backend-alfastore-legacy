import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: 'uploads',
    filename:  (req, file, cb) => {
        cb(null, file.originalname);
    }
})
const uploadImage = multer({
    storage,
    limits:{
        
    }
}).array('image');

export default uploadImage;