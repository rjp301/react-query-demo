import pb from "./pocketbase";
import { Collections, TodosResponse } from "./types";

export const getTodos = () =>
  pb
    .collection<TodosResponse>(Collections.Todos)
    .getFullList({ sort: "complete" });

export const addTodo = (label: string) =>
  pb.collection(Collections.Todos).create({ label, complete: false });

export const deleteTodo = (id: string) =>
  pb.collection(Collections.Todos).delete(id);

export const updateTodoComplete = (id: string, complete: boolean) =>
  pb.collection(Collections.Todos).update(id, { complete });

export const deleteCompletedTodos = async () => {
  const completed = await pb
    .collection(Collections.Todos)
    .getFullList({ filter: "complete = true" });
  return Promise.all(
    completed.map((todo) => pb.collection(Collections.Todos).delete(todo.id))
  );
};
