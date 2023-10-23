import { useState, ChangeEvent } from "react";

interface ItemObject {
  lastModified: string;
  name: string;
  size: string;
}

export const useFileChange = (handleErrorModal: () => void) => {
  const [files, setFiles] = useState<ItemObject[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const data = e.target.files;
    if (data) {
      const resultFiles = Object.values(data).map((item) => {
        return {
          lastModified: item.lastModified.toString(),
          name: item.name,
          size: item.size.toString(),
        };
      });
      if (data && (resultFiles.length > 5 || resultFiles.length === 1)) {
        handleErrorModal();
        return;
      }
      console.log(resultFiles);
      setFiles(resultFiles);
    }
  };

  return { files, handleFileChange };
};
