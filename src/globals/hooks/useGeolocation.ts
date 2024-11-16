import { useState, useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";
import { Geolocation } from "../atoms/geolocation";

type Coordinates = {
  latitude: number;
  longitude: number;
};

type GeolocationState = {
  location: Coordinates | null;
  geolocationErrorCode: number | null;
  geolocationErrorMsg: string | null;
  geoLoading: boolean;
  retry: () => void;
};

export function useGeolocation(): GeolocationState {
  const [geolocation, setGeolocation] = useRecoilState(Geolocation);
  const [state, setState] = useState<Omit<GeolocationState, "retry">>({
    location: null,
    geolocationErrorCode: null,
    geolocationErrorMsg: null,
    geoLoading: false,
  });

  const getLocation = useCallback(() => {
    if (!geolocation.location?.latitude || !geolocation.location.longitude) {
      setState({
        location: null,
        geolocationErrorCode: null,
        geolocationErrorMsg: null,
        geoLoading: true,
      });
      setGeolocation(state);
    }

    if (!("geolocation" in navigator)) {
      setState({
        location: null,
        geolocationErrorCode: null,
        geolocationErrorMsg: "Geolocation is not supported by this browser.",
        geoLoading: false,
      });
      setGeolocation(state);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setState({
          location: { latitude, longitude },
          geolocationErrorCode: null,
          geolocationErrorMsg: null,
          geoLoading: false,
        });
        setGeolocation(state);
      },
      (error) => {
        setState({
          location: null,
          geolocationErrorCode: error.code,
          geolocationErrorMsg: error.message,
          geoLoading: false,
        });
        setGeolocation(state);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  return { ...state, retry: getLocation };
}
