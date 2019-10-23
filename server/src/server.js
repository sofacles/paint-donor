const express = require("express");
const bodyParser = require("body-parser");
const paintChipRoute = require("./routes/paintChip");
const app = express();
const port = process.env.PORT || 5000;
const ImageRouter = require('./routes/Image');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
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
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// user
app.get("/api/users/:id", (req, res) => {
    res.send({ok: true});
});

app.get("/api/paints/:id", paintChipRoute.getPaints);

app.post("/api/paints", paintChipRoute.addPaintCan);
app.post('/api/image', upload.single('imageData'), ImageRouter.AddImage);
// app.put("/api/messages/:id", putMessage);

app.use('uploads', express.static('uploads'));

// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Listening on port ${port}`));