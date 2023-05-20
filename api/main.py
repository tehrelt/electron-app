import psycopg2 as postgre
from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI()

conn = postgre.connect(dbname='amazing', user='postgres',
                       password='1337', host='localhost', port='5432')
cursor = conn.cursor()
conn.autocommit = True


@app.get('/')
def get_root():
    html_content = "<h2>Hello METANIT.COM!</h2>"
    return HTMLResponse(content=html_content)

@app.get('/users')
def get_users():
    cursor.execute('SELECT "Id", "UserName", "Email" from public."Users"')
    rows = cursor.fetchall()
    
    return rows