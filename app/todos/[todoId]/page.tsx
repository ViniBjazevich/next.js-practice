import React from "react";
import { Todo } from "../../../types";

type PageProps = {
  params: {
    todoId: string;
  };
};

const fetchTodo = async (todoId: string) => {
  /*
  'force cache'
  'no cache'
  { next: { revalidate: 60 } }

  Has caching built in, so if you visit a todo page, then go back to the todos list, and then visit the same todo page again, it will not make a new request to the API.

  No cache
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId}`, { cache: "no-cache" }
  );
  */
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId}`,
    {
      next: { revalidate: 60 },
    }
  );
  const todo: Todo = await res.json();

  return todo;
};

async function Todo({ params: { todoId } }: PageProps) {
  const todo = await fetchTodo(todoId);

  return (
    <div className="p-10 bg-yellow-200 border-2 m-2 shadow-lg">
      <p>
        #{todo.id} {todo.title}
      </p>
      <p>Completed: {todo.completed ? "yes" : "no"}</p>
      <p className="border-t border-black mt-5 text-right">
        By user: {todo.userId}
      </p>
    </div>
  );
}

export default Todo;

export async function getStaticParams() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
    next: { revalidate: 60 },
  });
  const todos: Todo[] = await res.json();

  return todos.map((todo) => ({
    todoId: todo.id.toString(),
  }));
}
