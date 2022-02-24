import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import useStore from "../state/store";
import ScreenContainer from "../components/ScreenContainer";
import AnswerContainer from "../components/AnswerContainer";
import CalcButtons from "../components/buttons/CalcButtons";
import { BUTTON_VALUES } from "../state/constants";

const Home: NextPage = () => {
  const setEquationFromPreviousResult = useStore((state) => state.setEquationFromPreviousResult);
  const setPreviousEquation = useStore((state) => state.setPreviousEquation);
  const currentEquation = useStore((state) => state.currentEquation);
  const previousEquation = useStore((state) => state.previousEquation);
  const previousCalculations = useStore((state) => state.previousCalculations);

  const setToPreviousEquation = (previousEquation: string[]) => {
    setPreviousEquation(previousEquation[0]);
    setEquationFromPreviousResult(previousEquation[1]);
  };

  return (
    <div>
      <Head>
        <title>Kalculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ScreenContainer>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <AnswerContainer>
            {previousEquation === "" ? null : <div className="text-xl">{previousEquation}</div>}
            <div className="text-3xl">{currentEquation}</div>
          </AnswerContainer>
          <CalcButtons arr={BUTTON_VALUES} />
        </div>
        <div className="invisible h-full w-60 bg-darktheme-800 lg:visible">
          <div className="decoration-3 flex h-32 items-center justify-center font-glyphs  text-xl text-violet-400 underline">
            Previous Calculations
          </div>
          {previousCalculations.length === 0 ? null : (
            <div className="flex flex-col  space-y-5">
              {previousCalculations.map((calculationData: string[], index: any) => {
                return (
                  <button
                    className="h-14 bg-violet-400 text-lg text-white shadow-md shadow-violet-400/50 transition delay-150 duration-300 ease-in-out last:p-0 hover:-translate-y-1 hover:bg-violet-300 hover:shadow-lg hover:shadow-violet-300/50"
                    key={index}
                    value={calculationData}
                    onClick={(e) => setToPreviousEquation(calculationData)}
                  >
                    {`${calculationData[0]} ${calculationData[1]}`}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </ScreenContainer>
    </div>
  );
};

export default Home;
