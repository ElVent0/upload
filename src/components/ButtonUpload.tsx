import { useRef } from "react";

const ButtonUpload = ({
  handleFileChange,
}: {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
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
  );
};

export default ButtonUpload;
