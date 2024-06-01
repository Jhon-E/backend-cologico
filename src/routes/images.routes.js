import router from "express";
import multer from "multer";
import { postImage } from "../controllers/images.controller";

const router = router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
const upload = multer({ storage });

router.post('/upload', upload.single('file'), postImage);
  