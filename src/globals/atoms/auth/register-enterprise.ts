import { EnterpriseInterface } from "@/globals/types/enterprise";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

interface RegisterEnterpriseInterface extends EnterpriseInterface {
  stage: number;
}

const { persistAtom } = recoilPersist({
  key: "recoil-register-enterprise", // chave para o armazenamento no localStorage
  storage: typeof window !== "undefined" ? localStorage : undefined,
});

export const RegisterEnterprise = atom<RegisterEnterpriseInterface | null>({
  key: "RegisterEnterprise",
  default: null,
  effects_UNSTABLE: [persistAtom], // aplicando o efeito de persistência
});
