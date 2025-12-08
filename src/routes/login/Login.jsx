import { useState } from "react";
import { useNavigate } from "react-router-dom";
import baseRequest from "../../axios/config";

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
    <div className="new-post">
      <h2>Login:</h2>
      <form onSubmit={(e) => login(e)}>
        <div className="form-control">
          <label htmlFor="title">User:</label>
          <input
            type="text"
            name="title"
            id="title"
            width="100"
            placeholder="Digite o titulo que deseja"
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="body">Password:</label>
          <input
            name="body"
            id="body"
            type="password"
            placeholder="Digite o conteúdo"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="submit" value="Entrar" className="btn"></input>
      </form>
    </div>
  );
};

export default Login;
