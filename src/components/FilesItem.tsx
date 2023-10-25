import { FC } from "react";
import { AiFillFile, AiFillDelete } from "react-icons/ai";
import { useSortable } from "@dnd-kit/sortable";
import { File } from "../file";
import { CSS } from "@dnd-kit/utilities";

interface FilesItemProps {
  item: File;
  files: File[];
  handleDeleteItem: (files: File[], id: string) => void;
  draggedItemId: string | null;
}

const FilesItem: FC<FilesItemProps> = ({
  item,
  files,
  handleDeleteItem,
  draggedItemId,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: item.id === draggedItemId ? 9999 : 9998,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      id={item.id}
      className="w-175 h-205 bg-super-gray rounded-xl flex flex-col justify-center items-center relative"
    >
      <button
        onClick={() => handleDeleteItem(files, item.id)}
        className="absolute top-2 right-2"
      >
        <AiFillDelete className="text-2xl text-gray-darkest" />
      </button>
      {item.url ? (
        <img
          width="100"
          height="100"
          src={item.url}
          alt="preview"
          className="mb-4 rounded-xl"
        />
      ) : (
        <AiFillFile className=" text-blue-accent mb-4 text-7xl" />
      )}
      <p className="text-darkest-gray text-center">{item.name}</p>
      <p className="text-blue-accent text-center italic">
        ({(Number(item.size) / 1024 ** 2).toFixed(2)}mb)
      </p>
    </li>
  );
};

export default FilesItem;
