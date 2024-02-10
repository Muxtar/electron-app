import React from "react";

function SqlCard(){
    return(
        <div>card rehber</div>
    )
}

export default function SqlEdit(){
    function senSqlQuery(){
        window.SQLQUERY.send('sql-query-test')
    }
    return(
        <div className="in-div">
            <button onClick={senSqlQuery}>Sql select check</button>
        </div>
    )
}