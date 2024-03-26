import uvicorn
from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import data

app = FastAPI()

origins = [
   "http://192.168.133.47:3000",
   "http://localhost",
   "http://localhost:3000",
]
app.add_middleware(
   CORSMiddleware,
   allow_origins=origins,
   allow_credentials=True,
   allow_methods=["*"],
   allow_headers=["*"],
)

class CreateTodo(BaseModel):
    title: str
    content: str
    status: str


@app.post("/createtodo")
async def createtodo(todo: CreateTodo):
    data.todos.append({
        'id': str(len(data.todos) + 1),
        'title': todo.title,
        'content': todo.content,
        'status': todo.status
    })
    
    return todo

@app.get("/todos")
async def createtodo():
    return data.todos

@app.get("/filteredtodos")
async def filteredtodos(query: str, page: int):
    filteredtodos = []
    todos = data.todos.copy()

    for i in range(len(todos)):
        if query in todos[i]['title'] or query in todos[i]['content'] or query in todos[i]['status']:
            filteredtodos.append(todos[i])
    return filteredtodos[(page - 1) * 6: page * 6]

@app.get("/todopages")
async def todopages(query: str):
    todos = data.todos.copy()

    count = 0

    for i in range(len(todos)):
        if query in todos[i]['title'] or query in todos[i]['content'] or query in todos[i]['status']:
            count += 1

    return count / 6 + 1

@app.delete("/deletetodo")
async def deletetodo(id: str):
    print(len(data.todos))
    index = -1
    deletedtodo = {}
    newtodos = []

    for i in range(len(data.todos)):
        if data.todos[i]['id'] == id:
            deletedtodo = data.todos[i]
            index = i
        else:
            todo = data.todos[i]
            if i > index:
                todo['id'] = str(int(todo['id']) - 1)
            newtodos.append(todo)


    data.todos = newtodos
    print(len(data.todos))

    return deletedtodo

@app.put("/completetodo")
async def completetodo(id: str):
    todo = data.todos[int(id) -1]
    if todo['status'] == "Completed":
        print("In Progress")
        todo['status'] = "In Progress"
    elif todo['status'] == "In Progress":
        print("Completed")
        todo['status'] = "Completed"
    data.todos[int(id) -1] = todo
    
    return todo

if __name__ == "__main__":
   uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)