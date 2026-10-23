declare const google: {
  script: {
    run: {
      withSuccessHandler(callback: (result: unknown) => void): {
        withFailureHandler(callback: (error: Error) => void): {
          [functionName: string]: (...args: unknown[]) => void;
        };
      };
    };
  };
};

export type GasStatus = "loading" | "ready" | "error";

export interface GasResult<T> {
  data: T | null;
  status: GasStatus;
}

const promiseGAS = <T, TArgs>(
  functionName: string,
  args?: TArgs,
): Promise<T> => {
  return new Promise((resolve, reject) => {
    const runner = google.script.run
      .withSuccessHandler((result) => resolve(result as T))
      .withFailureHandler(reject);

    const fn = runner[functionName];

    if (typeof fn !== "function") {
      reject(new Error(`La función "${functionName}" no existe`));
      return;
    }

    fn(...(args === undefined ? [] : [args]));
  });
};

const GAS = async <T, TArgs = void>(
  functionName: string,
  args?: TArgs,
): Promise<GasResult<T>> => {
  try {
    const raw = await promiseGAS<unknown, TArgs>(functionName, args);
    const data = (typeof raw === "string" ? JSON.parse(raw) : raw) as T;
    return { data, status: "ready" };
  } catch {
    return { data: null, status: "error" };
  }
};
export default GAS;
