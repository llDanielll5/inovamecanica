import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../requests/firebase";

export const UploadFileWithFirebase = async (reference: string, file: any) => {
  const storageRef = ref(storage, reference);

  // 'file' comes from the Blob or File API
  return uploadBytes(storageRef, file).then(async (snapshot) => {
    return getDownloadURL(snapshot.ref).then((downloadURL) => {
      return downloadURL;
    });
  });
};
