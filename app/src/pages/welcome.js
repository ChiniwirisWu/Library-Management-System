import React from "react";
import { Link } from "react-router-dom";

export function PrimaryButton({title}) {
  return (
      <button className="w-[100%] h-[100%] text-blue-600 bg-transparent text-base rounded cursor-pointer outline outline-1 hover:bg-blue-600 hover:text-white py-2 font-semibold transition-all duration-[0.25s] hover:outline-none">{title}</button>
  );
}

export function Title() {
  return (
    <header className="h-[125px] flex items-end place-content-center">
      <h1 className="text-3xl text-center font-thin">
        Biblioteca Pública
        <br></br>
        Juan Temístocles Maza
      </h1>
    </header>
  );
}

export function ButtonsWrapper() {
  return (
    <section className="h-[175px] w-[100%] flex items-center place-content-evenly">
      <Link className="w-[25%] h-[30%]" to = "/login">
          <PrimaryButton title = {"Trabajador"} />
      </Link>
      <Link className="w-[25%] h-[30%]" to = "/">
          <PrimaryButton title = {"Cliente"} />
      </Link>
    </section>
  );
}

export const BackgroundLibraryImage = ( {content} ) => {
  return (
    <div className="App min-h-[100%] flex flex-col justify-center bg-[url(../res/library-background.jpg)] bg-cover">
      {content}
    </div>
  );
}

function Content() {
  return (
    <div className="max-w-[75%] w-[500px] h-[300px] mx-auto flex flex-col bg-white rounded-[12px] ">
      <Title />
      <ButtonsWrapper />        
    </div>
  );
}

const Welcome = () => {
  return (
      <BackgroundLibraryImage content = <Content /> />
  );
}

export default Welcome;