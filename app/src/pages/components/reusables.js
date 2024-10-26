import React from "react";

export function PrimaryButton({ title }) {
    return (
        <button className="w-[100%] h-[100%] text-blue-600 bg-transparent text-base rounded cursor-pointer outline outline-1 hover:bg-blue-600 hover:text-white py-2 font-semibold transition-all duration-[0.25s] hover:outline-none">{title}</button>
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
            <label for="user" class="text-lg mb-2">{text}</label>
            <input type={type} name="user" id="user" class="text-base p-2 border-b-2 border-b-[#303F9F] mb-8 focus:outline-none focus:border-b-blue-300 transition-colors duration-300" />
        </div>
    );
}

export function TextLink({ text }) {
    return (
        <a class="w-min text-sm underline text-[#303F9F] hover:text-blue-300 transition-all mb-2 hover:cursor-pointer">
            <h6>{text}</h6>
        </a>
    );
}

export const FormBackground = ({ content }) => {
    return (
        <div class="w-[100%] h-[100%] flex bg-[#f2f2f2] border-t-[30px] border-[#303F9F] ">
            {content}
        </div>
    );
}