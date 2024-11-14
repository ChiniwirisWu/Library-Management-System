import React from "react";
import { useState } from "react";
import { MainPage } from "./components/reusables";
import { GetPathTitle } from "./constants/pages";
import { PagePaths } from "./constants/paths";
import { Entry } from "./components/reusables";
import { limitString } from "../functions/strings";
import { IconLink } from "./components/reusables";
import { IconButton } from "./components/reusables";
import { TabButtons } from "./components/reusables";
import AcceptIcon from "res/accept.svg";
import DenyIcon from "res/deny.svg";
import InfoImage from "res/info.svg"


function LoanEntryInfo({title, reader, phone, days, address}) {
    const size = 50;

    return (
        <div className="flex flex-col align-middle text-center">
            <h6 className="font-bold text-xl">{limitString(title, size)}</h6>
            <h6 className="font-bold text-sm">{limitString(reader, size)}</h6>

            <p className="text-gray-600 font-light text-sm">{limitString(days.toString().concat(' días • ').concat(phone).concat(' • ').concat(address), size)}</p>
        </div>
    );
}

function LoanEntryIcons() {
    return (
        <>
            <IconLink src={AcceptIcon} alt="accept" path={ PagePaths['Ficha'] } />
            <IconLink src={DenyIcon} alt="deny" path={ PagePaths['Ficha'] } />
            <IconLink src={InfoImage} alt="info" path={ PagePaths['Ficha'] } />
        </>
    );
}

function LoanEntry({title, reader, phone, days, address}) {
    return (
        <Entry 
            info = <LoanEntryInfo title={title} reader={reader} phone={phone} days={days} address={address} />
            icons = <LoanEntryIcons />
        />
    );
}

function LoansTable({data}) {

    const th_style = "py-2 px-4 border-b border-gray-200 text-base font-semibold text-gray-700 text-center";
    const td_style = "text-sm px-1 py-1 text-black text-center";

    let columns = ["Título", "Prestatario", "Encargado", "Fecha", "Duración", "Cédula", "Teléfono", "Teléfono Vecino", "Dirección"];

    return(
        <table className="min-w-full bg-white border border-gray-200 ">
                <thead className="bg-gray-100">
                    <tr>
                        { columns.map( (column) => ( <th className={th_style}>{column}</th>) ) }
                        <th className={th_style}>Terminar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map( (record) => (
                            <tr className="hover:bg-gray-100 transition-all">
                                { record.map( (field) => <td className={td_style}>{field}</td>) }
                                <td className={td_style}>
                                    <IconButton src={DenyIcon} alt="end" />
                                </td>
                            </tr>
                        ))
                    }
                    <tr className="hover:bg-gray-100 transition-all">
                    </tr>
                    
                </tbody>
            </table>
    );  
}

function Content() {

    const loanRequests = [
        ["El Principito", "Gloria Velázquez", "1234567890", 3, "Barcelona"]
    ];

    const ongoingLoans = [
        ["El hobbit", "Marta Jiménez", "LuisAlb56", "19-11-23", "3 días", "43.235.761", "111222333", "2223331112", "Puerto la Cruz"],
        ["Harry Potter y la piedra filosofal", "Luis Dominguez", "LuisAlb56", "29-10-24", "2 días", "89.111.223", "5555555555", "8888888888", "Barcelona"]
    ];

    const tabs = {
        'requests': 'Solicitudes',
        'ongoing': 'Vigentes'
    };

    let [content, setContent] = useState(tabs['requests']);

    function getContent() {

        return (content === tabs['ongoing']) 
            ? (<LoansTable data={ongoingLoans} />)
            : (loanRequests.map(loan => <LoanEntry title={loan[0]} reader={loan[1]} phone={loan[2]} days={loan[3]} address={loan[4]} />));

    }

    const setRequestsTab = () => { setContent(tabs['requests']); };
    const setOngoingTab = () => { setContent(tabs['ongoing']); };

    return (
        <div className="flex flex-col w-[75%] self-center pt-5">
            <TabButtons first_title={tabs['requests']} second_title={tabs['ongoing']} onFirst={setRequestsTab} onSecond={setOngoingTab} />
            {getContent()}
        </div>
    );
}

const Loans = () => {
    return (
        <MainPage section={GetPathTitle(PagePaths['Loans'])} content=<Content /> />
    );
}

export default Loans;