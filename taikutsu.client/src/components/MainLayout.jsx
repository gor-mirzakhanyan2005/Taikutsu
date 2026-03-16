import { Navigate, Outlet,useNavigate } from 'react-router-dom';
import TopNav from './TopNav';
import Footer from './Footer';
import { useContext,
useState } from 'react';
import ProductPage from './ProductPage';
import ProfileModal from './ProfileModal';
import { UserContext } from '../App';

function MainLayout({setSearchBar}) {
    const { user } = useContext(UserContext);
    const [open, setOpen] = useState(false);

    if (!user) {
       return <Navigate to="/login" replace/>
    }

  return (
      <div>
          <TopNav open={open} setOpen={setOpen} setSearchBar={setSearchBar} />
          {open == true ? <ProfileModal open={open} setOpen={setOpen} /> : ' '}
          <Outlet />
          <Footer />
      </div>
  );
}

export default MainLayout;