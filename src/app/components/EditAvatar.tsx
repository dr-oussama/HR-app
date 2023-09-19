import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";

interface EditAvatarProps {
  url: string;
  onAvatarChange: (file: File) => void;
}

const EditAvatar = ({ url, onAvatarChange }: EditAvatarProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedFile(file);
      onAvatarChange(file);
    }
  };

  return (
    <div className="relative">
      <img src={url} alt="Avatar" className="w-24 h-24 rounded-full" />
      <label htmlFor="avatar" className="absolute bottom-0 right-0 cursor-pointer">
        <AiOutlineEdit className="text-blue-500 bg-white rounded-full p-1" />
        <input
          type="file"
          id="avatar"
          name="avatar"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default EditAvatar;
