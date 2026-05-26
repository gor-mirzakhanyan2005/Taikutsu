import styles from '../stylesheets/AboutUs.module.scss';
import TaikutsuLogo from '../assets/TaikutsuLogo(2).svg';
<<<<<<< HEAD
import { useContext, useEffect } from 'react';
import { DarkModeContext } from '../App'

function AboutUs() {
    const { darkmode } = useContext(DarkModeContext);

    useEffect(() => {
        const importProducts = async () => {
            const res = await fetch("/api/apiproduct", { method: "POST" });
            const text = await res.text(); // read as plain text first
            console.log(text); // see exactly what the server is returning
            console.log(`${text.message}`);
        };
        importProducts();
    }, [])
=======
import { useContext } from 'react';
import { DarkModeContext } from '../App'

function AboutUs() {
  const { darkmode } = useContext(DarkModeContext);
>>>>>>> 868210d7054466c3f8d446fb4c36d40280a576f5

  return (
      <div data-theme={darkmode ? "dark" : "light"}  className={styles.aboutUsBg}>
          <div>
              <img src={TaikutsuLogo} />
          </div>
          <p>
              Here at <span>Unibuy</span>, our aim is to provide access to all sorts of products to all sorts of customers using modern technological solutions! We aim to provide users with their preferred products for a more satisfying shopping experience.
          </p>
      </div>
  );
}

export default AboutUs;