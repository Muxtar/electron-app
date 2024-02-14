from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import json
import pyodbc
from settings import *
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ['*'],
    allow_headers=['*']
)

def checkData(user:dict) -> dict:
    if user['isadmin'] and user['secretKey'] == SECRET_KEY:
        return True
    return False

@app.post('/emeliyyat-aciqlama')
async def emeliyyat_aciqlama(request:Request):
    if request.url == 'http://127.0.0.1:8000/emeliyyat-aciqlama':
        user = await request.json()
        response = {}
        if checkData(user):
            with pyodbc.connect(conn_string) as sql:
                cr = sql.cursor()
                cr.execute("SELECT * FROM (SELECT TOP 1 Tarix FROM dbo.Emeliyyat_aciqlama ORDER BY ID DESC) as e_aciqlama where Tarix LIKE '%-%'")
                response['Tarix'] = bool(cr.fetchall())
            return response
    else:
        user = await request.json()
        if checkData(user):
            with pyodbc.connect(conn_string) as sql:
                cr = sql.cursor()
                cr.execute("""UPDATE dbo.Emeliyyat_aciqlama set Tarix = FORMAT(CAST(Tarix AS DATE), 'dd.MM.yyyy')
                WHERE ISDATE(Tarix) = 1 and Tarix LIKE '%-%'""")
            return 'edit tarix run'

    return {'message':'Permission Error'}



@app.post('/Audit')
async def audit(request:Request):
    # WITH DuplicateRows AS (
    #     SELECT *,
    #             ROW_NUMBER() OVER (PARTITION BY 
    #             [VOEN]
    #             ORDER BY INSERTED_DATE desc) AS RowNum
    #     FROM dbo.Audit
    # )DELETE FROM DuplicateRows WHERE RowNum > 1;

    user = await request.json()
    if checkData(user):
        if request.url == 'http://127.0.0.1:8000/Audit':
            print(request.url)
            # response = {}
            # with pyodbc.connect(conn_string) as sql:
            #     cr = sql.cursor()
            #     cr.execute("SELECT * FROM dbo.Audit WHERE Voen_Alma_Tarixi LIKE '%/%'")
            #     response['Voen_Alma_Tarixi'] = bool(cr.fetchall())    
            #     cr.execute("SELECT * FROM dbo.Audit WHERE EDV_Qeydiyyat_Tarixi LIKE '%/%'")
            #     response['EDV_Qeydiyyat_Tarixi'] = bool(cr.fetchall())
            #     return response
        else:
            print(request.query_params.get('column'))
    return 'Permission error'


@app.post('/Ishci')
async def audit(request:Request):
    # data = await request.json()
    print(request.url)
    return 'Ishci run'


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host=HOST, port=PORT)