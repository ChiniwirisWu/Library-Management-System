import React from "react";
import { MainPage } from "./components/reusables";
import { PagePaths } from "./constants/paths";
import { GetPathTitle } from "./constants/pages";
import { limitString } from "../functions/strings";
import { IconLink } from "./components/reusables";
import { SearchBar } from "./components/reusables";
import LoanImage from "res/handshake.svg"
import InfoImage from "res/info.svg"
import EditImage from "res/edit.svg"

function BookEntry({title, category, author, room}) {
    const size = 50;

    return (
        <div className="flex content-center place-content-between w-[100%] mb-5 border-[0.5px] text-left p-4 bg-gray-50">
            <div className="flex flex-col">
                <h6 className="font-bold">{limitString(title, size)}</h6>
                <p className="text-gray-600 font-light">{limitString(author.concat(' • ').concat(category).concat(' • ').concat(room), size)}</p>
            </div>
            <div className="flex space-x-5">
                <IconLink src={LoanImage} alt="préstamo" path={ PagePaths['Ficha'] } />
                <IconLink src={EditImage} alt="edit" path={ PagePaths['Ficha'] } />
                <IconLink src={InfoImage} alt="info" path={ PagePaths['Ficha'] } />
            </div>
        </div>
    );
}

function Content() {
    
    const books = [
        ["El Principito", "Literatura Infantil", "Antoine de Saint-Exupéry", "Sala de Niños"],
        ["Frankenstein o El moderno Prometeo", "Horror Gótico", "Mary Shelley", "Sala de Literatura"],
        ["The C Programming Language", "Computación", "	Brian Kernighan, Dennis Ritchie", "Sala de Ciencias"],
        ["Breve historia del tiempo: del Big Bang a los agujeros negros", "Divulgación Científica", "Stephen Hawking", "Sala de Ciencias"]
    ]

    books.push(books[0]);
    books.push(books[0]);
    books.push(books[0]);
    books.push(books[0]);
    books.push(books[0]);

    return(
        <div className="flex flex-col w-[75%] self-center">
            <SearchBar placeholder='Buscar Libros'/>
            <div className="flex flex-col w-[100%] self-center">
                {books.map(book => <BookEntry title={book[0]} category={book[1]} author={book[2]} room={book[3]} />)}
            </div> 
        </div>
    );
}

const Books = () => {
    return (
        <MainPage section={GetPathTitle(PagePaths['Books'])} content=<Content /> />
    );
}

export default Books;