import { useNavigate } from "react-router-dom";

const Clientes = () => {
  const navigate = useNavigate();

  const criarCliente = () => {
    navigate("/criar");
  };

  return (
    <>
      <h1>clientes</h1>
      <button onClick={criarCliente}>Criar Cliente</button>
    </>
  );
};

export default Clientes;
