import { useState } from "react";

export const useErrorModal = () => {
  const [isErrorModal, setIsErrorModal] = useState(false);

  const handleErrorModal = () => {
    setIsErrorModal((prev) => !prev);
  };

  return { isErrorModal, handleErrorModal };
};
