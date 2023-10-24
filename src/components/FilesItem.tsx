import { FC } from "react";
import { AiFillFile } from "react-icons/ai";
import { useSortable } from "@dnd-kit/sortable";
import { File } from "../file";
import { CSS } from "@dnd-kit/utilities";

interface FilesItemProps {
  item: File;
}

const FilesItem: FC<FilesItemProps> = ({ item }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-175 h-205 bg-super-gray rounded-xl flex flex-col justify-center items-center"
    >
      <AiFillFile className=" text-blue-accent mb-4 text-7xl" />
      <p className="text-darkest-gray text-center">{item.name}</p>
      <p className="text-blue-accent text-center italic">
        ({(Number(item.size) / 1024 ** 2).toFixed(2)}mb)
      </p>
    </li>
  );
};

export default FilesItem;
