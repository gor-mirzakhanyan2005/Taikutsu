import styles from '../stylesheets/ProfileModal.module.scss';
import ProfilePic from '../assets/Twitter_default_profile_400x400.png';
import { useContext } from 'react';
import { UserContext } from '../App';

function ProfileModal({ setOpen }) {
    const { user, setUser } = useContext(UserContext);

  return (
      <div className={styles.profileModalBg}>
          <div className={styles.modalBody} onMouseLeave={() => { setOpen(false) }}>
              <div className={styles.profileChip}>
                  <img src={ProfilePic} />
                  <div className={styles.nameAndEmail}>
                      <span>{user.username}</span>
                      <span>{user.email}</span>
                  </div>
                  <a onClick={() => setUser(null)}>Sign Out</a>
              </div>
          </div>
      </div>
  );
}

export default ProfileModal;