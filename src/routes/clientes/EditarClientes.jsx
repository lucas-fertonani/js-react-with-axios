import { useState, useEffect } from "react";
import baseRequest from "../../axios/config";
import { useNavigate, useParams } from "react-router-dom";

import "./EditarClientes.css";

const EditarCliente = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    birthDate: "",
  });
  const [errorHandling, setErrorHandling] = useState(null);
  const [loginStatus, setLoginStatus] = useState();

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

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await baseRequest.get(`/api/cliente/${id}`, {
          headers: {
            token,
          },
        });
        if (data.success) {
          setFormData({
            name: data.data.name,
            phone: data.data.phone,
            birthDate: data.data.birthdate.split("T")[0],
          });
        } else {
          setFormData({});
        }
      } catch (error) {
        setFormData({});
      }
    })(); // Immediately invoke the async function
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log(formData);

  const handleSubmit = async () => {
    try {
      const response = await baseRequest.post(`/api/cliente/${id}`, formData, {
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
          <label htmlFor="name">Nome</label>
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
          <label htmlFor="phone">Telefone</label>
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
          <label htmlFor="birthDate">Data de aniversario</label>
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
          className="btn-edit_2"
          onClick={handleSubmit}
          style={{ width: "300px", height: "25px" }}
        >
          Editar
        </button>
        <p>{errorHandling}</p>
      </div>
    );
  }
  return null;
};

export default EditarCliente;
