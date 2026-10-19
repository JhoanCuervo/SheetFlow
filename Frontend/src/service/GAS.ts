type GasSuccessHandler<T> = (value: T) => void;
type GasFailureHandler = (error: Error) => void;

interface GasRunner {
  withSuccessHandler<T>(handler: GasSuccessHandler<T>): GasRunner;
  withFailureHandler(handler: GasFailureHandler): GasRunner;
  [functionName: string]: unknown;
}

declare const google: { script: { run: GasRunner } };

/** Convierte la respuesta JSON del backend al tipo esperado. */
const parseResponse = <T>(response: unknown): T => {
  if (typeof response !== "string") return response as T;
  return JSON.parse(response) as T;
};

/**
 * Llama a una función del backend de Apps Script.
 * @param functionName - Nombre de la función global en el servidor.
 * @param args - Argumentos que recibe la función.
 */
const GAS = <T>(functionName: string, ...args: unknown[]): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    if (typeof google === "undefined" || !google.script || !google.script.run) {
      reject(new Error("google.script no está disponible"));
      return;
    }

    const runner = google.script.run
      .withSuccessHandler<T>((response) => resolve(parseResponse<T>(response)))
      .withFailureHandler((error) => reject(error));

    const fn = runner[functionName];

    if (typeof fn !== "function") {
      reject(new Error(`La función ${functionName} no existe`));
      return;
    }

    fn.apply(runner, args);
  });
};

export default GAS;