import { AiOutlineClose } from "react-icons/ai";
import { FC } from "react";

interface ErrorModalProps {
  isErrorModal: boolean;
  handleErrorModal: () => void;
}

const ErrorModal: FC<ErrorModalProps> = ({
  isErrorModal,
  handleErrorModal,
}) => {
  return (
    <>
      {isErrorModal && (
        <div className="absolute w-screen h-screen bg-black bg-opacity-80 z-10 flex justify-center items-center">
          <div className="bg-white w-484 h-300 flex flex-col items-center justify-center rounded-xl relative">
            <p className="mb-33 text-gray-darkest text-3xl">Error</p>
            <p className="mb-46 text-gray-darkest">
              Please add not less than 2 and not more than 5 files
            </p>
            <button
              type="button"
              onClick={handleErrorModal}
              className="text-white w-175 h-46 bg-blue-accent rounded-xl"
            >
              OK
            </button>
            <button
              type="button"
              onClick={handleErrorModal}
              className="text-gray-super-light text-lg absolute top-4 right-4"
            >
              <AiOutlineClose />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ErrorModal;
