import React from "react";
import { MainPage } from "../components/reusables";
import { PagePaths } from "../constants/paths";
import { GetPathTitle } from "../constants/pages";
import { limitString } from "../functions/strings";
import { IconLink } from "../components/reusables";
import { SearchAndAddBar } from "../components/reusables";
import { Entry } from "../components/reusables";
import { restrictTo } from "../functions/permissions";
import LoanImage from "res/handshake.svg"
import InfoImage from "res/info.svg"
import EditImage from "res/edit.svg"
import { libraryRoles } from "../constants/roles";

function BookEntryInfo({title, category, author, room}) {
    const size = 50;

    return (
        <>
            <h6 className="font-bold">{limitString(title, size)}</h6>
            <p className="text-gray-600 font-light">{limitString(author.concat(' • ').concat(category).concat(' • ').concat(room), size)}</p>
        </>
    );
}

function BookEntryIcons() {
    return (
        <>
            {restrictTo(<IconLink src={LoanImage} alt="préstamo" path={ PagePaths['Ficha'] } />, libraryRoles)} 
            {restrictTo(<IconLink src={EditImage} alt="edit" path={ PagePaths['Ficha']} />, libraryRoles)}
            <IconLink src={InfoImage} alt="info" path={ PagePaths['Ficha'] } />
        </>
    );
}

function BookEntry({title, category, author, room}) {
    return (
        <Entry 
            info = <BookEntryInfo title={title} category={category} author={author} room={room} />
            icons = <BookEntryIcons />
        />
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
            <SearchAndAddBar placeholder='Buscar Libros' AddPath={ PagePaths['Ficha'] }/>
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