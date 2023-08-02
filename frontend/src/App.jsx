import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("/");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      body: message,
      from: "Yo",
    };

    setMessages([...messages, newMessage]);
    socket.emit("message", message);
    setMessage("");
  };

  useEffect(() => {
    const messageHandler = (message) => {
      console.log("Received message:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on("message", messageHandler);

    return () => {
      socket.off("message", messageHandler);
    };
  }, []);

  return (
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-10">
        <h1 className="text-2xl font-bold my-2">Chat React</h1>
        <input
          type="text"
          placeholder="Escribe tu mensaje"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border-2 border-zinc-500 p-2 w-full text-black"
        />
        <button>Send</button>
        <ul>
          {messages.map((message, i) => (
            <li
              key={i}
              className={`my-2 p-2 table rounded-md ${
                message.from === "Yo" ? "bg-sky-700 ml-auto" : `bg-black`
              }`}
            >
              <span className="text-sm font-bold block text-slate-300">
                {message.from}
              </span>
              :<span className="text-l">{message.body}</span>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
