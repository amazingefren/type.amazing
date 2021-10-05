import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Navbar from "../components/common/Navbar";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>TypeAmazing</title>
        <meta name="description" content="Hello World" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navbar/>
        <h1 className="">TypeAmazing</h1>
      </main>
    </div>
  );
};

export default Home;
