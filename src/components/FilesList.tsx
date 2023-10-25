import { FC } from "react";
import FilesItem from "./FilesItem";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { File } from "../file";

interface FilesListProps {
  id: string;
  files: File[];
  handleDeleteItem: (files: File[], id: string) => void;
  draggedItemId: string | null;
}

const FilesList: FC<FilesListProps> = ({
  id,
  files,
  handleDeleteItem,
  draggedItemId,
}) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <SortableContext
      id={id}
      items={files}
      strategy={horizontalListSortingStrategy}
    >
      <ul
        ref={setNodeRef}
        className="gap-1 w-full h-full flex justify-center items-center"
      >
        {files.map((item) => (
          <FilesItem
            key={item.id}
            item={item}
            files={files}
            handleDeleteItem={handleDeleteItem}
            draggedItemId={draggedItemId}
          />
        ))}
      </ul>
    </SortableContext>
  );
};

export default FilesList;
