import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserContextProvider } from "./context/userContext";
import { BlogContextProvider } from "./context/blogContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserContextProvider>
    <BlogContextProvider>
      <App />
    </BlogContextProvider>
  </UserContextProvider>
);
