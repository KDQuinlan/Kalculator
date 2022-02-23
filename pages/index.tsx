import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import useStore from "../state/store";
import CalcButtons from "../components/CalcButtons";

const buttonValues = ["AC", "DEL", "X", 1, 2, 3, "/", 4, 5, 6, "+", 7, 8, 9, "-", 0, ".", "="];

const Home: NextPage = () => {
  const currentEquation = useStore((state) => state.currentEquation);
  // const selectedOperand = useStore((state) => state.selectedOperand);
  // console.log(selectedOperand);

  // const after_ = currentEquation.substring(currentEquation.lastIndexOf("X") + 1);
  // console.log(after_);

  // const text =
  //   selectedOperand === ""
  //     ? null
  //     : currentEquation.substring(currentEquation.lastIndexOf(selectedOperand) + 1);
  // console.log(text);

  return (
    <div>
      <Head>
        <title>Kalculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex h-screen w-screen flex-col items-center justify-center bg-darktheme-900">
        <div className="flex h-24 w-[24rem] items-center justify-end break-all bg-darktheme-800 pr-10 text-3xl text-white">
          {currentEquation}
        </div>
        <CalcButtons arr={buttonValues} />
      </main>
    </div>
  );
};

export default Home;
