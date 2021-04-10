import "./App.css";
import TodoItem from "./components/todoItem";
import { Fragment, useEffect, useState } from "react";

function App() {
  const [todoItems, setTodoItems] = useState(null);

  useEffect(() => {
    console.log("Loaded up");
    if (!todoItems) {
      fetch("http://localhost:8080/api/todoItems")
      .then((response) => response.json()
      .then((data) => {
          console.log(data);
          setTodoItems(data);
        })
      );
    }
  }, [todoItems]);

  function addNewTodoItem() {
    fetch("http://localhost:8080/api/todoItems", {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTodoItems([...todoItems, data]);
      });
  }

  function handleDeleteTodoItem(item) {
    const updatedTodoItems = todoItems.filter(
      (todoItem) => todoItem.id !== item.id
    );
    setTodoItems([...updatedTodoItems]);
  }

  return (
    <>
      <div>
        <button onClick={addNewTodoItem}>Add new item</button>
      </div>
      <div>
        {todoItems
          ? todoItems.map((todoItem) => {
              return (
                <TodoItem
                  key={todoItem.id}
                  data={todoItem}
                  emitDeleteTodoItem={handleDeleteTodoItem}
                />
              );
            })
          : "loading data.."}
      </div>
    </>
  );
}

export default App;
