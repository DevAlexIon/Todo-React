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

  const submitTodo = (id, e) => {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      if (!todo.text) {
        alert("Please fill add the activity");
        e.preventDefault();
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
            className={`placeholder:text-[#FFFFFF] md:text-2xl text-[#FFFFFF] outline-none py-3 px-8 rounded-full bg-[#808080]`}
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
              t="1551322312294"
              viewBox="0 0 1024 1024"
              version="1.1"
              pid="10297"
              height="2.5em"
              width="2.5em"
              xmlns="http://www.w3.org/2000/svg"
              className="bg-[#ecd444] ml-5 rounded-full md:text-xl text-[#000] cursor-pointer"
            >
              <defs></defs>
              <path
                d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z"
                pid="10298"
              ></path>
              <path
                d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z"
                pid="10299"
              ></path>
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
                className="bg-[#808080] md:text-2xl pl-5 rounded-full py-3 mt-10 outline-none text-[#FFFFFF]"
              />
            ) : (
              <p
                className={`bg-[#808080] md:text-2xl text-[#FFFFFF] px-8 rounded-full py-3 mr-10 mt-10  ${
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
                height="2.4em"
                width="2.4em"
                onClick={() => deleteTodo(todo.id)}
                className="bg-[#ecd444] ml-5 rounded-full md:text-xl text-[#000] cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
              </svg>
              <input
                type="checkbox"
                onChange={() => toggleComplete(todo.id)}
                checked={todo.completed}
                className="h-5 w-5 cursor-pointer "
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
                  className="cursor-pointer bg-[#ECD444] rounded-full text-[#000000]"
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
                  className="cursor-pointer bg-[#ecd444] rounded-lg text-[#000]"
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
