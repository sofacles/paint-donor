const express = require("express");
const bodyParser = require("body-parser");
const paintChipRoute = require("./routes/paintChip");
//import { getUser } from "./routes/users";

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// user
app.get("/api/users/:id", (req, res) => {
    res.send({ok: true});
});

app.get("/api/paints/:id", paintChipRoute.getPaints);

// // messages
// app.post("/api/paints", addPaintCan);
// app.put("/api/messages/:id", putMessage);

// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Listening on port ${port}`));