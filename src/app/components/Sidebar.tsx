const Sidebar = () => {
    return (
      <aside className="bg-gray-800 text-white p-4">
        <nav>
          <ul>
            <li className="mb-2">
              <h2 className="text-xl font-bold">Dashboard</h2>
            </li>
            <li className="mb-4">
              <a href="#" className="block px-2 py-1 rounded hover:bg-gray-700">Users</a>
            </li>
            <li className="mb-4">
              <a href="#" className="block px-2 py-1 rounded hover:bg-gray-700">Settings</a>
            </li>
            <li>
              <a href="#" className="block px-2 py-1 rounded hover:bg-gray-700">Logout</a>
            </li>
          </ul>
        </nav>
      </aside>
    );
  };
  
  export default Sidebar;
  