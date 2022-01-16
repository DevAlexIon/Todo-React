import { useEffect, useState } from "react";
import FlipMove from "react-flip-move";
import "./index.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [quote, setQuote] = useState("");

  const generateRandomInteger = (min, max) => {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  useEffect(() => {
    const fetchQuotes = async () =>
      await fetch(`https://type.fit/api/quotes`)
        .then((res) => res.json())
        .then((data) => {
          setQuote(data[generateRandomInteger(0, data.length)]);
        });

    fetchQuotes();
  }, []);

  useEffect(() => {
    const temp = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(temp);

    if (loadedTodos) setTodos(loadedTodos);
  }, []);

  useEffect(() => {
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos", temp);
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (todo.length === 0) return;

    const newTodo = {
      id: new Date(),
      text: todo.charAt(0).toUpperCase() + todo.slice(1),
      completed: false,
    };

    setTodos([...todos].concat(newTodo));
    setTodo("");
  };

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
    <div className="App">
      <div className="container">
        <div className="motivation-card">
          <h1>Do you need some motivation to start the day?</h1>
          <div>
            <h2>{quote.text}</h2>
            <h4>{quote.author}</h4>
          </div>
        </div>
        <div className="circle-1" />
        <div className="circle-2" />
        <div className="circle-3" />
        <div className="circle-4" />
        <div className="todo-list">
          <h1 className="title">Hello there, what's the plan for today?</h1>
          <form onSubmit={addTodo} className="todo-form">
            <input
              type="text"
              className="todo-input"
              placeholder="Activity..."
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
            <button className="todo-btn" type="submit">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 448 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
              </svg>
            </button>
          </form>
          <FlipMove typeName={null}>
            {todos.map((todo) => (
              <div className="todo-row" key={todo.id}>
                {todoEditing === todo.id ? (
                  <input
                    type="text"
                    className="todo-input"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                ) : (
                  <div
                    className={`${todo.completed ? "completed" : ""} todo-row`}
                  >
                    {todo.text}
                  </div>
                )}
                <div className="group-buttons">
                  <div className="todo-btn">
                    <svg
                      onClick={() => deleteTodo(todo.id)}
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 448 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path>
                    </svg>
                  </div>
                  <div className="todo-btn test">
                    <svg
                      onClick={() => toggleComplete(todo.id)}
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 512 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
                    </svg>
                  </div>
                  {todoEditing === todo.id ? (
                    <div className="todo-btn">
                      <svg
                        onClick={() => submitTodo(todo.id)}
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M416 448h-84c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h84c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32h-84c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h84c53 0 96 43 96 96v192c0 53-43 96-96 96zm-47-201L201 79c-15-15-41-4.5-41 17v96H24c-13.3 0-24 10.7-24 24v96c0 13.3 10.7 24 24 24h136v96c0 21.5 26 32 41 17l168-168c9.3-9.4 9.3-24.6 0-34z"></path>
                      </svg>
                    </div>
                  ) : (
                    <div className="todo-btn">
                      <svg
                        onClick={() => setTodoEditing(todo.id)}
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"></path>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </FlipMove>
        </div>
      </div>
    </div>
  );
}

export default App;
