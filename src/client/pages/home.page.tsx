import { useState } from "react";
import { useStore } from "@nanostores/react";
import { router } from "../router";
import { openPage } from "@nanostores/router";
import { $addMessage, $getMessage } from "../facades/messages.facade";

export const HomePage = () => {
  const [count, setCount] = useState(0);
  const getMessage = useStore($getMessage);
  const addMessage = useStore($addMessage);

  return (
    <section className="container bg-slate-800">
      <div>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <p>{JSON.stringify(getMessage.data)}</p>
        <button
          onClick={() =>
            addMessage.mutate({ message: getMessage.data?.message! })
          }
        >
          BUTTON
        </button>
        <button
          onClick={() => {
            openPage(router, "ERROR", { code: 400 });
          }}
        >
          GO TO ERROR
        </button>
        <a href="https://react.dev" target="_blank">
          <img
            src="/static/react.svg"
            className="logo react"
            alt="React logo"
          />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </section>
  );
};
