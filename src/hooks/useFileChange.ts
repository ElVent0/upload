import { useState, ChangeEvent } from "react";
import { File } from "../file";

export const useFileChange = (handleErrorModal: () => void) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const data = e.target.files;

    if (data) {
      const urls = Object.values(data).map((item) => URL.createObjectURL(item));
      const resultFiles = Object.values(data).map((item, index) => {
        const url = item.type.split("/")[0] === "image" ? urls[index] : null;
        return {
          id: index.toString(),
          name: item.name,
          size: String(item.size),
          url: url,
        };
      });

      if (data && (resultFiles.length > 5 || resultFiles.length === 1)) {
        handleErrorModal();
        return;
      }

      setFiles(resultFiles);
    }
  };

  const handleDeleteItem = (files: File[], id: string) => {
    const resultFiles = files.filter((item) => item.id !== id);
    setFiles(resultFiles);
  };

  return { files, handleFileChange, setFiles, handleDeleteItem };
};
