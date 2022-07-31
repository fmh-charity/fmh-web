// eslint-disable-next-line prettier/prettier
export { };

declare global {
  interface Window {
    test: string;
  }
  namespace NodeJS {
    interface ProcessEnv {
      API_HOST: undefined | string;
      API_PORT: undefined | number;
      API_SEED: undefined | string;
    }
  }
}

