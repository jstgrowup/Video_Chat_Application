const { createServer } = require("http")
const express = require("express")
const app = express()
const { Server } = require("socket.io")
const mainServer = createServer(app)
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

    socket.on("callUser", (data) => {
        io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
    })

    socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal)
    })
})
mainServer.listen(8080, () => {
    console.log("server started");
})