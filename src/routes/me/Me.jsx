import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseRequest from "../../axios/config";

import "./Me.css";

const Me = () => {
  const [loginStatus, setLoginStatus] = useState();
  const [meData, setMeData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await baseRequest.get("/api/user/me", {
          headers: {
            token,
          },
        });

        if (data.success) {
          setMeData(data.user);
          setLoginStatus(true);
        } else {
          setLoginStatus(false);
        }
      } catch (error) {
        setLoginStatus(false);
      }
    })(); // Immediately invoke the async function
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const irClientes = () => {
    navigate("/clientes");
  };

  useEffect(() => {
    if (loginStatus === false) {
      navigate("/login");
    }
  }, [loginStatus, navigate]);

  if (loginStatus === true) {
    return (
      <div className="information_user">
        <h1>Mostrando as informações do usuário:</h1>
        <h4>
          <p>Id: {meData.id}</p>
        </h4>
        <h4>
          <p>Name: {meData.name}</p>
        </h4>
        <h4>
          <p>Age: {meData.age}</p>
        </h4>
        <h4>
          <p>Username: {meData.username}</p>
        </h4>
        <button onClick={irClientes}>Clientes</button>
        <button onClick={logout}>logout</button>
      </div>
    );
  }

  return null;
};
export default Me;
