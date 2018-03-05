const express = require('express');
const multer = require('multer');
const path = require('path');

const Font = require('../../models/font');

const DEFAULT_FILE_NAME = 'tempfont';
const storage = multer.diskStorage({
  destination: './dist/fonts/',
  filename(req, file, cb) {
    const split = file.originalname.split('.');
    const type = split[split.length - 1];
    cb(null, `${DEFAULT_FILE_NAME}.${type}`);
  },
});
const upload = multer({ storage }).single('file');

const router = express.Router();

router.get('/:type', (req, res) => {
  res.sendFile(path.resolve(process.cwd(), `dist/fonts/tempfont.${req.params.type}`));
});
/*
  Read FormData's 'file' field and save it.
*/
router.post('/', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(500).json({ error: 'CANNOT SAVE FILE' });
    }
    res.json({ fileName: req.file.filename, path: req.file.path });
  });
});
module.exports = router;
