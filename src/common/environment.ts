type TEnvTypeSafe = undefined | string | number;

type TEnvType = (() => string | undefined) | TEnvTypeSafe;

type EnvRawObject<P, K> = {
  // eslint-disable-next-line no-unused-vars
  [Property in keyof P]: K;
};

type TPartialEnv = Partial<EnvRawObject<typeof process.env, TEnvType>>;

const getEnvRaw: TPartialEnv = {
  API_HOST: process.env.API_HOST,
  API_PORT: process.env.API_PORT,
  API_SEED: process.env.API_SEED,
};

const reducer = (acc: TPartialEnv, cur: string) => {
  const c = cur as keyof TPartialEnv;
  const t = getEnvRaw[c];
  if (typeof t === "function") {
    acc[c] = t();
  } else {
    acc[c] = t;
  }
  return acc;
};

// webpack.config.ts -> webpack.DefinePlugin
export const environment = Object.keys(getEnvRaw).reduce<TPartialEnv>(
  reducer,
  {}
);
