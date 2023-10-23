import { FC } from "react";
import FilesItem from "./FilesItem";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

interface FilesListProps {
  id: string;
  files: {
    id: string;
    name: string;
    size: string;
  }[];
}

const FilesList: FC<FilesListProps> = ({ id, files }) => {
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
          <FilesItem key={item.id} item={item} />
        ))}
      </ul>
    </SortableContext>
  );
};

export default FilesList;
