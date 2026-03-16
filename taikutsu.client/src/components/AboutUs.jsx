import styles from '../stylesheets/AboutUs.module.scss';
import TaikutsuLogo from '../assets/TaikutsuLogo(2).svg'

function AboutUs() {
  return (
      <div className={styles.aboutUsBg}>
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