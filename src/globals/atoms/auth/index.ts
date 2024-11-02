import { EnterpriseInterface } from "@/globals/types/enterprise";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist", // chave para o armazenamento no localStorage
  storage: typeof window !== "undefined" ? localStorage : undefined,
});

export const Authentication = atom<EnterpriseInterface | null>({
  key: "Authentication",
  default: null,
  effects_UNSTABLE: [persistAtom], // aplicando o efeito de persistência
});
