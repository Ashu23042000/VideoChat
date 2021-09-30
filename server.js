const express = require("express");
const app = express();
const server = require("http").createServer(app);
const path = require("path");
const { v4: uuidv4 } = require("uuid");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
    res.redirect(`/${uuidv4()}`);
});

app.get("/:room", (req, res) => {
    res.render("index.ejs", { roomId: req.params.room });
});


const io = require("socket.io")(server);

io.on("connection", (socket) => {
    socket.on("join_room", (roomId, userId) => {
        socket.join(roomId);
        socket.to(roomId).emit("user_connected", userId);
    });
});


server.listen(3000, () => {
    console.log("Listening on port 3000");
});