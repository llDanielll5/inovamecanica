import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist", // chave para o armazenamento no localStorage
  storage: typeof window !== "undefined" ? localStorage : undefined,
});

export const Authentication = atom({
  key: "Authentication",
  default: "", // valor padrão
  effects_UNSTABLE: [persistAtom], // aplicando o efeito de persistência
});
