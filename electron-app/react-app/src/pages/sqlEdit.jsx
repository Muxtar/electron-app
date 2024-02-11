import React from "react";
import '../static/css/Cards.css'

function Card(){
    let table = {
        name:'Obyekt',
        colums:{
            'Tarix':"SELECT TOP 1 Tarix FROM WHERE Tarix LIKE '%/%'",
        },
    }
    return(
        <div className="card">
             <div className="card-content">

                <div className="content-head">
                    <div className="check-table">
                        <i class="fas fa-sync"></i> 
                        {/* fa-spin */}
                    </div>
                    <div className="table-name">
                        <h4>{table.name} Table</h4>
                    </div>
                </div>

                <div className="content-body">
                    <div className="column">
                        <div className="column-name">Tarix column</div>
                        <i class="fa-solid fa-check"></i>
                    </div>
                    <div className="column">
                        <div className="column-name">Qeydiyyat-tarixi column</div>
                        <i class="fas fa-edit"></i>
                    </div>
                    <div className="delete-dublicate">
                        <button>Delete Dublicate</button>
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
                <Card />
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