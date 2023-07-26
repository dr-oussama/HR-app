interface AvatarProps {
    size: "small" | "medium" | "large";
    url?: string;
    alt?: string;
  }
  
  const Avatar = ({ size, url, alt = "User Avatar" }: AvatarProps) => {
    const getSizeClass = () => {
      switch (size) {
        case "small":
          return "w-8 h-8";
        case "medium":
          return "w-12 h-12";
        case "large":
          return "w-16 h-16";
        default:
          return "w-12 h-12"; // Default to medium size
      }
    };
  
    return (
      <div className={`rounded-full overflow-hidden ${getSizeClass()}`}>
        {url ? (
          <img src={url} alt={alt} className="object-cover w-full h-full" />
        ) : (
          <div className="bg-gray-400 flex items-center justify-center w-full h-full text-white font-bold">
            {/* You can add a placeholder icon or text here */}
            <span>Avatar</span>
          </div>
        )}
      </div>
    );
  };
  
  export default Avatar;
  