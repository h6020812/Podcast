import SignIn from "../components/SignIn";
import Episode from "../components/Episode";
import { useAuth } from "../lib/auth";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Container, FormControl, Select, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";

export default function Playlists() {
    const { isSignedIn } = useAuth()
    const [selectedPlaylist, setSelectedPlaylist] = useState('')

    return (
        <Container>
            {!isSignedIn() && <SignIn />}
            {isSignedIn() && (
                <div>
                    <FormControl id="palylists">
                        <Flex>
                            <Select placeholder="Select playlist" onChange={(e) => setSelectedPlaylist(e.target.value)}>
                                <option value="Foobar">Foobar</option>
                            </Select>
                        </Flex>
                    </FormControl>
                </div>
            )}
        </Container>
    )
}