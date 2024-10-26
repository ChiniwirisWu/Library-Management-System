import logo from './logo.svg';
import './App.css';

export function PrimaryButton({title}) {
  return (
      <button className="text-blue-600 bg-transparent text-base rounded cursor-pointer outline outline-1 w-1/3 h-1/3 hover:bg-blue-600 hover:text-white py-2 font-semibold transition-all duration-[0.25s] hover:outline-none">{title}</button>
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
    <PrimaryButton title = {"Trabajador"} />
    <PrimaryButton title = {"Cliente"} />
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

function LinkH6({text}) {
    return (
        <a href="" class="w-min text-sm underline text-[#303F9F] hover:text-blue-300 transition-all mb-2"><h6>{text}</h6></a>
    );
}

function LinksContainer() {
    return (
        <div class="flex flex-col text-nowrap">
            <LinkH6 text="¿Olvidó su contraseña?"/>
            <LinkH6 text="Solicitud de registro"/>
        </div>
    );
}

function Input({text},{type}) {
    return (
        <div className="flex flex-col">
            <label for="user" class="text-lg mb-2">{text}</label>
            <input type={type} name="user" id="user" class="text-base p-2 border-b-2 border-b-[#303F9F] mb-8 focus:outline-none focus:border-b-blue-300 transition-colors duration-300"/>
        </div>
    );
}

function TransparentButton({text}) {
    return (
        <button class="border-1 rounded-md text-[#303F9F] hover:text-blue-300 transition-all mb-4 w-min text-nowrap m-auto">{text}</button>

    );
}
function InputContainer() {
    return (
        <div class="flex flex-col">
            <Input type="text" text="Usuario: "/>
            <Input type="text" text="Contrasena: "/>
        </div>
    );
}

function App() {
  return (
    <div class="w-[100%] h-[100%] flex bg-[#f2f2f2] border-t-[30px] border-[#303F9F] ">
        <div class="max-w-[500px] w-[90%] h- p-[40px] m-auto bg-white rounded-sm shadow-sm shadow-[grey]">
            <header class="mb-6">
                <h1 class="text-center font-thin text-3xl">Inicio de Sesión</h1>
            </header>

            <section class="text-xl flex flex-col ">
                <InputContainer />
                <TransparentButton text="Iniciar Sesión" />
                <LinksContainer />
            </section>
        </div>
    </div>
  );
}

export default App;