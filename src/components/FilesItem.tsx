import { FC } from "react";
import { AiFillFile } from "react-icons/ai";

interface FilesItemProps {
  item: {
    lastModified: string;
    name: string;
    size: string;
  };
  index: number;
}

const FilesItem: FC<FilesItemProps> = ({ item }) => {
  return (
    <li className="w-175 h-205 bg-super-gray rounded-xl flex flex-col justify-center items-center">
      <AiFillFile className=" text-blue-accent mb-4 text-7xl" />
      <p className="text-darkest-gray text-center">{item.name}</p>
      <p className="text-blue-accent text-center italic">
        ({(Number(item.size) / 1024 ** 2).toFixed(2)}mb)
      </p>
    </li>
  );
};

export default FilesItem;
