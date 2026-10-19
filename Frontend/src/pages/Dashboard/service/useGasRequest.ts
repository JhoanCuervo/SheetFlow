import { useEffect, useState } from "react";
import GAS from "../../../service/GAS";

export type RequestStatus = "loading" | "ready" | "error";

/**
 * Pide datos a Apps Script y expone el estado de la petición.
 * @param functionName - Función del backend que se va a llamar.
 * @param initialData - Valor inicial mientras llega la respuesta.
 * @param map - Adapta la respuesta al modelo de la vista.
 */
export function useGasRequest<TResponse, TData>(
  functionName: string,
  initialData: TData,
  map: (response: TResponse) => TData,
) {
  const [data, setData] = useState<TData>(initialData);
  const [status, setStatus] = useState<RequestStatus>("loading");

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      setStatus("loading");

      try {
        const response = await GAS<TResponse>(functionName);

        if (ignore) return;

        setData(map(response));
        setStatus("ready");
      } catch (error) {
        if (ignore) return;
        console.error(error);
        setStatus("error");
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
   
  }, [functionName]);

  return { data, status };
}
