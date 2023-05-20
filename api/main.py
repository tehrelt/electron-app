from base64 import encode
import base64
import json
import psycopg2 as postgre
from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI()



def get_cursor():
    conn = postgre.connect(dbname='amazing', user='postgres',
                            password='1337', host='localhost', port='5432')
    cursor = conn.cursor()
    conn.autocommit = True
    return cursor


@app.get('/')
def get_root():
    html_content = "<h2>Hello METANIT.COM!</h2>"
    return HTMLResponse(content=html_content)

@app.get('/users')
def get_users():
    cursor = get_cursor()
    cursor.execute('SELECT * from public."Users"')
    items = cursor.fetchall()
    
    rows = [(item[0], item[1], item[2], base64.b64encode(item[3])) for item in items]
    
    return rows


@app.get('/users/{user_id}')
def get_user_by_id(user_id: int):
    cursor = get_cursor()
    cursor.execute(f'SELECT * FROM public."Users" WHERE "Id" = {user_id}')
    d = cursor.fetchone()
    return (d[0], d[1], d[2], base64.b64encode(d[3]))


