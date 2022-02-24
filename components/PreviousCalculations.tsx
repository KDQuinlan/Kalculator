import React from "react";
import tw from "tailwind-styled-components";
import useStore from "../state/store";

const Container = tw.div`
    invisible 
    h-full 
    w-60 
    bg-darktheme-800 
    lg:visible
`;

const TitleContainer = tw.div`
    decoration-3 
    flex 
    h-32 
    items-center 
    justify-center 
    font-glyphs  
    text-xl 
    text-violet-400 
    underline
`;

const PreviousCalculationButton = tw.button`
    h-14 
    bg-violet-400 
    text-lg 
    text-white 
    shadow-md 
    shadow-violet-400/50 
    transition 
    delay-150 
    duration-300 
    ease-in-out 
    last:p-0 
    hover:-translate-y-1 
    hover:bg-violet-300 
    hover:shadow-lg 
    hover:shadow-violet-300/50
`;

const PreviousCalculationContainer = () => {
  const setEquationFromPreviousResult = useStore((state) => state.setEquationFromPreviousResult);
  const setPreviousEquation = useStore((state) => state.setPreviousEquation);
  const previousCalculations = useStore((state) => state.previousCalculations);

  const setToPreviousEquation = (previousEquation: string[]) => {
    setPreviousEquation(previousEquation[0]);
    setEquationFromPreviousResult(previousEquation[1]);
  };

  return (
    <Container>
      <TitleContainer>Previous Calculations</TitleContainer>
      {previousCalculations.length === 0 ? null : (
        <div className="flex flex-col  space-y-5">
          {previousCalculations.map((calculationData: string[], index: any) => {
            return (
              <PreviousCalculationButton
                key={index}
                value={calculationData}
                onClick={(e) => setToPreviousEquation(calculationData)}
              >
                {`${calculationData[0]} ${calculationData[1]}`}
              </PreviousCalculationButton>
            );
          })}
        </div>
      )}
    </Container>
  );
};

export default PreviousCalculationContainer;
