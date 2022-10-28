import type { NextPage } from "next";
import Head from "next/head";
import { styles } from "../styles/styles";
import Card from "../components/Card";
import PostsCell from "../components/PostsCell";
import { useState, useEffect } from "react";

const Home: NextPage = () => {
  const [num, setNum] = useState(0);
  const genNum = (times: number) => Math.floor(Math.random() * times);
  const onClickHandler = () => setNum(genNum(100));
  useEffect(() => setNum(genNum(100)), []);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.appContainer}>
        <h1 className={styles.title}>Blog App</h1>
        {/* <div className={styles.grid}> */}
        {/*   <Card name="Blog" url="ajcwebdev.com/" /> */}
        {/*   <Card name="Twitter" url="twitter.com/ajcwebdev/" /> */}
        {/*   <Card name="GitHub" url="github.com/ajcwebdev/" /> */}
        {/*   <Card name="Polywork" url="poly.work/ajcwebdev/" /> */}
        {/* </div> */}
        <section className="flex flex-col items-center pt-4">
          <PostsCell />
        </section>
        <section className="flex flex-col items-center gap-2 py-4">
          <p>Random Number: {num}</p>
          <button
            onClick={onClickHandler}
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50"
          >
            button
          </button>
        </section>
      </main>
    </>
  );
};

export default Home;