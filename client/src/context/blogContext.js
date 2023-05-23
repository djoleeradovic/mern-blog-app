import { createContext, useReducer } from "react";

export const blogContext = createContext();

const blogReducer = (state, action) => {
  switch (action.type) {
    case "SET_BLOGS":
      return {
        blogs: action.payload,
      };
    case "SET_BLOG":
      return {
        blogs: action.payload,
      };
    case "DELETE_BLOG":
      return {
        blogs: state.blogs.filter((b) => b._id !== action.payload._id),
      };

    case "CLEAR_BLOGS":
      return {
        blogs: null,
      };

    default:
      return state;
  }
};

export const BlogContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, {
    blogs: [],
  });
  return (
    <blogContext.Provider value={{ ...state, dispatch }}>
      {children}
    </blogContext.Provider>
  );
};
