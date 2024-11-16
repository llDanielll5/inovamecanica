import { EnterpriseInterface } from "@/globals/types/enterprise";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-geolocation", // chave para o armazenamento no localStorage
  storage: typeof window !== "undefined" ? localStorage : undefined,
});

type Coordinates = {
  latitude: number;
  longitude: number;
};

type GeolocationState = {
  location: Coordinates | null;
  geolocationErrorCode: number | null;
  geolocationErrorMsg: string | null;
  geoLoading: boolean;
};

export const Geolocation = atom<GeolocationState>({
  key: "Geolocation",
  default: {
    location: null,
    geolocationErrorCode: null,
    geolocationErrorMsg: null,
    geoLoading: true,
  },
  effects_UNSTABLE: [persistAtom], // aplicando o efeito de persistência
});
