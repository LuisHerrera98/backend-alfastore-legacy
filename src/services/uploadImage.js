import multer from 'multer'
import path from 'path'

// const upload = multer({dest: 'archivos'})
const storage = multer.diskStorage({
  destination: 'productos',
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

export const upload = multer({
  storage
})