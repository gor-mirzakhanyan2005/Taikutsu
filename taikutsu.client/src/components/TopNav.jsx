import { useState, useEffect } from 'react';
import styles from '../stylesheets/TopView.module.scss'
import { NavLink } from 'react-router-dom';
import { ProductContext } from '../App';

function TopNav({ open, setOpen, setSearchBar, darkmode, setDarkmode }) {
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (open == true) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }) 
  
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1040) {
                setMenuOpen(false);
            }
        }

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [])

    useEffect(() => {
        console.log(darkmode);
    }, [darkmode])

  return (
      <nav data-theme={darkmode ? "dark" : "light"} className={styles.navigationMenu}>
          <div className={styles.topBar} />
          <div className={styles.navItems}>
              <ul className={`${styles.navItemsUl} ${menuOpen ? styles.responsive : ''}`}>
                  <li>
                      <NavLink to='/' end>
                          Home
                      </NavLink>
                  </li>
                  <li>
                      <NavLink to='/aboutus' end>
                          About us
                      </NavLink>
                  </li>
                  <li>
                      <NavLink to='currentdeals' end>
                          Current Deals
                      </NavLink>
                  </li>
                  <li>
                      <NavLink to='mostpopular' end>
                          Most popular
                      </NavLink>
                  </li>
                  <li>
                      <input type="text" placeholder="Search" onChange={(e) => setSearchBar(e.target.value)} />
                  </li>
                  <li>
                      <NavLink to='cart' end>
                          Cart
                      </NavLink>
                  </li>
                  <li onMouseEnter={() => { window.innerWidth > 1040 ? setOpen(prev => !prev) : '' }}>
                      <NavLink to='/profile'>Profile</NavLink>
                  </li>
                  <li className={styles.darkmodeButton}>
                      <div className={darkmode ? styles.darkmodeOn : styles.darkmodeOff} onClick={() => { setDarkmode(prev => !prev); console.log(darkmode) }}>
                          <div className={darkmode ? styles.sun : styles.moon }></div>
                      </div>
                  </li>
              </ul>

              <div className={styles.menuIcon}>
                  <div className={styles.burgerMenuHolder} onClick={() => setMenuOpen(!menuOpen)} >
                          <div className={styles.burgerMenuStick} />
                          <div className={styles.burgerMenuStick} />
                          <div className={styles.burgerMenuStick} />
                  </div>
              </div>
          </div>
      </nav>
  );
}

export default TopNav;