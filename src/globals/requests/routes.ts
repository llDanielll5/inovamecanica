const API_VERSION = "v1";
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const ROUTES = {
  ENTERPRISE: {
    LOGIN: `/${API_VERSION}/enterprises/auth/login`,
    REGISTER: `/${API_VERSION}/enterprises/auth/register`,
    ME: `/${API_VERSION}/enterprises/auth/me`,
    GET: `/${API_VERSION}/enterprises`,
    GET_UNIQUE: (id: string) => `/${API_VERSION}/enterprises/${id}`,
    UPDATE: (id: string) => `/${API_VERSION}/enterprises/${id}`,
    DELETE: (id: string) => `/${API_VERSION}/enterprises/${id}`,
    GET_SERVICES: (id: string, page: string, pageSize: string) =>
      `/${API_VERSION}/enterprises/services?id=${id}&page=${page}&pageSize=${pageSize}`,
  },
  CLIENT: {
    LOGIN: "",
    REGISTER: "",
  },
  SERVICES: {
    ADD_SERVICE: `/${API_VERSION}/services`,
    GET_SERVICE_BY_ENTERPRISE: ``,
    GET_UNIQUE: (id: string) => `/${API_VERSION}/services/${id}`,
  },
};
