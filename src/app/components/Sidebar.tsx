interface Props {
  clicked: (name: string) => void;
}

const Sidebar = ({ clicked }: Props) => {
  const titles = ["Users", "Departements", "Settings", "Logout"];
  return (
    <>
      <aside className="bg-gray-800 text-white p-4">
        <nav>
          <ul>
            <li className="mb-2">
              <h2 className="text-xl font-bold">Dashboard</h2>
            </li>
            {titles.map((title) => (
              <li key={title} className="mb-4" onClick={() => clicked(title)}>
                <a
                  href="#"
                  className="block px-2 py-1 rounded hover:bg-gray-700"
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
