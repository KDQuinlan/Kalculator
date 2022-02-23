import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import useStore from "../state/store";
import CalcButtons from "../components/CalcButtons";

const buttonValues = ["AC", "DEL", "X", 1, 2, 3, "/", 4, 5, 6, "+", 7, 8, 9, "-", 0, ".", "="];

const Home: NextPage = () => {
  const currentEquation = useStore((state) => state.currentEquation);

  return (
    <div>
      <Head>
        <title>Kalculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex h-screen w-screen flex-col items-center justify-center bg-darktheme-900">
        <div className="flex h-20 w-[20rem] items-center justify-end break-all bg-darktheme-800 pr-10 text-3xl text-white md:h-24 md:w-[24rem]">
          {currentEquation}
        </div>
        <CalcButtons arr={buttonValues} />
      </main>
    </div>
  );
};

export default Home;
