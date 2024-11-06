import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../requests/firebase";
import { useRecoilValue } from "recoil";
import { RegisterEnterprise } from "../atoms/auth/register-enterprise";
import { Timestamp } from "firebase/firestore";

export interface UploadState {
  fileName: string;
  progress: number;
  downloadURL: string | null;
  error: string | null;
}

export default function useMultiImageUpload() {
  const [uploadStates, setUploadStates] = useState<UploadState[]>([]);
  const registerEnterpriseData = useRecoilValue(RegisterEnterprise);

  const uploadImages = async (files: File[]) => {
    const uploadPromises = files.map((file) => {
      return new Promise<void>((resolve, reject) => {
        const reference = `/enterprise/${registerEnterpriseData?.cnpj}/images/${
          Timestamp.now().seconds
        }`;
        const storageRef = ref(storage, reference);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Inicializa o estado para o arquivo atual
        setUploadStates((prev) => [
          ...prev,
          { fileName: file.name, progress: 0, downloadURL: null, error: null },
        ]);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadStates((prev) =>
              prev.map((state) =>
                state.fileName === file.name ? { ...state, progress } : state
              )
            );
          },
          (error) => {
            setUploadStates((prev) =>
              prev.map((state) =>
                state.fileName === file.name
                  ? { ...state, error: error.message }
                  : state
              )
            );
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setUploadStates((prev) =>
              prev.map((state) =>
                state.fileName === file.name ? { ...state, downloadURL } : state
              )
            );
            resolve();
          }
        );
      });
    });

    try {
      await Promise.all(uploadPromises);
      console.log("All images uploaded successfully");
    } catch (error) {
      console.error("Error uploading one or more images:", error);
    }
  };

  return { uploadImages, uploadStates };
}
