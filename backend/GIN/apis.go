package main

import (
	"fmt"
	"net/http"
	"strconv"

	"todolist_next_go/models"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.GET("/todos", getTodos)
	router.GET("/filteredtodos", getFilteredTodos)
	router.POST("/createtodo", createTodo)
	router.GET("/todopages", getTodosPages)
	router.PUT("/completetodo", completeTodo)
	router.DELETE("/deletetodo", deleteTodo)
	router.Run("127.0.0.1:8000")
}

func getTodos(c *gin.Context) {
	todos := models.GetTodos()

	if todos == nil || len(todos) == 0 {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.IndentedJSON(http.StatusOK, todos)
	}
}

func getFilteredTodos(c *gin.Context) {
	query := c.Query("query")
	page, err := strconv.Atoi(c.DefaultQuery("page", "1"))
	if err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
	}

	todos := models.GetFilteredTodos(query, page)

	if todos == nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.IndentedJSON(http.StatusOK, todos)
	}
}

func createTodo(c *gin.Context) {
	var todo models.Todo
	fmt.Println("-------------Creating Todo-------------")
	if err := c.ShouldBind(&todo); err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		fmt.Println("-------------Todo Binded-------------")
		models.CreateTodo(todo)
		c.IndentedJSON(http.StatusCreated, todo)
	}
}

func getTodosPages(c *gin.Context) {
	query := c.Query("query")
	pages := models.GetTodoPages(query)

	c.IndentedJSON(http.StatusOK, pages)
}

func completeTodo(c *gin.Context) {
	id, err := strconv.Atoi(c.Query("id"))

	if err != nil {
		panic(err.Error())
	}

	if !models.CompleteTodo(id) {
		c.AbortWithStatus(http.StatusExpectationFailed)
	} else {
		c.IndentedJSON(http.StatusOK, id)
	}
}

func deleteTodo(c *gin.Context) {
	id, err := strconv.Atoi(c.Query("id"))

	if err != nil {
		panic(err.Error())
	}

	if !models.DeleteTodo(id) {
		c.AbortWithStatus(http.StatusExpectationFailed)
	} else {
		c.IndentedJSON(http.StatusOK, id)
	}
}
