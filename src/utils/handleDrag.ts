import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { File } from "../file";

export const handleDragEnd = (
  event: DragEndEvent,
  files: File[],
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
) => {
  const { active, over } = event;

  const id = active?.id;
  const overId = over?.id;
  if (!overId) return;
  if (!files) return;

  const activeIndex = (files || []).filter((item) => item.id === id)[0].id;
  const overIndex = files.indexOf(
    (files || []).filter((item) => item.id === overId)[0]
  );

  const objectWithOurIndex = files.filter((item) => item.id === activeIndex);

  setFiles((prevItems) => {
    if (prevItems) {
      return [
        ...arrayMove(
          prevItems,
          prevItems.indexOf(objectWithOurIndex[0]),
          overIndex
        ),
      ];
    }
    return [];
  });
};
