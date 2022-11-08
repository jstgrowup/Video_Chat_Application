const { createServer } = require("http")
const express = require("express")
const app = express()
const cors = require("cors")
const { Server } = require("socket.io")
const { default: App } = require("../FE/src/App")
const mainServer = createServer(app)
app.use(cors())
app.get("/", (req, res) => {
    res.send("server")
})
const io = new Server(mainServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})
io.on("connection", (socket) => {
    socket.emit("me", socket.id)

    socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded")
    })

    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
        io.to(userToCall).emit("callUser", { signal: signalData, from, name })
    })

    socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal)
    })
})
mainServer.listen(8080, () => {
    console.log("server started");
})