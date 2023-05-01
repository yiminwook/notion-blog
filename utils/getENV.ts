export const getENV = (environment: string) => {
  const env = process.env[environment];
  if (!env) throw new Error(`${environment} is not defined`);
  return env;
};

export default getENV;
