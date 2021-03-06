import { gql, useQuery } from '@apollo/client';
import Head from 'next/head'
import Image from 'next/image'
import { useState } from "react";
import styles from '../styles/Home.module.css'
import { useAuth } from "../lib/auth";
import SignIn from "../components/SignIn";
import Episode from "../components/Episode";
import { VStack } from '@chakra-ui/react';

const PlaylistQuery = gql`
{
  playlists {
    name
    episodes {
      id
    }
  }
}
`

const EpisodeFeed = () => {
  const FeedQuery = gql`
    {
      episodeFeed(first: 50) {
        id
        title
        audio
        podcast {
          title
          image
        }
        summary
        pubDate
        image
        link
      }
    }
  `

  const { data } = useQuery(FeedQuery)
  const { data: playlistData } = useQuery(PlaylistQuery)
  const { signOut } = useAuth()

  return (
    <div>
      <VStack spacing={8} w="100%">
        {data?.episodeFeed.map( (e) => {
          return <Episode key={e.id} episode={e} playlists={playlistData?.playlists} />
          // return <li key={e.title}>{e.title}</li>
        })}
      </VStack>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}

export default function Home() {
  const { isSignedIn } = useAuth()
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!isSignedIn() && <SignIn />}
      {isSignedIn() && <EpisodeFeed />}
    </div>
  )
}
