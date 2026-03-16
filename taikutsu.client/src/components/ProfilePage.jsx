import styles from '../stylesheets/ProfilePage.module.scss';
import DefaultProfilePic from '../assets/Twitter_default_profile_400x400.png';
import { useContext } from 'react';
import { UserContext } from '../App';
function ProfilePage() {

    const { user, setUser } = useContext(UserContext);

  return (
      <div className={styles.profilePageBg}>
          <div className={styles.profileBody}>
              <div className={styles.topSection}>
                  <img src={DefaultProfilePic} />
                  <div className={styles.nameAndEmail}>
                      <span>{user.username}</span>
                      <span>{user.email}</span>
                  </div>
              </div>
              <hr />
              <div className={styles.registrationDate}>
                  <span>Registration Date</span>
                  <span>{user.regisdate}</span>
              </div>
              <div className={styles.userpreferences}>
                  <span>Your preferences</span>
                  <ul>
                      {user.userpreferences.map(tag => {
                          return (
                              <div className={styles.preferenceTag}>
                                  {tag}
                              </div>
                          )
                      }) }
                  </ul>
              </div>
          </div>
      </div>
  );
}

export default ProfilePage;