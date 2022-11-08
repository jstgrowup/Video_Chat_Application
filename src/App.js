import VideoPlayer from './components/VideoPlayer'
import Options from './components/Options'
import Notification from './components/Notification'
import { Center, Heading } from "@chakra-ui/react"

function App() {
  return (
    <>
      <Center>
        <Heading as='h1' size='4xl'>Zoom</Heading>
      </Center>
      <VideoPlayer />
      <Options>
        <Notification />
      </Options>


    </>
  )
}

export default App;
