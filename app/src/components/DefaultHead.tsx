import Head from "next/head"



export const DefaultHead = () => {
    return (
        <Head>
            <title>Solana Sync</title>
            <meta name="description" content="Conduct your next IRL Solana workshop with ease." />
            <meta name="image" content="https://solanasync.com/og.png" />
            <meta property="og:title" content={"Solana Sync"} />
            <meta property="og:description" content={"Conduct your next IRL Solana workshop with ease."} />
            <meta property="og:image" content="https://solanasync.com/og.png" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://solanasync.com/og.png" />
            <meta property="og:site_name" content={"Solana Sync"} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={"Solana Sync"} />
            <meta name="twitter:description" content={"Conduct your next IRL Solana workshop with ease."} />
            <meta name="twitter:image" content="https://solanasync.com/og.png" />
            <meta name="twitter:image:alt" content={"Conduct your next IRL Solana workshop with ease."} />
            <meta name="twitter:site" content={"SolanaSync"} />
            <meta name="twitter:creator" content={"SolanaSync"} />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}