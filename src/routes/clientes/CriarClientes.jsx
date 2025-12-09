import { useState, useEffect } from "react";
import baseRequest from "../../axios/config";
import { useNavigate } from "react-router-dom";

import "./CriarClientes.css";

const CriarClientes = () => {
  const [loginStatus, setLoginStatus] = useState();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    birthDate: "",
  });

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
          setLoginStatus(true);
        } else {
          setLoginStatus(false);
        }
      } catch (error) {
        setLoginStatus(false);
      }
    })(); // Immediately invoke the async function
  }, []);

  useEffect(() => {
    if (loginStatus === false) {
      navigate("/login");
    }
  }, [loginStatus, navigate]);

  const [errorHandling, setErroHandling] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await baseRequest.post("/api/cliente", formData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      if (response.status === 201) {
        navigate("/clientes");
      }
    } catch (e) {
      setErroHandling(e.message);
    }
  };
  if (loginStatus === true) {
    return (
      <div className="mainContainer">
        <div className="labelContainer">
          <label htmlFor="name">Nome </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nome Cliente"
            style={{ width: "300px", height: "25px" }}
          />
        </div>

        <div className="labelContainer">
          <label htmlFor="phone">Telefone </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
            placeholder="119393234"
            style={{ width: "300px", height: "25px" }}
          />
        </div>

        <div className="labelContainer">
          <label htmlFor="birthDate">Data de aniversario </label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            style={{ width: "300px", height: "25px" }}
          />
        </div>

        <button
          className="btn-create"
          onClick={handleSubmit}
          style={{ width: "300px", height: "25px" }}
        >
          Criar
        </button>
        <p>{errorHandling}</p>
      </div>
    );
  }
  return null;
};

export default CriarClientes;
