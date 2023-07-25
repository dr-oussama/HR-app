const Header = () => {
  // Replace these with the actual admin's name and avatar URL
  const adminName = "John Doe";
  const adminAvatarUrl = "";

  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-xl font-bold">Dashboard Header</h1>
      </div>
      <div className="flex items-center">
        <p className="mr-4">{adminName}</p>
        <img
          src={adminAvatarUrl}
          alt="Admin Avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </header>
  );
};

export default Header;
