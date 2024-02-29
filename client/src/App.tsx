import { useMutation, useQuery } from "react-query";
import { Button } from "./components/ui/button";
import { deleteCompletedTodos, getTodos } from "./lib/api";
import { Collections } from "./lib/types";
import Todo from "./components/todo";
import Adder from "./components/adder";
import { queryClient } from "./lib/query";
import TodoList from "./components/todo-list";

function App() {
  const todosQuery = useQuery({
    queryKey: [Collections.Todos],
    queryFn: getTodos,
  });

  const deleteCompleteMutation = useMutation({
    mutationFn: () => deleteCompletedTodos(),
    onSuccess: () => {
      queryClient.invalidateQueries([Collections.Todos]);
    },
  });

  return (
    <main className="h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="min-h-[40rem] max-w-[25rem] max-h-screen w-full p-4 flex flex-col gap-4">
        <h1 className="text-5xl font-bold text-center mb-6">Todos</h1>
        <Adder />
        <TodoList />
      </div>
    </main>
  );
}

export default App;
