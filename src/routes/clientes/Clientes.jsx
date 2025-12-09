import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import baseRequest from "../../axios/config";

import "./ClienteStyle.css";

const Clientes = () => {
  const [loginStatus, setLoginStatus] = useState();
  const [clientes, setClientes] = useState();

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
          setLoginStatus(true);
        } else {
          setLoginStatus(false);
        }
      } catch (error) {
        setLoginStatus(false);
      }
    })(); // Immediately invoke the async function
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (loginStatus === false) {
      navigate("/login");
    }
  }, [loginStatus, navigate]);

  const criarCliente = () => {
    navigate("/clientes/criar");
  };

  const deletarCliente = async (clienteId) => {
    const token = localStorage.getItem("token");

    const { data } = await baseRequest.delete(`/api/cliente/${clienteId}`, {
      headers: {
        token,
      },
    });

    if (data.success) {
      const newClientes = clientes.filter((cliente) => {
        return cliente.id != clienteId;
      });

      setClientes(newClientes);
    }
  };

  const editarCliente = async (clienteId) => {
    navigate(`/clientes/editar/${clienteId}`);
  };
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await baseRequest.get("/api/cliente", {
          headers: {
            token,
          },
        });

        if (data.success) {
          setClientes(data.data);
        } else {
          setClientes([]);
        }
      } catch (error) {
        setClientes([]);
      }
    })(); // Immediately invoke the async function
  }, []);

  if (loginStatus === true) {
    return (
      <>
        <h1>clientes:</h1>
        <ul>
          {clientes?.map((cliente) => (
            <li key={cliente.id} className="items">
              <p>ID: {cliente.id}</p>
              <p>Nome: {cliente.name}</p>
              <p>Telefone: {cliente.phone}</p>
              <p>
                Data de Nascimento:{" "}
                {new Date(cliente.birthdate).toLocaleDateString()}
              </p>
              <button onClick={() => editarCliente(cliente.id)}>&</button>
              <button onClick={() => deletarCliente(cliente.id)}>X</button>
            </li>
          ))}
        </ul>
        <button onClick={criarCliente}>Criar Cliente</button>
      </>
    );
  }
  return null;
};

export default Clientes;
