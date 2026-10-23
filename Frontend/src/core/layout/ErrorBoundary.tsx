import { isRouteErrorResponse, useRouteError, useNavigate } from "react-router";

const BUTTON_CLASSES =
  "mx-auto mt-6 inline-flex w-full max-w-60 cursor-pointer items-center justify-center rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white transition hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/** Pantalla de error que muestra React Router cuando falla una ruta. */
const ErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="grid min-h-screen place-items-center bg-void p-6">
        <div className="w-full max-w-md text-center">
          <p className="text-xs font-medium tracking-wider text-red-600 uppercase">
            {error.status}
          </p>
          <h1 className="mt-2 text-xl font-semibold text-black">
            {error.statusText || "Algo salió mal"}
          </h1>
          <p className="mt-2 text-sm text-black/60">
            La página no está disponible.
          </p>
          <button
            type="button"
            onClick={() => navigate("/")}
            className={BUTTON_CLASSES}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  if (error instanceof Error) {
    return (
      <div className="grid min-h-screen place-items-center bg-void p-6">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-xl bg-red-600/10 text-2xl text-red-600">
            !
          </div>
          <h1 className="text-xl font-semibold text-black">Error inesperado</h1>
          <p className="mt-2 text-sm text-black/60">
            {error.message || "Ha ocurrido un error inesperado."}
          </p>
          <button
            type="button"
            onClick={() => navigate("/")}
            className={BUTTON_CLASSES}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid min-h-screen place-items-center bg-void p-6">
      <p className="text-sm text-black/60">Error desconocido</p>
    </div>
  );
};

export default ErrorBoundary;
