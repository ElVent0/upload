import { useState, ChangeEvent } from "react";

export const useFileChange = (handleErrorModal: () => void) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const data = e.target.files;
    if (data) {
      const resultFiles = Object.values(data);
      if (data && (resultFiles.length > 5 || resultFiles.length === 1)) {
        handleErrorModal();
        return;
      }
      setFiles(resultFiles);
    }
  };

  return { files, handleFileChange };
};
