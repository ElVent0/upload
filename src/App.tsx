import ErrorModal from "./components/ErrorModal";
import FilesList from "./components/FilesList";
import { useFileChange, useErrorModal, useDefaultSensors } from "./hooks";
import { handleDragEnd } from "./utils";
import { DndContext, closestCorners } from "@dnd-kit/core";
import ButtonComponent from "./components/ButtonComponent";

function App() {
  const { isErrorModal, handleErrorModal } = useErrorModal();
  const { files, handleFileChange, setFiles } = useFileChange(handleErrorModal);
  const sensors = useDefaultSensors();

  return (
    <div className="bg-gray-main h-screen flex flex-col items-center justify-center">
      <h1 className="text-center mb-8 font-extrabold text-3xl text-darkest-gray">
        Test
      </h1>
      {files.length === 0 ? (
        <ButtonComponent handleFileChange={handleFileChange} />
      ) : (
        <div className="bg-gray-light w-1200 h-333 mr-auto ml-auto rounded-xl border-8 border-gray-border relative">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={(e) => handleDragEnd(e, files, setFiles)}
          >
            <FilesList id="root" files={files} />
          </DndContext>
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
