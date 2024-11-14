import React from "react";
import { useState } from 'react';
import { MainPagesList } from "../constants/pages";
import { Link } from "react-router-dom";
import { restrictTo } from "../functions/permissions";
import SearchIcon from "res/search.svg";
import AddIcon from "res/add.svg";
import { libraryRoles, userRoles } from "../constants/roles";

export function PrimaryButton({ title }) {
    return (
        <button className="w-[100%] h-[100%] text-blue-600 bg-transparent text-base rounded cursor-pointer outline outline-1 hover:bg-blue-600 hover:text-white py-2 font-semibold transition-all duration-[0.25s] hover:outline-none">
            {title}
        </button>
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
            <label for={text} class="text-lg mb-2">
                {`${text}:`}
            </label>
            <input type={type} name={text} id="user" class="text-base p-2 border-b-2 border-b-[#303F9F] mb-8 focus:outline-none focus:border-b-blue-300 transition-colors duration-300" />
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

export function IconButton({src, alt, borderless = true}) {
    let buttonClass = (borderless) 
        ? "my-auto size-[35px] border-none p-1 hover:size-[40px] transition-all duration-200" 
        : "my-auto size-[45px] border-2 p-2 rounded-lg bg-gray-50 active:bg-gray-100 transition-all duration-200";
    
    return (
        <button className={ buttonClass }>
            <img src={src} alt={alt} height="40px" width="40px" className="object-contain"></img>
        </button>
    );
}

export function IconLink({src, alt, path, borderless = true}) {
    return (
        <Link className="flex align-middle" to={ path }>
            <IconButton src={ src } alt={ alt } borderless={ borderless } />
        </Link>
    );
}

export function SearchAndAddBar({placeholder, AddPath}) {
    return(
        <div className="w-[100%] flex space-x-5">
            <input type='text' name={placeholder} id={placeholder} placeholder={placeholder} class="w-[100%] outline-none my-5 font-bold text-base p-2 border-2 rounded-lg bg-gray-50  focus:border-gray-300 transition-colors duration-300" />
            <IconButton src={SearchIcon} alt="Search" borderless = {false} />
            {restrictTo(<IconLink src={AddIcon} alt="add" borderless = {false} path={AddPath} />, libraryRoles)}
        </div>
    );
}

export const Entry = ({info, icons}) => {
    return(
        <div className="flex content-center place-content-between w-[100%] mb-5 border-[0.5px] text-left p-4 bg-gray-50">
            <div className="flex flex-col">
                {info}
            </div>
            <div className="flex space-x-5">
                {icons}
            </div>
        </div>
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

export function TabButtons({first_title, second_title, onFirst, onSecond}) {
    const onButtonClass = "border-2 rounded-md bg-gray-50 font-bold px-16 py-1 transiton-colors duration-[50ms]";
    const offButtonClass = "rounded-md bg-[#e7e7e7] text-gray-400 font-bold px-16 py-1 transiton-colors duration-[50ms]";

    let [firstClass, setFirstClass] = useState(onButtonClass);
    let [secondClass, setSecondClass] = useState(offButtonClass);

    let onFirstClick = () => {
        setFirstClass(onButtonClass);
        setSecondClass(offButtonClass);
        onFirst();
    }

    let onSecondClick = () => {
        setFirstClass(offButtonClass);
        setSecondClass(onButtonClass);
        onSecond();
    }

    return (
        <div className="h-[75px] w-[100%] flex place-content-center">
            <div className="my-4 bg-[#e7e7e7] p-1 rounded-md inline-block self-center">
                <button class={firstClass} onClick={onFirstClick}>{first_title}</button>
                <button class={secondClass} onClick={onSecondClick}>{second_title}</button>
            </div>
        </div>
    );
}

export function NavButton({title, isActive = false}) {
    
    let bg_color = (isActive) ? "bg-blue-600" : "bg-white"
    let text_color = (isActive) ? "text-white" : "text-blue-600"
    let hover_bg_color = "hover:bg-blue-600"
    let hover_text_color = "hover:text-white"
    
    return (
        <button className={`w-[100%] h-[100%] text-lg ${text_color} ${bg_color} cursor-pointer outline-none ${hover_bg_color} ${hover_text_color} py-2 font-semibold transition-all duration-[0.25s]`}>
            {title}
        </button>
    );
}

export function NavBar({accountType, currentPage}) {

    const sections = MainPagesList.filter( page => page.roles.includes(accountType) );
    
    return(
        <nav className = "flex w-[100%]">
            {sections.map( page =>
                <Link className="w-[100%] h-[100%]" to={ page.path }>
                    <NavButton title = {page.title} isActive={page.title === currentPage} />
                </Link>
            )}
        </nav>
    );
}

export const MainPage = ({content, section}) => {
    return(
        <div className="w-[100%] h-[100%] flex flex-col bg-[#f2f2f2]">
            <NavBar accountType={userRoles['client']} currentPage={section}/>
            {content}
        </div>
    );
}