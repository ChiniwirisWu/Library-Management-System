import React, { useContext, useEffect, useState } from "react";
import sessionContext from "../session/session";
import { host_ip } from "../constants/host_ip";
import { listFromObject } from "../functions/objects";
import { MainPage } from "../components/reusables";
import { GetPathTitle } from "../constants/pages";
import { PagePaths } from "../constants/paths";
import { Entry } from "../components/reusables";
import { limitString } from "../functions/strings";
import { IconLink } from "../components/reusables";
import { IconButton } from "../components/reusables";
import { TabButtons } from "../components/reusables";
import AcceptIcon from "res/accept.svg";
import DenyIcon from "res/deny.svg";
import InfoImage from "res/info.svg"
import {fetchEmptyWithAuth} from "../functions/forms";
import { RestrictedComponent } from "../functions/permissions";
import { userRoles } from "../constants/roles";


function LoanEntryInfo({ title, reader, phone, days, address }) {
    const size = 50;

    return (
        <div className="flex flex-col align-middle text-center">
            <h6 className="font-bold text-xl">{limitString(title, size)}</h6>
            <h6 className="font-bold text-sm">{limitString(reader, size)}</h6>
            <p className="text-gray-600 font-light text-sm">{limitString(days.toString().concat(' días • ').concat(phone).concat(' • ').concat(address), size)}</p>
        </div>
    );
}

function LoanEntryIcons({loan, handlers}) {
    return (
        <>
            <RestrictedComponent component=<IconButton src={AcceptIcon} alt="accept" onClickHandler={handlers.acceptHandler} /> permissions={userRoles['admin']} />
            <RestrictedComponent component=<IconButton src={DenyIcon} alt="deny" onClickHandler={handlers.declineHandler} /> permissions={userRoles['admin']} />
            <IconLink src={InfoImage} content={loan} alt="info" path={PagePaths['LoanInfo']} />
        </>
    );
}

function LoanEntry({ loan, handlers }) {
    return (
        <Entry
            info=<LoanEntryInfo title={loan.titulo} reader={loan.nombre} phone={loan.telefono} days={loan.dias} address={loan.direccion} />
            icons=<LoanEntryIcons loan={loan} handlers={handlers} />
        />
    );
}

function LoansTable({ data, deleteHandler }) {

    const th_style = "w-[50px] py-2 px-2 border-b border-gray-200 text-base font-bold text-gray-700 text-center";
    const td_style = "w-[50px] text-sm px-2 py-1 text-black text-center";

    let columns = ["Título", "ISBN", "Prestatario", "Encargado", "Fecha", "Duración", "Cédula", "Teléfono", "Teléfono Vecino", "Dirección"];

    return (
        <div className="w-[250px] sm:w-[350px] md:w-[500px] lg:w-[750px] overflow-x-auto m-auto">
        <table className="bg-white border border-gray-200 overflox-x-auto">
            <thead className="bg-gray-100">
                <tr>
                    {columns.map((column) => (<th className={th_style}>{column}</th>))}
                    <RestrictedComponent permissions={userRoles['admin']} component= 
                        <th className={th_style}>
                            Terminar
                        </th> 
                    />
                </tr>
            </thead>
            <tbody>
                {
                    data.map((record) => (
                        <tr className="hover:bg-gray-100 transition-all">
                            {record.map((field) => <td className={td_style}>{field}</td>)}
                            <RestrictedComponent permissions={userRoles['admin']} component=
                                <td className="flex items-center justify-center py-[25%]">
                                    <IconButton onClickHandler={()=> deleteHandler(record[9], record[5])} src={DenyIcon} alt="end" />
                                </td>
                            />
                        </tr>
                    ))
                }
                <tr className="hover:bg-gray-100 transition-all">
                </tr>

            </tbody>
        </table>

        </div>
    );
}

function Content() {
    const [loanRequests, setLoanRequests] = useState([]);
    const [ongoingLoans, setOngoingLoans] = useState([]);
    const { session } = useContext(sessionContext)

    async function getAllLoansRequests(){
        let response = fetchEmptyWithAuth(`${host_ip}/loans/requested`, "get",session.token)
        .then(res=>res.json())
        .then(res=>{
            setLoanRequests(res);
        })
        .catch(err=>console.error(err))
    }   
    async function getAllLoansOngoing(){
        let response = fetchEmptyWithAuth(`${host_ip}/loans/ongoing`, "get", session.token)
        .then(res=>res.json())
        .then(res=>{
            setOngoingLoans(listFromObject(res, ['titulo', 'isbn', 'nombre', 'fk_trabajador', 'fecha_inicio', 'dias', 'cedula', 'telefono', 'telefonoVecino', 'direccion']))
        })
        .catch(err=>console.error(err))
    }   

    async function acceptLoanRequest(isbn, cedula){
        if(window.confirm("Está seguro de validar éste préstamo?")){
            let response = fetchEmptyWithAuth(`${host_ip}/loan/validateLoan/${isbn}/${cedula}`,"put", session.token)
            .then(res=>res.text())
            .then(res=>{
                getAllLoansRequests();
                getAllLoansOngoing();
            })
            .catch(err=>console.error(err))
        }
    }

    async function deleteLoan(isbn, cedula){
        if(window.confirm("Está seguro de eliminar éste préstamo?")){
            let response = fetchEmptyWithAuth(`${host_ip}/loan/${isbn}/${cedula}`, "delete", session.token)
            .then(res=>res.text())
            .then(res=>{
                getAllLoansRequests();
                getAllLoansOngoing();
            })
            .catch(err=>console.error(err))
        }
    }

    useEffect(()=>{
        getAllLoansRequests();
        getAllLoansOngoing();
    }, [])


    const tabs = {
        'requests': 'Solicitudes',
        'ongoing': 'Vigentes'
    };

    let [content, setContent] = useState(tabs['requests']);

    function getContent() {

        return (content === tabs['ongoing'])
            ? (<LoansTable deleteHandler={deleteLoan} data={ongoingLoans} />)
            : (loanRequests.map(loan => <LoanEntry loan={loan} handlers={{acceptHandler: ()=> acceptLoanRequest(loan.isbn, loan.cedula), declineHandler: ()=> deleteLoan(loan.isbn, loan.cedula)}} />));

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
