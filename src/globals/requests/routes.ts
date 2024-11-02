const API_VERSION = "v1";
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const ROUTES = {
  ENTERPRISE: {
    LOGIN: `/${API_VERSION}/enterprises/auth/login`,
    REGISTER: `/${API_VERSION}/enterprises/auth/register`,
    GET: `/${API_VERSION}/enterprises`,
    GET_UNIQUE: (id: string) => `/${API_VERSION}/enterprises/${id}`,
    UPDATE: (id: string) => `/${API_VERSION}/enterprises/${id}`,
    DELETE: (id: string) => `/${API_VERSION}/enterprises/${id}`,
  },
  CLIENT: {
    LOGIN: "",
    REGISTER: "",
  },
};
