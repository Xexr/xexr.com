import { env } from "@/env";

export const getServerUrl = () => {
  let url = new URL(env.NEXT_PUBLIC_URL); // use this for production and development
  if (env.NEXT_PUBLIC_VERCEL_ENV === "preview")
    url = new URL(`https://${env.NEXT_PUBLIC_VERCEL_BRANCH_URL}`);

  return url;
};
