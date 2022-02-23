import tw from "tailwind-styled-components";

export const ButtonContainer = tw.div`
    grid 
    w-[20rem] 
    grid-cols-4 
    gap-0.5 
    bg-black 
    md:w-[24rem]
`;

export const CalcNumberButton = tw.button`
    h-20 
    bg-darktheme-800 
    text-2xl 
    text-white 
    first:col-span-2 
    last:col-span-2 
    md:h-24
`;
export const CalcOperatorButton = tw.button`
    h-20 
    bg-violet-400
    text-2xl 
    text-white 
    first:col-span-2 
    last:col-span-2 
    md:h-24
`;
export const CalcFunctionButton = tw.button`
    h-20 
    bg-violet-300
    text-2xl 
    text-white 
    first:col-span-2 
    last:col-span-2 
    md:h-24
`;
