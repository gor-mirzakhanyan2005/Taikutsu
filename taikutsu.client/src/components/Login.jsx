import styles from "../stylesheets/Login.module.scss"
import { Link,useNavigate } from "react-router-dom";
import { useContext,
useState } from "react";
import { UserContext } from "../App";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();    

    async function handleLogin(e) {
        e.preventDefault();

        if (password !== repeatPassword) {
            alert("Passwords must match!");
            return;
        }

        try {
        const res = await fetch("/api/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        if (!res.ok) {
            const text = await res.text();
            alert(text);
            return;
        }

        const data = await res.json();
        console.log(data);
        setUser(data);
        console.log(user);
        alert("Login successful!")
        navigate("/")
    } catch (err) {
        console.error(err);
        alert("Server error.");
    }
    }
    return (
        <>
            <div className={styles.loginBg}>
                <div className={styles.loginCont}>
                    <form className={styles.loginForm} onSubmit={handleLogin} asp-action='Post' asp-controller='Login'>
                        <label for="email">Email</label>
                        <input type="email" name="email" onChange={e => setEmail(e.target.value)}/>

                        <label for="password">Password</label>
                        <input type="password" name="password" onChange={e => setPassword(e.target.value)}/>

                        <label for="name">Confirm password</label>
                        <input type="password" name="confirmpassword" onChange={e => setRepeatPassword(e.target.value)}/>

                        <input type="submit" name="submit" value="Sign In"/>
                    </form>
                    <span className={styles.dontHaveAccount}>Don't have an account? <Link to="/register" className={styles.registerLink}>Sign up.</Link></span>
                </div>
            </div>
        </>
    );
}

export default Login;