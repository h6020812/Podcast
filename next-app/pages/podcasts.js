import { useQuery, gql } from "@apollo/client";

const PodcastQuery = gql`
{
    podcasts {
        title
    }
}
`

const Podcasts = () => {
    const { data } = useQuery(PodcastQuery);
    return (
        <div>
            <h1>Podcasts:</h1>
            <ul>
                {data?.podcasts.map((p) => {
                    return <li key={p.title}>{p.title}</li>
                })}
            </ul>
        </div>
    )
}

export default Podcasts