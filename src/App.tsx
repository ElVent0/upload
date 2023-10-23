import { useRef } from "react";
import ErrorModal from "./components/ErrorModal";
import FilesList from "./components/FilesList";
import { useFileChange, useErrorModal } from "./hooks";
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

function App() {
  const { isErrorModal, handleErrorModal } = useErrorModal();
  const { files, handleFileChange, setFiles } = useFileChange(handleErrorModal);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragOver(event) {
    const { active, over, activatorEvent } = event;

    const id = active?.id;
    const overId = over?.id;
    if (!overId) return;
    if (!files) return;

    const activeContainer = active.data.current?.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;
    if (activeContainer === overContainer) return;

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setFiles((prev) => {
      if (prev) {
        const activeItems = prev || [];
        const overItems = prev || [];

        const activeIndex = activeItems.filter((item) => item.id === id)[0].id;

        let overIndex = 0;
        if (typeof overId === "number") {
          overIndex =
            overItems.length > 0 && !isNaN(overId)
              ? overItems.filter((item) => item.id === overId)[0].id
              : -1;
        }

        let newIndex: number;
        if (overId in prev) {
          newIndex = overItems.length;
        } else {
          const isBelowLastItem =
            over &&
            overIndex === overItems.length - 1 &&
            (activatorEvent as MouseEvent).offsetY > 0;

          const modifier = isBelowLastItem ? 1 : 0;

          newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length;
        }

        const objectWithOurIndex = files.filter(
          (item) => item.id === activeIndex
        );

        return {
          ...prev,
          [activeContainer]: [...activeItems.filter((item) => item.id !== id)],
          [overContainer]: [
            ...overItems.slice(0, newIndex),
            files[activeContainer][
              files[activeContainer].indexOf(objectWithOurIndex[0])
            ],
            ...overItems.slice(newIndex, overItems.length),
          ],
        };
      }
    });
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    const id = active?.id;
    const overId = over?.id;
    if (!overId) return;
    if (!files) return;

    const activeContainer = active.data.current?.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = (files || []).filter((item) => item.id === id)[0].id;
    const overIndex = files.indexOf(
      (files || []).filter((item) => item.id === overId)[0]
    );

    const objectWithOurIndex = files.filter((item) => item.id === activeIndex);

    const newArray = (prevItems: Items) => {
      const resultArray = prevItems.map((item, index) => {
        if (index === prevItems.indexOf(objectWithOurIndex[0])) {
          const newItem = { ...item };
          newItem.status = overContainer;
          return newItem;
        } else {
          return item;
        }
      });

      return resultArray;
    };

    if (activeIndex !== overIndex) {
      setFiles((prevItems) => {
        if (prevItems) {
          return [
            ...arrayMove(
              newArray(prevItems) || [],
              prevItems.indexOf(objectWithOurIndex[0]),
              overIndex
            ),
          ];
        }
      });
    }
  }

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
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
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
