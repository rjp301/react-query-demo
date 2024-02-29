import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useMutation } from "react-query";
import { addTodo } from "@/lib/api";
import { Collections } from "@/lib/types";
import { queryClient } from "@/lib/query";

export default function Adder(): ReturnType<React.FC> {
  const addTodoMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries([Collections.Todos]);
    },
  });

  const [value, setValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

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
            addTodoMutation.mutate(value);
            setValue("");
          }
        }}
      />
      <Button size="icon" className="aspect-square" type="submit">
        <Plus size="1.2rem" />
      </Button>
    </div>
  );
}
