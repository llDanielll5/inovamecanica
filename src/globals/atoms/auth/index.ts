import { EnterpriseInterface } from "@/globals/types/enterprise";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-authentication", // chave para o armazenamento no localStorage
  storage: typeof window !== "undefined" ? localStorage : undefined,
});

type EnterpriseType = "CLIENT" | "ENTERPRISE" | "ADMIN" | "";

export interface AtomAuthenticationInterface {
  isAuth: boolean;
  jwt: string;
  email: string;
  loginType: EnterpriseType;
  me: any;
}

export const Authentication = atom<AtomAuthenticationInterface>({
  key: "Authentication",
  default: {
    isAuth: false,
    jwt: "",
    email: "",
    loginType: "",
    me: {},
  },
  effects_UNSTABLE: [persistAtom], // aplicando o efeito de persistência
});
