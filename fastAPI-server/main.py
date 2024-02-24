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

# @app.middleware('http')
# async def add_middleware(request:Request, call_next):
#     response = await call_next(request)
#     print('Middleware run', request)
#     return response

def checkData(user:dict) -> dict:
    if user['isadmin'] and user['secretKey'] == SECRET_KEY:
        return True
    return False

def generateLink(host = '127.0.0.1', port = '8000', *, path) -> str:
    return f'http://{host}:{port}{path}'

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
    user = await request.json()

    if checkData(user):
        if request.url == 'http://127.0.0.1:8000/Audit':
            response = {}
            with pyodbc.connect(conn_string) as sql:
                cr = sql.cursor()
                cr.execute("SELECT * FROM dbo.Audit WHERE Voen_Alma_Tarixi LIKE '%/%'")
                response['Voen_Alma_Tarixi'] = bool(cr.fetchall())    
                cr.execute("SELECT * FROM dbo.Audit WHERE EDV_Qeydiyyat_Tarixi LIKE '%/%'")
                response['EDV_Qeydiyyat_Tarixi'] = bool(cr.fetchall())
                return response           
        elif request.url in ['http://127.0.0.1:8000/Audit?column=Voen_Alma_Tarixi', 'http://127.0.0.1:8000/Audit?column=EDV_Qeydiyyat_Tarixi']:
            if request.query_params.get('column') == 'Voen_Alma_Tarixi':
                with pyodbc.connect(conn_string) as sql:
                    cr = sql.cursor()
                    query = """UPDATE dbo.Audit SET Voen_Alma_Tarixi = FORMAT(CONVERT(DATE, Voen_Alma_Tarixi, 101), 'dd.MM.yyyy')
                    WHERE ISDATE(Voen_Alma_Tarixi) = 1 AND Voen_Alma_Tarixi LIKE '%/%'
                    """
                    cr.execute(query)  

            elif request.query_params.get('column') == 'EDV_Qeydiyyat_Tarixi':
                with pyodbc.connect(conn_string) as sql:
                    cr = sql.cursor()
                    query = """UPDATE dbo.Audit SET EDV_Qeydiyyat_Tarixi = FORMAT(CONVERT(DATE, EDV_Qeydiyyat_Tarixi, 101), 'dd.MM.yyyy')
                    WHERE ISDATE(EDV_Qeydiyyat_Tarixi) = 1 AND EDV_Qeydiyyat_Tarixi LIKE '%/%';
                    """
                    cr.execute(query)        
            return 'success'
        elif request.url == 'http://127.0.0.1:8000?delete=dublicate':
            query = """WITH DuplicateRows AS (
                    SELECT *,
			                ROW_NUMBER() OVER (PARTITION BY 
			                [VOEN]
			                ORDER BY INSERTED_DATE desc) AS RowNum
                    FROM dbo.Audit
                )DELETE FROM DuplicateRows WHERE RowNum > 1;"""
            
            with pyodbc.connect(conn_string) as sql:
                cr = sql.cursor()
                cr.execute(query)
                return 'success'
            
    return 'Permission error'


@app.post('/Ishci')
async def audit(request:Request):
    user = await request.json()
    if checkData(user):
        if request.url == generateLink(path='/Ishci'):
            response = {}
            with pyodbc.connect(conn_string) as sql:
                cr = sql.cursor()
                query1 = """SELECT TOP 1 * FROM dbo.Ishci WHERE Bildirish_tarixi like '%/%'"""
                cr.execute(query1)
                response['Bildirish_tarixi'] = bool(cr.fetchall())
                # # -----------------------------------------------------

                query2 = """SELECT TOP 1 * FROM dbo.Ishci WHERE Bashlama_bashlama_tarixi like '%/%'"""
                cr.execute(query2)
                response['Bashlama_bashlama_tarixi'] = bool(cr.fetchall())
                # # -----------------------------------------------------

                query3 = "SELECT TOP 1 * FROM dbo.Ishci WHERE Muqavilenin_bitme_tarixi like '%/%'"
                cr.execute(query3)
                response['Muqavilenin_bitme_tarixi'] = bool(cr.fetchall())
                # # -----------------------------------------------------

                query4 = "SELECT TOP 1 * FROM dbo.Ishci WHERE Ishci_doqum_tarixi like '%/%'"
                cr.execute(query4)
                response['Ishci_doqum_tarixi'] = bool(cr.fetchall())

                return response
        else:
            print('ishci main islemedi')
    return 'Ishci run'



@app.post('/Obyekt')
async def obyekt(request:Request):
    return 'not complate'


@app.post('/Rehber_Tesisci')
async def rehber_tesisci(request:Request):
    return 'not complate'


@app.post('/Emeliyyat_Legv')
async def emeliyyat_legv(request:Request):
    return 'not complate'

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host=HOST, port=PORT)