import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

type Todo = {
  id: string;
  text: string;
  isCompleted: boolean;
};

const todos: Todo[] = [
  { id: "1", text: "Learn React", isCompleted: true },
  { id: "2", text: "Learn TypeScript", isCompleted: true },
  { id: "3", text: "Learn Tailwind", isCompleted: false },
];

function App() {
  return (
    <main className="h-screen w-full flex items-center justify-center">
      <div className="max-h-[40rem] max-w-[25rem] w-full h-full p-4">
        <h1 className="text-5xl font-bold text-center mb-6">Todos</h1>
        <Input placeholder="Add a todo..." />
        <Button>Hello</Button>
      </div>
    </main>
  );
}

export default App;
