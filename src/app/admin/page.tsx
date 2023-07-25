import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ListUser from '../components/ListUser';

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <ListUser />
      </div>
    </div>
  );
};

export default Dashboard;
