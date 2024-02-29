import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useMutation } from "react-query";
import { addTodo } from "@/lib/api";
import { Collections } from "@/lib/types";
import { queryClient } from "@/lib/query";

export default function Adder(): ReturnType<React.FC> {
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const addTodoMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries([Collections.Todos]);
    },
  });

  const create = () => {
    if (value) {
      addTodoMutation.mutate(value);
      setValue("");
      inputRef.current?.focus();
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <Input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="text-md px-4"
        placeholder="Add a todo..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            create();
          }
        }}
      />
      <Button onClick={create} disabled={!value}>
        <Plus size="1.2rem" className="mr-2" />
        Add
      </Button>
    </div>
  );
}
