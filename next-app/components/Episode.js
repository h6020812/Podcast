import {
    Flex,
    Box,
    Image,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    Heading,
    Text,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";

import moment from "moment";
import { gql, useMutation } from '@apollo/client';
import { AddIcon, CheckIcon } from "@chakra-ui/icons";

const ADD_EPISODE_TO_PLAYLIST = gql`
    mutation addToPlaylist($episodeId: ID!, $playlistName: String!) {
        addEpisodeToPlaylist(podcastId: $episodeId, name: $playlistName) {
            name
        }
    }
`

const Episode = ({ episode, playlists }) => {
    const [addEpisode] = useMutation(ADD_EPISODE_TO_PLAYLIST)
    
    const isEpisodeInPlaylist = (playlistName) => {
        const playlist = playlists.filter((i) => {
            return playlistName === i.name
        })

        const episodes = playlist[0].episodes?.map((v) => {
            return v.id
        })

        return episodes?.includes(episode.id)
    }

    return (
        <Flex
            border="1px"
            rounded="lg"
            style={{ maxWidth: "700px", width: "100%"}}
        >
            <Box w="150px">
                <Image boxSize="150px" src={episode.podcast.image} m={2} />
                <Menu m={2} w="150px">
                    <MenuButton m={2} w="150px" as={Button}>
                        <AddIcon />
                    </MenuButton>
                    <MenuList>
                        {playlists?.map((item) => {
                            return (
                                <MenuItem icon={isEpisodeInPlaylist(item.name) ? <CheckIcon /> : null} key={item.name} onClick={() => addEpisode({variables: {
                                    episodeId: episode.id,
                                    playlistName: item.name
                                }})}>
                                    {item.name}
                                </MenuItem>
                            )
                        })}
                    </MenuList>
                </Menu>
            </Box>
            <Flex direction="column" ml={4} w="100%">
                <div>
                    <Accordion allowToggle>
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box flex="1" textAlign="left">
                                        <Heading>{episode.title}</Heading>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4} m={4}>
                                <div dangerouslySetInnerHTML={{ __html: episode.summary }}></div>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </div>
                <Flex ml={4} direction="column">
                    <Text fontSize="lg" isTruncated>
                        {episode.podcast.title}
                    </Text>
                    <Text as="i">
                        {`${moment(episode.pubDate).format('MMMM Do YYYY')}`}
                    </Text>
                </Flex>
                <div style={{ marginTop: 'auto' }}>
                    <audio style={{ width: "100%" }} controls>
                        <source src={episode.audio} type="audio/mpeg"></source>
                    </audio>
                </div>
            </Flex>
            {/* <div>{episode.audio}</div>
            <div>{episode.id}</div>
            <div>{episode.podcast.image}</div> */}
        </Flex>
    )
}

export default Episode
