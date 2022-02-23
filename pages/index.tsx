import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import useStore from "../state/store";
import ScreenContainer from "../components/ScreenContainer";
import AnswerContainer from "../components/AnswerContainer";
import CalcButtons from "../components/buttons/CalcButtons";
import { BUTTON_VALUES } from "../state/constants";

const Home: NextPage = () => {
  const currentEquation = useStore((state) => state.currentEquation);
  const previousEquation = useStore((state) => state.previousEquation);

  return (
    <div>
      <Head>
        <title>Kalculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ScreenContainer>
        <AnswerContainer>
          {previousEquation === "" ? null : <div className="text-xl">{previousEquation}</div>}
          <div className="text-3xl">{currentEquation}</div>
        </AnswerContainer>
        <CalcButtons arr={BUTTON_VALUES} />
      </ScreenContainer>
    </div>
  );
};

export default Home;
