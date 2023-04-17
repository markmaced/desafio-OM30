const express = require('express') 
const multer = require('multer') 
const cors = require('cors') 
const path = require('path');

const app = express();

const storage = multer.diskStorage({
  destination: '../medicina-app/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }
}).single('image');

app.use(cors());
// API endpoint for file upload
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to upload image' });
    } else {
      console.log(req.file);
      res.status(200).json({ message: 'Image uploaded successfully' });
    }
  });
});

app.listen(3001, () => {
  console.log('Servidor iniciado na porta 3001');
});