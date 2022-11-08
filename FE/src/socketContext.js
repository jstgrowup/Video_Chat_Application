import { io } from "socket.io-client"
import Peer from "simple-peer"
import { createContext, useEffect } from "react"
import { useRef } from "react"
const SocketContext = createContext()
const Socket = io("http://localhost:8080")
const SocketContextProvider = ({ children }) => {
    const [stream, setstream] = useState(null)
    const [me, setme] = useState("")
    const [Call, setCall] = useState(null)
    const [callAccepted, setcallAccepted] = useState(false)
    const [callEnded, setcallEnded] = useState(false)
    const myvideo = useRef()
    useEffect(() => {
        // take the permissions from the the user to access the video and camera immeidately
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
            setstream(currentStream);
            //    now we want to populate the video iframe with the src with the stream therefore we need the refs 
            myvideo.current.srcObject = currentStream
        })

        // now we will emit the action "me" to get the specific id of the user 
        Socket.on("me", (id) => setme(id))
        Socket.on("callUser", ({ from, name: callerName, signal }) => {
            // if some one calls this "callUser" will be called and it will give us all the informations about the user who is calling me such as the name of the user from and the signal 
            //    isRecieved is true because as soon as something is received from the server it will be true
            setCall({ isRecieved: true, from, name: callerName, signal })

        })
    }, [])

    const answerCall = () => {
        setcallAccepted(true)
        const peer = new Peer({ initiator: false })
        // here it is false because we are not initiating a call we are just answering the call
        
    }
    const callUser = () => {

    }
    const leaveCall = () => {
        setcallEnded(true)
    }
}