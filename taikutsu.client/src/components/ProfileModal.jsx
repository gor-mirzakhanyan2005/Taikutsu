import styles from '../stylesheets/ProfileModal.module.scss';
import ProfilePic from '../assets/Twitter_default_profile_400x400.png';
import { useContext } from 'react';
import { DarkModeContext, UserContext } from '../App';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function ProfileModal({ setOpen }) {
    const { darkmode } = useContext(DarkModeContext);
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <div data-theme={darkmode ? "dark" : "light"} className={styles.profileModalBg}>
            <div className={styles.modalBody} onMouseLeave={() => { window.innerWidth > 1040 ? setOpen(prev => !prev) : '' }}>
                <div className={styles.profileChip}>
                    {user ?
                        (<>
                            <div className={styles.profile}>
                                <img src={ProfilePic} />
                                <div className={styles.nameAndSignIn}>
                                    <span>{user.username}</span>
                                    <a onClick={() => setUser(null)}>Sign Out</a>
                                </div>
                            </div>
                        </>)
                        :
                        (<>
                            <div className={styles.notLoggedIn}>
                                <span>You are not signed in!</span>
                                <button onClick={() => navigate('/login') }>Sign in.</button>
                                <span>Don't have an account? <Link to='/register'>Sign up.</Link></span>
                            </div>
                        </>)
                    }
                </div>
            </div>
        </div>
    );
}

export default ProfileModal;