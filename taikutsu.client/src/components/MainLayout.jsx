import { Navigate, Outlet} from 'react-router-dom';
import TopNav from './TopNav';
import Footer from './Footer';
import { useState } from 'react';
import ProductPage from './ProductPage';
import ProfileModal from './ProfileModal';
import { UserContext } from '../App';

function MainLayout({setSearchBar, darkmode, setDarkmode}) {
    const [open, setOpen] = useState(false);

  return (
      <div>
          <TopNav open={open} setOpen={setOpen} setSearchBar={setSearchBar} darkmode={darkmode} setDarkmode={setDarkmode}/>
          {open == true ? <ProfileModal open={open} setOpen={setOpen} /> : ' '}
          <Outlet />
          <Footer />
      </div>
  );
}

export default MainLayout;