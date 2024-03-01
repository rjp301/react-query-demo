import { CheckCircle } from "lucide-react";
import Adder from "./components/adder";
import TodoList from "./components/todo-list";

function App(): ReturnType<React.FC> {
  return (
    <main className="w-full flex justify-center flex-col">
      <header className="sticky top-0 container max-w-sm flex flex-col gap-6 pb-4 pt-6 bg-background">
        <h1 className="w-full text-5xl font-bold flex items-center justify-center gap-5">
          <CheckCircle size="3rem" className="text-primary" />
          Todos
        </h1>

        <Adder />
      </header>
      <section className="container max-w-sm">
        <TodoList />
      </section>
    </main>
  );
}

export default App;
