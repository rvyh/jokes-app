import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") !== "mysecrettoken123") navigate("/login");
  });
}
