import React, { useRef, useEffect } from "react";
import { useContext } from "react";
import { MyContext } from "./myContext";
import '../static/css/Cards.css'

function Card({table}){    
    const {user} = useContext(MyContext);
    const trash = useRef();
    const refArray = table.columns.map(data => React.createRef())

    function checkColumns(e){
        e.target.className = 'fas fa-sync fa-spin'
        refArray.forEach(element => {
            element.current.className = 'fas fa-sync fa-spin';
        });

        fetch(table.link(), {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user)
        }).then(data => {
            return data.json();
        }).then(data => {
            console.log(data)
            e.target.className = 'fas fa-sync'
            for(let i of refArray){
                if(!data[i.current.getAttribute('name')]){
                    i.current.className = 'fa-solid fa-check';
                }else{
                    i.current.className = 'fas fa-x';
                }
            }
        }).catch(error => {
            e.target.className = 'fas fa-sync'
            for(let i of refArray){
                i.current.className = 'fas fa-x';
            }
        })
    }
    const editColumn = (columnName, refTag) => {
        if(refTag.current.className == 'fas fa-x'){
            refTag.current.className = 'fas fa-sync fa-spin';
            const link = `${table.link()}?column=${columnName}`;

            fetch(link, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(user)
            }).then(data => {
                return data.json()
            }).then(data => {
                refTag.current.className = 'fa-solid fa-check';
            }).catch(error => {
                console.log('error yarandi')
            })
        }
        else{
            console.log('islemedi')
        }
    }
    const deleteDublicate = (e) => {
        console.log(e.target)
        trash.current.className = 'fas fa-sync fa-spin';
        const link = `${table.link()}?delete=dublicate`;
        fetch(link, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user)
        }).then(data => {
            return data.json()
        }).then(data => {
            trash.current.className = 'fa-solid fa-check';
        }).catch(error => {
            console.log('error yarandi')
        })
    }

    return(
        <div className="card">
             <div className="card-content">
                <div className="content-head">
                    <div className="check-table">
                        <i className="fas fa-sync" onClick={checkColumns}></i> 
                    </div>
                    <div className="table-name">
                        <p style={{margin:'0'}}>{table.name}</p>
                    </div>
                </div>

                <div className="content-body">
                    {
                        table.columns.map((value, index, list)=>{
                            return(
                                <div className="column" key={index}>
                                    <div className="column-name">{value}</div>
                                    <i className="fas fa-sync" ref={refArray[index]} name={table.columns[index]} onClick={editColumn.bind(this, table.columns[index], refArray[index])}></i>
                                </div>
                                )       
                        })
                    }
                   
                </div>

                <div className="content-footer">
                    <div className="delete-dublicate">
                        <button disabled={table.deleteDublicate == false ? true : false} onClick={deleteDublicate}>Delete Dublicate
                            <i className="fa-solid fa-trash" style={{marginLeft:"10px"}} ref={trash}></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Cards(){
    const tableAudit = {
        name:'Audit',
        columns:['Voen_Alma_Tarixi', 'EDV_Qeydiyyat_Tarixi'],
        deleteDublicate:true,
        link:function(){
            return `http://127.0.0.1:8000/${this.name}`
        }
    }
    const tableObyekt = {
        name:'Obyekt',
        columns:[
                    'Icare_Muqavile_Tarixi', 
                    'Sened_Tarixi',
                    'Natarius_Sened_Tarixi',
                    'Qeydiyyat_Tarixi',
                    'Qeydiyyatdan_cixma_tarixi',
                ],
        deleteDublicate:true,
        link:function(){
            return `http://127.0.0.1:8000/${this.name}`
        }
    }
    const tableEmeliyyatAciqlama = {
        name:'Emeliyyat_aciqlama',
        columns:['Tarix'],
        deleteDublicate:false,
        link:function(){
            return `http://127.0.0.1:8000/${this.name}`
        }
    }
    const tableRehberTesisci = {
        name:'Rehber_Tesisci',
        columns:[
                    'Rehber_FIN',
                    'Tesisci_PIN',
                    'Tesisci_VOEN',
                    'Tesisci_PIN',
                    'R_CODE',
                    'T_CODE'
                ],
        deleteDublicate:true,
        link:function(){
            return `http://127.0.0.1:8000/${this.name}`
        }
    }
    const tableEmeliyyatLegv = {
        name:'Emeliyyat_Legv',
        columns:[
                    'Legv_Tarix'
                ],
        deleteDublicate:false,
        link:function(){
            return `http://127.0.0.1:8000/${this.name}`
        }
    }

    const tableIshci = {
        name:'Ishci',
        columns:[
                    'Bildirish_tarixi',
                    'Bashlama_bashlama_tarixi',
                    'Muqavilenin_bitme_tarixi',
                    'Ishci_doqum_tarixi'
                ],
        deleteDublicate:true,
        link:function(){
            return `http://127.0.0.1:8000/${this.name}`
        }
    }
    const tableAlishAkti = {
        name:'Alish_Akti',
        columns:[
                    'Tarix'
                ],
        deleteDublicate:false,
        link:function(){
            return `http://127.0.0.1:8000/${this.name}`
        }
    }
    const tableAvtomobil = {
        name:'Avtomobil',
        columns:[
                    'Qeydiyyat_Tarixi',
                    'Etibar_Verilme_Tarixi'
                ],
        deleteDublicate:true,
        link:function(){
            return `http://127.0.0.1:8000/${this.name}`
        }
    }
    const tableEmlak = {
        name:'Emlak',
        columns:[
                    'Daxil_Olma_Tarixi',
                    'Cap_Tarixi'
                ],
        deleteDublicate:false,
        link:function(){
            return `http://127.0.0.1:8000/${this.name}`
        }
    }

    return(
        <div className="main-cards">
            <div className="cards">
                <Card table = {tableEmeliyyatAciqlama}/>
                <Card table = {tableEmeliyyatLegv}/>
                <Card table = {tableObyekt}/>
                <Card table = {tableAudit}/>
                <Card table = {tableRehberTesisci}/>
                <Card table = {tableIshci}/>
                <Card table={tableAlishAkti} />
                <Card table={tableAvtomobil} />
                <Card table={tableEmlak}/>
            </div>
        </div>
    )
}

export default function SqlEdit(){
    function senSqlQuery(){
        window.SQLQUERY.send('sql-query-test')
    }

    return(
        <div className="in-div-cards">
            <Cards />
        </div>
    )
}

console.log(!window.navigator.onLine)
