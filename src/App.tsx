import { useState } from "react";
import ErrorModal from "./components/ErrorModal";
import FilesList from "./components/FilesList";
import { useFileChange, useDefaultSensors } from "./hooks";
import { handleDragOver, handleDragEnd } from "./utils";
import { DndContext, closestCorners } from "@dnd-kit/core";
import ButtonUpload from "./components/ButtonUpload";

function App() {
  const [isErrorModal, setIsErrorModal] = useState(false);
  const handleErrorModal = () => {
    setIsErrorModal((prev) => !prev);
  };

  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const handleDraggedItemId = (id: string) => {
    setDraggedItemId(id);
  };

  const { files, handleFileChange, setFiles, handleDeleteItem } =
    useFileChange(handleErrorModal);
  const sensors = useDefaultSensors();

  return (
    <div className="bg-gray-main h-screen flex flex-col items-center justify-center">
      <h1 className="text-center mb-8 font-extrabold text-3xl text-darkest-gray">
        Test
      </h1>
      {!files.length ? (
        <ButtonUpload handleFileChange={handleFileChange} />
      ) : (
        <div className="bg-gray-light w-1200 h-333 mr-auto ml-auto rounded-xl border-8 border-gray-border relative">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragOver={(e) => handleDragOver(e, handleDraggedItemId)}
            onDragEnd={(e) => handleDragEnd(e, files, setFiles)}
          >
            <FilesList
              id="root"
              files={files}
              handleDeleteItem={handleDeleteItem}
              draggedItemId={draggedItemId}
            />
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
