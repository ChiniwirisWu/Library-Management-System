import React from "react";
import { MainPage } from "./components/reusables";
import { PagePaths } from "./constants/paths";
import { GetPathTitle } from "./constants/pages";
import { limitString } from "../functions/strings";

function Entry({title, category, author, room}) {
    
    const size = 50;

    return (
        <button className="w-[100%] border-[0.5px] text-left p-4">
            <h6 className="font-bold">{limitString(title, size)}</h6>
            <p className="text-gray-600 font-light">{limitString(author.concat(' • ').concat(category).concat(' • ').concat(room), size)}</p>
        </button>
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