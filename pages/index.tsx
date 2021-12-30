import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>React Infinite Scroll</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full h-full flex flex-col justify-center items-center text-center">
        <h1 className="font-bold text-2xl">React infinite scroll examples</h1>
        <div className="pb-10" />
        <div className="space-x-2">
          <Link href="/intersection-observer">
            <a className="border-2 rounded-md border-gray-400 p-4 hover:bg-gray-100 cursor-pointer">
              Using intersection observer
            </a>
          </Link>
          <Link href="/event-api">
            <a className="border-2 rounded-md border-gray-400 p-4 hover:bg-gray-100 cursor-pointer">
              Using event api
            </a>
          </Link>
        </div>
      </main>
    </>
  );
};

export default Home;
