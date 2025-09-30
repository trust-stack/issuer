import z from 'zod';

const Env = z.object({
  WEB_DID_DOMAIN: z.string(),
});

export const getEnv = () => {
  return Env.parse(process.env);
};
