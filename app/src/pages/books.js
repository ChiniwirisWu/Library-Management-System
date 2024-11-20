import React, { createContext, useEffect, useState } from "react";
import { MainPage } from "../components/reusables";
import { dewey_codes, salas } from "../constants/rooms_and_dewey";
import { PagePaths } from "../constants/paths";
import { GetPathTitle } from "../constants/pages";
import { limitString } from "../functions/strings";
import { simpleFetch } from "../functions/forms";
import { host } from "../constants/host_ip";
import { IconLink } from "../components/reusables";
import { SearchAndAddBar } from "../components/reusables";
import { Entry } from "../components/reusables";
import { RestrictedComponent } from "../functions/permissions";
import LoanImage from "res/handshake.svg"
import InfoImage from "res/info.svg"
import EditImage from "res/edit.svg"
import { libraryRoles } from "../constants/roles";


function BookEntryInfo({ title, category, author, room }) {
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
            <RestrictedComponent component=<IconLink src={LoanImage} alt="préstamo" path={PagePaths['Record']} /> permissions={libraryRoles} />
            <RestrictedComponent component=<IconLink src={EditImage} alt="edit" path={PagePaths['Record']} /> permissions={libraryRoles} />
            <IconLink src={InfoImage} alt="info" path={PagePaths['Record']} />
        </>
    );
}

function BookEntry({ title, category, author, room }) {
    return (
        <Entry
            info=<BookEntryInfo title={title} category={category} author={author} room={room} />
            icons=<BookEntryIcons />
        />
    );
}

function setSearchableStrings(books = []){
    const ignorables = ['ca', 'edicion', 'ejemplares', 'esReferencia', 'volumen', 'coleccion'];
    for (let i = 0; i < books.length; i++){
        let searchableString = ''; 
        for (const property in books[i]){
            if(ignorables.includes(property)) continue;
            searchableString += `${books[i][property]} `;
        }
        books[i].searchableString = searchableString.toLowerCase();
    }
    console.log(books);
    return books;
}

function Content() {

    const [books, setBooks] = useState([]);
    const [visibleBooks, setVisibleBooks] = useState([]);
    const [matches, setMatches] = useState([]);

    // peticion inicial para llenar las listas de libros.
    useEffect(()=>{
        const getAllBooks = async function(){
            const response = fetch(`${host}/cards`);
            response.then(res=>res.json())
                    .then(res=> {
                        const books = setSearchableStrings(res);
                        setBooks(books);
                        setVisibleBooks(books);
                    })
                    .catch(err=>console.error(err));
        }   
        getAllBooks();
    }, [])

    function findMatches(text){
        let matches = [];
        books.forEach((item, index)=>{
            if(item.searchableString.includes(text.toLowerCase())) matches.push(item);
        })
        setMatches(matches);
    }

    function updateVisibleBooks(){
        setVisibleBooks(matches);
    }

    return (
        <div className="flex flex-col w-[75%] self-center">
            <SearchAndAddBar findMatches={findMatches} updateVisibleBooks={updateVisibleBooks} placeholder='Buscar Libros' AddPath={PagePaths['Record']} />
            <div className="flex flex-col w-[100%] self-center">
                {visibleBooks.map(book => <BookEntry title={book.titulo} category={book.categoria} author={book.autor} room={book.sala} />)}
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
