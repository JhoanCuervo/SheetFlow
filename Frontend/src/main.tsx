import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router";
import "./index.css";
import Routes from "./core/routes/Routes";

const container = document.getElementById("app");

if (!container) {
    throw new Error("No se encontró el contenedor #app en index.html");
}

createRoot(container).render(
    <RouterProvider router={createHashRouter(Routes)} />
);
