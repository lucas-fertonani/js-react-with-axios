import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// paginas
import Login from "./routes/login/Login.jsx";
import Me from "./routes/me/Me.jsx";
import Clientes from "./routes/clientes/Clientes.jsx";
import CriarClientes from "./routes/clientes/CriarClientes.jsx";
import EditarClientes from "./routes/clientes/EditarClientes.jsx";

// Criando rotas
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "me",
        element: <Me />,
      },
      {
        path: "clientes",
        element: <Clientes />,
      },
      {
        path: "clientes/criar",
        element: <CriarClientes />,
      },
      {
        path: "clientes/editar/:id",
        element: <EditarClientes />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
