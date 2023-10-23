import { useRef } from "react";
import ErrorModal from "./components/ErrorModal";
import FilesList from "./components/FilesList";
import { useFileChange, useErrorModal } from "./hooks";

function App() {
  const { isErrorModal, handleErrorModal } = useErrorModal();
  const { files, handleFileChange } = useFileChange(handleErrorModal);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  console.log(files);

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
          <FilesList files={files} />
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
