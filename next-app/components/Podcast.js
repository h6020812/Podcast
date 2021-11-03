import { 
    Button,
    Flex,
    Box,
    Image,
    Stack,
    Text,
    Tag,
    Heading
} from "@chakra-ui/react"

import { useMutation, gql } from "@apollo/client";

import { AddIcon } from "@chakra-ui/icons";

const PODCAST_SUBSCRIBE =gql`
    mutation podcastSubscribe($itunesID: String!) {
        subscribeToPodcast(itunesId: $itunesID) {
            title
            itunesId
        }
    }
`

const Podcast = ({ podcast }) => {
    const { title, itunesId, description, artwork, categories, image } = podcast
    const [subsribeMutation, { data }] = useMutation(PODCAST_SUBSCRIBE)

    return (
        <Flex rounded="lg" borderWidth="2px" m={4}>
            <Box width="200px">
                <Image scr={artwork} boxSize="200px" />
                <Button width="100%"
                    onClick={() => {
                        subsribeMutation({ variables: { itunesID: itunesId }})
                    }}
                >
                    <AddIcon />
                </Button>
            </Box>
            <Box m={4} maxWidth="300px">
                <Heading noOfLines={2}>{title}</Heading>
                <Text noOfLines={3}>{description}</Text>
                <Stack isInline>
                    {categories.slice(0, 3).map((c) => {
                        return <Tag key={c}>{c}</Tag>
                    })}
                </Stack>
            </Box>
        </Flex>
    )
}

export default Podcast
