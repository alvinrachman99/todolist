package main

import (
	"log"
	"strings"

	"github.com/alvinrachman99/todolist/config"
	"github.com/alvinrachman99/todolist/database"
	"github.com/gofiber/fiber/v2"
)

type Todo struct {
	Task         string `json:"task"`
	Is_completed int16  `json:"is_completed"` // 0:todo, 1:doing, 2:done
}

func main() {
	cfg := config.LoadConfig()
	db := database.InitDB(cfg)
	defer db.Close()

	app := fiber.New()

	app.Get("/api/todos", func(c *fiber.Ctx) error {
		rows, err := db.Query("SELECT task, is_completed FROM todos")
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to select todos"})
		}
		defer rows.Close()

		var todos []Todo
		for rows.Next() {
			var todo Todo
			if err := rows.Scan(&todo.Task, &todo.Is_completed); err != nil {
				return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed scan todos"})
			}

			todos = append(todos, todo)
		}

		return c.Status(fiber.StatusOK).JSON(todos)
	})

	app.Get("/api/todos/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")

		row := db.QueryRow("SELECT task, is_completed FROM todos WHERE id = $1", id)

		var todo Todo
		if err := row.Scan(&todo.Task, &todo.Is_completed); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed select todo by id"})
		}

		return c.Status(fiber.StatusOK).JSON(todo)
	})

	app.Post("/api/create", func(c *fiber.Ctx) error {
		var newTodo Todo
		if err := c.BodyParser(&newTodo); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid input"})
		}

		if strings.TrimSpace(newTodo.Task) == "" {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Field task is required"})
		}

		_, err := db.Exec(
			"INSERT INTO todos (task, is_completed) VALUES ($1, $2)",
			newTodo.Task, newTodo.Is_completed,
		)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create todo"})
		}

		return c.Status(fiber.StatusCreated).JSON(newTodo)
	})

	app.Put("/api/update/:id", func(c *fiber.Ctx) error {
		var newTodo Todo

		if err := c.BodyParser(&newTodo); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid Input"})
		}

		if strings.TrimSpace(newTodo.Task) == "" {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Field task is required"})
		}

		id := c.Params("id")

		_, err := db.Exec(
			"UPDATE todos SET task = $1, is_completed = $2, updated_at = now() WHERE id = $3 ",
			newTodo.Task, newTodo.Is_completed, id,
		)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed update todos"})
		}

		return c.Status(fiber.StatusOK).JSON(newTodo)
	})

	app.Delete("/api/delete/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")

		_, err := db.Exec("DELETE FROM todos WHERE id = $1", id)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed delete todo"})
		}

		return c.Status(fiber.StatusOK).JSON(fiber.Map{"success": "data has been deleted"})
	})

	log.Fatal(app.Listen(":3000"))
}
