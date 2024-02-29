import { useQuery } from "react-query";
import { Button } from "./components/ui/button";
import { getTodos } from "./lib/api";
import { Collections } from "./lib/types";
import Todo from "./components/todo";
import Adder from "./components/adder";

function App() {
  const todosQuery = useQuery({
    queryKey: [Collections.Todos],
    queryFn: getTodos,
  });

  return (
    <main className="h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="max-h-[40rem] max-w-[25rem] w-full h-full p-4 flex flex-col gap-4">
        <h1 className="text-5xl font-bold text-center mb-6">Todos</h1>
        <Adder />
        <div className="flex flex-col gap-2 overflow-auto">
          {todosQuery.data?.map((todo) => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </div>
        <Button
          variant="secondary"
          disabled={todosQuery.data?.filter((i) => i.complete).length === 0}
        >
          Delete Completed
        </Button>
      </div>
    </main>
  );
}

export default App;
