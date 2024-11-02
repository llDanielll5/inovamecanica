import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../requests/firebase";
import { useEffect, useState } from "react";

export const useUploadFileWithFirebase = async (
  reference: string,
  file: any
) => {
  const storageRef = ref(storage, reference);
  const [progress, setProgress] = useState<number>(0);
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<any | null>(null);
  const uploadTask = uploadBytesResumable(storageRef, file);

  useEffect(() => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error: any) => {
        setProgress(100);
        setError(error.message ?? error.code ?? error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProgress(100);
          setUrl(downloadURL);
        });
      }
    );
  }, [file]);

  return { progress, url, error };
};
