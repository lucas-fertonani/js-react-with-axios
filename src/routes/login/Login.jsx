import { useState } from "react";
import { useNavigate } from "react-router-dom";
import baseRequest from "../../axios/config";

import "./Login.css";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      const { data } = await baseRequest.post("/api/user/login", {
        user,
        password,
      });

      if (data.success) {
        localStorage.setItem("token", data.token);
        navigate("/me");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="login">
        <h2> Login</h2>
        <form onSubmit={(e) => login(e)}>
          <div className="user">
            <label htmlFor="title"></label>
            <input
              type="text"
              name="title"
              id="title"
              width="100"
              placeholder="Digite seu usuário"
              className="usuario"
              style={{ width: "300px", height: "25px" }}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <div className="btn">
            <label htmlFor="body" className="head"></label>
            <input
              name="body"
              id="body"
              type="password"
              placeholder="Digite sua senha"
              style={{ width: "300px", height: "25px" }}
              className="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Entrar"
            className="btn"
            style={{ width: "310px", height: "25px" }}
          ></input>
        </form>
      </div>
    </div>
  );
};

export default Login;
