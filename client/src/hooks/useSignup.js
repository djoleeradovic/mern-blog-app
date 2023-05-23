import { useState } from "react";
import { useUserContext } from "./useUserContext";
import { useNavigate } from "react-router-dom";

export const useSignUp = () => {
  const { dispatch } = useUserContext();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();

  const signUp = async (username, password) => {
    setLoading(true);
    setError(null);

    const res = await fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      setLoading(false);
      setError(data.error);
    }

    if (res.ok) {
      dispatch({
        type: "LOGIN",
        payload: data,
      });

      localStorage.setItem("user", JSON.stringify(data));
      setLoading(false);
      setError(null);
      navigate("/");
    }
  };
  return { signUp, error, loading };
};
