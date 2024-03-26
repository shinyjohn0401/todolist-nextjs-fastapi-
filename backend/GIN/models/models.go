package models

import (
	"database/sql"
	"fmt"
	"strings"

	_ "github.com/go-sql-driver/mysql"
)

type Todo struct {
	Id      int    `json:"id"`
	Title   string `json:"title"`
	Content string `json:"content"`
	Status  string `json:"status"`
}

const dbuser = "root"
const dbpass = ""
const dbname = "todolist_next_go"

func GetTodos() []Todo {
	db, err := sql.Open("mysql", dbuser+":"+dbpass+"@tcp(127.0.0.1:3306)/"+dbname)

	if err != nil {
		fmt.Println("Err", err.Error())
		return nil
	}

	defer db.Close()

	results, err := db.Query("SELECT * FROM todo")

	if err != nil {
		fmt.Println("Err", err.Error())
		return nil
	}

	todos := []Todo{}

	for results.Next() {
		var todo Todo

		err = results.Scan(&todo.Id, &todo.Title, &todo.Content, &todo.Status)

		if err != nil {
			panic(err.Error())
		}

		todos = append(todos, todo)
	}

	return todos
}

func GetFilteredTodos(query string, page int) []Todo {
	db, err := sql.Open("mysql", dbuser+":"+dbpass+"@tcp(127.0.0.1:3306)/"+dbname)

	if err != nil {
		fmt.Println("Err", err.Error())
		return nil
	}

	defer db.Close()

	searchQuery := "%" + strings.Trim(query, "\"") + "%"
	results, err := db.Query("SELECT * FROM todo WHERE title LIKE ? LIMIT ? OFFSET ?", searchQuery, 6, 6*(page-1))

	if err != nil {
		fmt.Println("Err", err.Error())
		return nil
	}

	todos := []Todo{}

	for results.Next() {
		var todo Todo

		err = results.Scan(&todo.Id, &todo.Title, &todo.Content, &todo.Status)

		if err != nil {
			panic(err.Error())
		}

		todos = append(todos, todo)
	}

	return todos
}

func CreateTodo(todo Todo) {
	db, err := sql.Open("mysql", dbuser+":"+dbpass+"@tcp(127.0.0.1:3306)/"+dbname)

	if err != nil {
		panic(err.Error())
	}

	defer db.Close()

	insert, err := db.Query("INSERT INTO todo (title, content, status) VALUES (?,?,?)", todo.Title, todo.Content, todo.Status)

	if err != nil {
		panic(err.Error())
	}

	defer insert.Close()
}

func GetTodoPages(query string) int {
	todos := GetTodos()
	page := len(todos)/6 + 1
	return page
}

func CompleteTodo(id int) bool {
	db, err := sql.Open("mysql", dbuser+":"+dbpass+"@tcp(127.0.0.1:3306)/"+dbname)

	if err != nil {
		fmt.Println("Err", err.Error())
		return false
	}

	defer db.Close()

	result, err := db.Query("SELECT * FROM todo WHERE id=?", id)

	if err != nil {
		fmt.Println("Err", err.Error())
		return false
	}

	var todo Todo
	result.Next()
	result.Scan(&todo.Id, &todo.Title, &todo.Content, &todo.Status)

	if todo.Status == "In Progress" {
		todo.Status = "Completed"
	} else {
		todo.Status = "In Progress"
	}

	fmt.Println("id: ? / status: ?", todo.Id, todo.Status)

	db.Query("UPDATE todo SET status=? WHERE id=?", todo.Status, todo.Id)

	return true
}

func DeleteTodo(id int) bool {
	db, err := sql.Open("mysql", dbuser+":"+dbpass+"@tcp(127.0.0.1:3306)/"+dbname)

	if err != nil {
		fmt.Println("Err", err.Error())
		return false
	}

	defer db.Close()

	_, del_err := db.Query("DELETE FROM todo WHERE id=?", id)

	if del_err != nil {
		fmt.Println("Err", err.Error())
		return false
	}
	return true
}
