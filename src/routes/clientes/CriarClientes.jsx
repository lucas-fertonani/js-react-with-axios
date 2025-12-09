import { useState } from "react";
import baseRequest from "../../axios/config";
import { useNavigate } from "react-router-dom";

const CriarClientes = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    birthDate: "",
  });

  const [errorHandling, setErroHandling] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

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
        />
      </div>

      <button onClick={handleSubmit}>Submit</button>
      <p>{errorHandling}</p>
    </div>
  );
};

export default CriarClientes;
