import { createContext, useReducer, useEffect } from "react";

export const userContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };

    default:
      return state;
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    user: null,
  });

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      dispatch({
        type: "LOGIN",
        payload: JSON.parse(user),
      });
    }
  }, []);

  console.log("User: ", state);
  return (
    <userContext.Provider value={{ ...state, dispatch }}>
      {children}
    </userContext.Provider>
  );
};
