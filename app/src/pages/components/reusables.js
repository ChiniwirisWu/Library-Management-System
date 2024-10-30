import React from "react";

export function PrimaryButton({ title }) {
    return (
        <button className="w-[100%] h-[100%] text-blue-600 bg-transparent text-base rounded cursor-pointer outline outline-1 hover:bg-blue-600 hover:text-white py-2 font-semibold transition-all duration-[0.25s] hover:outline-none">{title}</button>
    );
}

export function Title({ text }) {
    return (
        <header class="mb-6">
            <h1 class="text-center font-thin text-3xl">
                {text}
            </h1>
        </header>
    );
}

export function TransparentButton({ text }) {
    return (
        <button class="border-1 rounded-md text-[#303F9F] hover:text-blue-300 transition-all mb-4 w-min text-nowrap m-auto">
            {text}
        </button>
    );
}

export function LabeledInput({ text }, { type }) {
    return (
        <div className="flex flex-col">
            <label for="user" class="text-lg mb-2">
                {`${text}:`}
            </label>
            <input type={type} name="user" id="user" class="text-base p-2 border-b-2 border-b-[#303F9F] mb-8 focus:outline-none focus:border-b-blue-300 transition-colors duration-300" />
        </div>
    );
}

export function TextLink({ text, href }) {
    return (        
        <a href={href} className="w-min text-sm underline text-[#303F9F] hover:text-blue-300 transition-all mb-2 hover:cursor-pointer">
            <p>{text}</p>
        </a>
    );
}

export const FormBackground = ({ content }) => {
    return (
        <div className="w-[100%] h-[100%] flex flex-col bg-[#f2f2f2]">
            <div className="w-[100%] h-[5%] bg-[#303F9F]"></div>
            <div className="w-[100%] h-[95%] flex place-items-center justify-center">
                {content}
            </div>
        </div>
    );
}

export const Form = ({content, title, className}) => {
    return(
        <FormBackground content = {
            <div className = {`${className} bg-white p-[40px] rounded-sm shadow-sm shadow-[grey]`}>
                <Title text={title} />
                {content}
            </div>
         }/>
    );
}