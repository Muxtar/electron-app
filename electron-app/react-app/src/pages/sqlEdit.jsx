import React, { useRef, useEffect } from "react";
import { useContext } from "react";
import { MyContext } from "./myContext";
import '../static/css/Cards.css'

function CardEmeliyyat(){
    const tarixIcon = useRef();
    const {user} = useContext(MyContext);
   
    function editTarix(e){
        if(tarixIcon.current.className == 'fas fa-x'){
            tarixIcon.current.className = 'fas fa-sync fa-spin';
            fetch('http://127.0.0.1:8000/emeliyyat-aciqlama?edit=Tarix', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(user)
            }).then(data => {
                return data.json()
            }).then(data => {
                tarixIcon.current.className = 'fa-solid fa-check';
            }).catch(error => {
                console.log('error isledi')
            })
        }
    }

    function checkEmeliyyatAciqlama(e){
        e.target.className = "fas fa-sync fa-spin";
        tarixIcon.current.className = 'fas fa-sync fa-spin';

        fetch('http://127.0.0.1:8000/emeliyyat-aciqlama', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user)
        }).then(data => {
            return  data.json()
        }).then(data => {
            if(!data['Tarix']){
                tarixIcon.current.className = 'fa-solid fa-check';
            }else{
                tarixIcon.current.className = "fas fa-x"
            }
            e.target.className = 'fas fa-sync'
        }).catch(data => {

        })
    }

    return(
        <div className="card">
             <div className="card-content">

                <div className="content-head">
                    <div className="check-table">
                        <i className="fas fa-sync" onClick={checkEmeliyyatAciqlama}></i> 
                    </div>
                    <div className="table-name">
                        <p style={{margin:'0'}}>Emeliyyat_aciqlama</p>
                    </div>
                </div>

                <div className="content-body">
                    <div className="column">
                        <div className="column-name">Tarix column</div>
                        <i className="fas fa-sync" ref={tarixIcon} onClick={editTarix}></i>
                    </div>
                    <div className="delete-dublicate">
                        <button disabled>Not Delete Dublicate</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function CardAudit(){
    const table = {
        name:'Audit',
        columns:['Voen_Alma_Tarixi', 'EDV_Qeydiyyat_Tarixi'],
        deleteDublicate:true,
        link:function(){
            return `http://127.0.0.1:8000/${this.name}`
        }
    }
    
    const {user} = useContext(MyContext);
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
            e.target.className = 'fas fa-sync'
            for(let i of refArray){
                if(!data[i.current.getAttribute('name')]){
                    i.current.className = 'fa-solid fa-check';
                }else{
                    i.current.className = 'fas fa-x';
                }
            }
        }).catch(error => {
            console.log('error yarandi')
        })
    }

    const editColumn = (columnName, refTag) => {
        if(refTag.current.className == 'fas fa-x'){
            refTag.current.className = 'fas fa-sync fa-spin';
            const link = `${table.link()}?column=${columnName}`
            fetch(link, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(user)
            }).then(data => {
                return data.json()
            }).then(data => {
                refTag.current.className = '';
            }).catch(error => {
                console.log('error yarandi')
            })
        }
        else{
            console.log('islemedi')
        }
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
                    <div className="delete-dublicate">
                        <button disabled={table.deleteDublicate == false ? true : false}>Delete Dublicate</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Cards(){
    return(
        <div className="main-cards">
            <div className="cards">
                <CardEmeliyyat />
                <CardAudit />
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