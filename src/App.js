import "./App.css";
import "./index.css";
import { useState, useEffect } from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    const temp = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(temp);

    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos", temp);
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };

    setTodos([...todos].concat(newTodo));
    setTodo("");
  };

  if (todo.text) {
  }

  const deleteTodo = (id) => {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleComplete = (id) => {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const submitTodo = (id) => {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  };

  return (
    <div className="bg-[#6E2594]">
      <div className="text-center flex flex-col h-screen justify-center ">
        <h1 className="text-3xl mb-40 md:text-4xl text-[#FFFFFF]">TODO LIST</h1>
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center"
        >
          <input
            type="text"
            className={`placeholder:text-[#FFFFFF] text-[#FFFFFF] py-3 px-8 rounded-full bg-[#808080]`}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Activity"
            value={todo}
            required
          />
          {/* <button
            type="submit"
            className="px-8 py-3 bg-[#F5CB5C] rounded-full text-[#000000]"
          >
            Add Todo
          </button> */}
          <button type="submit">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 1024 1024"
              height="3em"
              className="bg-[#000] ml-5 rounded-full text-[#F5CB5C] cursor-pointer"
              width="3em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm192 472c0 4.4-3.6 8-8 8H544v152c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V544H328c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h152V328c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v152h152c4.4 0 8 3.6 8 8v48z"></path>
            </svg>
          </button>
        </form>
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-center justify-center">
            {todoEditing === todo.id ? (
              <input
                type="text"
                required
                onChange={(e) => setEditingText(e.target.value)}
                value={editingText}
                className="bg-[#808080] pl-5 rounded-full py-3 mt-10 outline-none text-[#FFFFFF]"
              />
            ) : (
              <p
                className={`bg-[#808080] text-[#FFFFFF] px-8 rounded-full py-3 mr-10 mt-10 ${
                  todo.completed && "line-through italic text-[#1C1C1E]"
                }`}
              >
                {todo.text}
              </p>
            )}
            <div className="flex items-center mt-10 space-x-5">
              {/* <button
                onClick={() => deleteTodo(todo.id)}
                className="bg-[#ECD444] text-[#000000]  rounded-full "
              >
                Delete Todo
              </button> */}
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 1024 1024"
                height="2.5em"
                width="2.5em"
                className="bg-[#000] text-[#ecd444]  rounded-full "
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => deleteTodo(todo.id)}
              >
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path>
              </svg>
              <input
                type="checkbox"
                onChange={() => toggleComplete(todo.id)}
                checked={todo.completed}
                className="h-5 w-5 "
              />
              {todoEditing === todo.id ? (
                // <button
                //   className="bg-[#ECD444] rounded-full text-[#000000]"
                //   onClick={() => submitTodo(todo.id)}
                // >
                //   Submit Todo
                // </button>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="2.5em"
                  width="2.5em"
                  className="bg-[#ECD444] rounded-full text-[#000000]"
                  onClick={() => submitTodo(todo.id)}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path>
                </svg>
              ) : (
                // <button
                //   className="bg-[#ECD444] rounded-full text-[#000000]"
                //   onClick={() => setTodoEditing(todo.id)}
                // >
                //   Edit Todo
                // </button>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 1024 1024"
                  height="2.5em"
                  width="2.5em"
                  className="bg-[#ecd444] rounded-lg text-[#000]"
                  onClick={() => setTodoEditing(todo.id)}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path>
                </svg>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
