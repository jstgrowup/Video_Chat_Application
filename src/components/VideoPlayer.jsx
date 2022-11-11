import { Center, Heading, SimpleGrid, Box } from '@chakra-ui/react'

import React from 'react'
import { useContext } from 'react'
import { SocketContext } from '../socketContext'

function VideoPlayer() {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
  return (
    <SimpleGrid columns={[1, 1, 2, 2]}   >
      {
        stream && (<Box p={["1", "4", "10", "20"]}>
          <video style={{ width: "100%" }} playsInline muted ref={myVideo} autoPlay />
          <Center>

            <Heading>{name || "Name"}</Heading>
          </Center>
        </Box>)
      }
      {
        callAccepted && !callEnded && (
          <Box p={["1", "4", "10", "20"]} >
            <video playsInline  ref={userVideo} autoPlay />
            <Heading>{call.name || "Name"}</Heading>
          </Box>

        )
      }
    </SimpleGrid>

  )
}

export default VideoPlayer