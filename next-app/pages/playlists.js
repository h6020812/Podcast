import SignIn from "../components/SignIn";
import Episode from "../components/Episode";
import { useAuth } from "../lib/auth";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Container, FormControl, Select, Button, Flex, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { AddIcon } from "@chakra-ui/icons";

const GET_PLAYLISTS = gql`
{
    playlists {
        name
        episodes {
            title
            id
            audio
            summary
            image
            pubDate
            podcast {
                title
                image
            }
        }
    }
}
`

export default function Playlists() {
    const { isSignedIn } = useAuth()
    const [selectedPlaylist, setSelectedPlaylist] = useState('')
    const { data } = useQuery(GET_PLAYLISTS)

    const filteredPlaylist = data?.playlists?.filter((p) => {
        return p.name === selectedPlaylist
    })[0]

    return (
        <Container>
            {!isSignedIn() && <SignIn />}
            {isSignedIn() && (
                <div>
                    <FormControl id="palylists">
                        <Flex>
                            <Select placeholder="Select playlist" onChange={(e) => setSelectedPlaylist(e.target.value)}>
                                {data?.playlists?.map( (p) => {
                                    return (
                                        <option key={p.name} value={p.value}>
                                            {p.name}
                                        </option>
                                    )
                                })}
                            </Select>
                            <Button ml={4}>
                                <AddIcon />
                            </Button>
                        </Flex>
                    </FormControl>
                    <VStack mt={4} spacing={4}>
                        {filteredPlaylist?.episodes?.map((e) => {
                            return (
                                <Episode key={e.id} episode={e} playlists={data.playlists} />
                            )
                        })}
                    </VStack>
                </div>
            )}
        </Container>
    )
}