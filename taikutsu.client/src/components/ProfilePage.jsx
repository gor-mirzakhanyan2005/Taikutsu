import styles from '../stylesheets/ProfilePage.module.scss';
import DefaultProfilePic from '../assets/Twitter_default_profile_400x400.png';
import { useContext } from 'react';
import { DarkModeContext, UserContext } from '../App';
import { Link, useNavigate } from 'react-router-dom';
function ProfilePage() {
    const navigate = useNavigate();
    const { darkmode } = useContext(DarkModeContext);
    const { user, setUser } = useContext(UserContext);
    console.log(user);

    return (
        <>
            {user ?
                (<div data-theme={darkmode ? "dark" : "light"}  className={styles.profilePageBg} >
                    <div className={styles.profileBody}>
                        <div className={styles.topSection}>
                            <img src={DefaultProfilePic} />
                            <div className={styles.nameAndEmail}>
                                <span>{user.username}</span>
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
                                })}
                            </ul>
                        </div>
                        <button className={styles.signOut} onClick={() => setUser(null) }>Sign Out</button>
                        <button className={styles.changePreferences} onClick={() => navigate('/preferences')}>Change Preferences</button>
                    </div>
                </div >) :
                (
                    <div data-theme={darkmode ? "dark" : "light"}  className={styles.noProfileBackground}>
                        <div className={styles.noProfileContainer}>
                            <h2>You are not signed in!</h2>
                            <div className={styles.signInOrUp}>
                                <button onClick={() => navigate('/login') }>Sign In</button>
                                <span>Don't have an account? <Link to='/register'>Sign up.</Link></span>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default ProfilePage;