import { useState, useRef } from "react";
import { AiFillFile } from "react-icons/ai";
import ErrorModal from "./components/ErrorModal";
import { useFileChange } from "./hooks";

function App() {
  const [isErrorModal, setIsErrorModal] = useState(false);

  const handleErrorModal = () => {
    setIsErrorModal((prev) => !prev);
  };

  const { files, handleFileChange } = useFileChange(handleErrorModal);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="bg-gray-main h-screen flex flex-col items-center justify-center">
      <h1 className="text-center mb-8 font-extrabold text-3xl text-darkest-gray">
        Test
      </h1>
      {files.length === 0 ? (
        <div className="bg-white w-1200 h-333 mr-auto ml-auto rounded-xl border-8 border-gray-border flex justify-center items-center">
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />
          <button
            type="button"
            className="bg-green-accent text-white text-3xl rounded-xl text-center w-306 h-78 block"
            onClick={() => {
              if (fileInputRef.current) {
                fileInputRef.current.click();
              }
            }}
          >
            Add file
          </button>
        </div>
      ) : (
        <div className="bg-gray-light w-1200 h-333 mr-auto ml-auto rounded-xl border-8 border-gray-border relative">
          <ul className="gap-1 w-full h-full flex justify-center items-center">
            {files.map((item, index) => (
              <li
                key={index}
                className="w-175 h-205 bg-super-gray rounded-xl flex flex-col justify-center items-center"
              >
                <AiFillFile className=" text-blue-accent mb-4 text-7xl" />
                <p className="text-darkest-gray text-center">{item.name}</p>
                <p className="text-blue-accent text-center italic">
                  ({(item.size / 1024 ** 2).toFixed(2)}mb)
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
      <ErrorModal
        isErrorModal={isErrorModal}
        handleErrorModal={handleErrorModal}
      />
    </div>
  );
}

export default App;
