from fastapi import FastAPI

app = FastAPI()

SECRET_KEY = '109342!(&(()))_+awqxbcvasapoqwpquzha)*^^%#@$4724'

@app.get('/')
async def root():
    return {'message':'Hello from FastAPI server'}