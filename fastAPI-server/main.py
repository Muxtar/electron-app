from fastapi import FastAPI, Request
# import settings
from settings import HOST, PORT, SECRET_KEY

import json

app = FastAPI()

def checkToken(user:dict) -> bool:
    pass

@app.get('/')
async def root():
    return {'message':'Hello from FastAPI server'}


@app.post('/sql-query')
async def sqlQuery(request:Request):
    return {'message':'fast sql query run'}


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host=HOST, port=PORT)