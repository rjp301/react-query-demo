import Adder from "./components/adder";
import TodoList from "./components/todo-list";

function App(): ReturnType<React.FC> {
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
