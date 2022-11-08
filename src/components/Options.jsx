import { Flex, Text, Button, Center, Input, SimpleGrid,  Heading } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { SocketContext } from '../socketContext'
import { CopyIcon, PhoneIcon } from "@chakra-ui/icons"
function Options({ children }) {
    const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
    const [idToCall, setidToCall] = useState('');
    return (
        <Center>
            <SimpleGrid columns={[1, 1, 2, 2]} width={["100%", "90%", "70%", "60%"]} p={"10"} gap={"70"} border={"2px"}>
                <Flex direction={"column"} gap={"3"} >
                    <Heading size={"md"}>Account Information</Heading>
                    <Text fontSize={"lg"} fontColor={"black"}>Name</Text>
                    <Input border={"1px"} borderColor={"black"} fontColor={"black"} placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                    <CopyToClipboard text={me} >
                        <Button width={"100%"} color={"white"} bg={"blue"} ><Flex gap={"4"}><CopyIcon /> <Text>Copy your ID</Text> </Flex>  </Button>
                    </CopyToClipboard>
                </Flex>
                <Flex direction={"column"} gap={"3"} >
                    <Heading size={"md"}>Make a Call</Heading>
                    <Text fontSize={"lg"} fontColor={"black"}>Name</Text>
                    <Input fontColor={"black"} placeholder='ID to Call' value={idToCall} onChange={(e) => setidToCall(e.target.value)} />
                    {
                        callAccepted && !callEnded ? (
                            <Button onClick={leaveCall} width={"100%"} color={"white"} bg={"blue"} ><Flex gap={"4"}><PhoneIcon /> <Text>Hangup</Text> </Flex>  </Button>

                        ) : (
                            <Button onClick={() => callUser(idToCall)} width={"100%"} color={"white"} bg={"blue"} ><Flex gap={"4"}><PhoneIcon /> <Text>Copy your ID</Text> </Flex>  </Button>
                        )
                    }

                </Flex>
            </SimpleGrid >
            <div>{children}</div>
        </Center >
    )
}

export default Options