const express = require('express');
const path = require('path');
const app = express();

const bodyParser = require("body-parser");
const paintChipRoute = require("./server/src/routes/paintChip");
const emailRoute = require("./server/src/routes/sendMail");

const port = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'test.html'));
});

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/');
    },
    filename: function (req, file, cb) {
        let imageName = req.body.imageName;
        if(file.mimetype === 'image/jpeg' ) {
            imageName += ".jpg"
        } else if(file.mimetype === 'image/png' ) {
            imageName += ".png"
        }
        cb(null, imageName);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        // rejects storing a file
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 16
    },
    fileFilter: fileFilter
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/api/paints/:id", paintChipRoute.getPaints);

app.post("/api/paints", upload.single('imageData'), paintChipRoute.addPaintCan);

app.post("/api/mail", emailRoute.sendMail);

app.listen(port);