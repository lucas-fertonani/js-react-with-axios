import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseRequest from "../../axios/config";

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
      <div>
        Mostrando as informações do usuário:
        <p>Id: {meData.id}</p>
        <p>Name: {meData.name}</p>
        <p>Age: {meData.age}</p>
        <p>Username: {meData.username}</p>
        <button onClick={irClientes}>Clientes</button>
      </div>
    );
  }

  return null;
};
export default Me;
