import { FC } from "react";
import FilesItem from "./FilesItem";

interface FilesListProps {
  files: {
    lastModified: string;
    name: string;
    size: string;
  }[];
}

const FilesList: FC<FilesListProps> = ({ files }) => {
  return (
    <ul className="gap-1 w-full h-full flex justify-center items-center">
      {files.map((item, index) => (
        <FilesItem key={index} item={item} index={index} />
      ))}
    </ul>
  );
};

export default FilesList;
