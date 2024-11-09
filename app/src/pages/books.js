import React from "react";
import { MainPage } from "./components/reusables";
import { PagePaths } from "./constants/paths";
import { GetPathTitle } from "./constants/pages";
import { limitString } from "../functions/strings";
import LoanImage from "res/handshake.svg"
import InfoImage from "res/info.svg"
import EditImage from "res/edit.svg"

function IconButton({src, alt}) {
    return (
        <button className="my-auto size-[35px] border-none p-1 hover:size-[40px] transition-all duration-200">
            <img src={src} alt={alt} height="40px" width="40px" className="object-contain"></img>
        </button>
    );
}

function Entry({title, category, author, room}) {
    
    const size = 50;

    return (
        <div className="flex content-center place-content-between w-[100%] border-[0.5px] text-left p-4">
            <div className="flex flex-col">
                <h6 className="font-bold">{limitString(title, size)}</h6>
                <p className="text-gray-600 font-light">{limitString(author.concat(' • ').concat(category).concat(' • ').concat(room), size)}</p>
            </div>
            <div className="flex space-x-5">
                <IconButton src={LoanImage} alt="préstamo" />
                <IconButton src={EditImage} alt="edit" />
                <IconButton src={InfoImage} alt="info" />
            </div>
        </div>
    );
}

function Content() {
    
    const books = [
        ["los 5 secretos más oscuros del papel higiénico", "historia", "wu gilberto", "sotano-1"],
        ["diez formas de cocinar a un humano", "romance", "gamboa adolf", "PB-4"],
        ["como aguantar las ganas de comerme ese chocolate", "fantasía épica", "fernandez vincenzo, weyes weyes", "P1-3"],
        ["como evadir impuestos: la venganza de luxemburgo", "horror cósmico", "ramirez daniel, silva guillermo", "A-51"]
    ]

    books.push(books[0]);
    books.push(books[0]);
    books.push(books[0]);
    books.push(books[0]);
    books.push(books[0]);

    return(
        <div className="flex flex-col w-[75%] my-10 self-center border-[2px]">
            {books.map(book => <Entry title={book[0]} category={book[1]} author={book[2]} room={book[3]} />)}
        </div>
    );
}

const Books = () => {
    return (
        <MainPage section={GetPathTitle(PagePaths['Books'])} content=<Content /> />
    );
}

export default Books;