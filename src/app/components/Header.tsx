const Header = () => {
  const user = localStorage.getItem("user")
  if(!user) return;
  const adminName = JSON.parse(user)["last_name"]+" "+JSON.parse(user)["first_name"];
  const adminAvatarUrl = "luffy5.jpg";

  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-xl font-bold">MyOCP</h1>
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
