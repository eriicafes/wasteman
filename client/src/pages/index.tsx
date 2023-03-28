import Head from "next/head"

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" rel="stylesheet"></link>
      </Head>
      <main className="flex h-screen w-screen items-center justify-center">
        <p className="text-3xl font-bold">Next 13</p>
      </main>
    </>
  )
}
