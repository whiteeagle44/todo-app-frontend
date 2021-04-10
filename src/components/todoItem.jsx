import React, { useEffect, useState } from "react";

const TodoItem = (props) => {
  const { emitDeleteTodoItem } = props;
  const [todoItem, setTodoItem] = useState(props.data);
  const [isDirty, setDirty] = useState(false);
  useEffect(() => {
    if (isDirty) {
      fetch(`http://localhost:8080/api/todoItems/${todoItem.id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(todoItem),
      })
        .then((response) => response.json())
        .then((data) => {
          setDirty(false);
          setTodoItem(data);
        });
      console.log("todo item just changed", todoItem);
    }
  }, [todoItem, isDirty]);

  function deleteTodoItem() {
    fetch(`http://localhost:8080/api/todoItems/${todoItem.id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        emitDeleteTodoItem(todoItem);
      });
    console.log("todo item deleted", todoItem);

  }

  return (
    <div>
      <input
        type="checkbox"
        checked={todoItem.done}
        onChange={() => {
          setDirty(true);
          setTodoItem({ ...todoItem, done: !todoItem.done });
        }}
      />
      {todoItem.done ? (
        <s>{todoItem.task}</s>
      ) : (
        <input
          type="text"
          value={todoItem.task}
          onChange={(e) => {
            setDirty(true);
            setTodoItem({ ...todoItem, task: e.target.value });
          }}
        />
      )}
      <span style={{ cursor: "pointer" }} onClick={deleteTodoItem}>
        ❌
      </span>
    </div>
  );
};

export default TodoItem;
