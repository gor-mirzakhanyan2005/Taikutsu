import styles from "../stylesheets/Register.module.scss"
import { useContext, useState } from "react";
import { UserContext } from "../App";
import { useNavigate, Link } from "react-router-dom";

function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords must match!");
            return;
        }

        const guid = crypto.randomUUID();

        try {
            const registrationRes = await fetch("/api/registration", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            if (!registrationRes.ok) {
                const text = await registrationRes.text();
                alert(text);
                return;
            }

            const userData = await registrationRes.json();
            console.log(userData);
            setUser(userData);

            const cartRes = await fetch("/api/cart", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: userData.userId , cartId: guid, cart: [] })
            })

            if (!cartRes.ok) {
                const text = await cartRes.text(); 
                alert(text);
                return;
            }

            const cartData = await cartRes.json();
            console.log(cartData);

            alert("Registered successfully!")

            navigate("/preferences");
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <div className={styles.registerBg}>
                <div className={styles.registerCont}>
                    <h2>Sign up</h2>
                    <form className={styles.registerForm} onSubmit={handleSubmit} asp-action='Post' asp-controller='Registration'>
                        <label htmlFor="username">Username</label>
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} name="username" />

                        <label htmlFor="password">Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} name="password" />

                        <label htmlFor="confirmpassword">Confirm password</label>
                        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} name="confirmpassword" />

                        <input type="submit" name="submit" value="Sign Up" />
                    </form>
                    <span className={styles.alreadyHaveAccount}>Already have an account? <Link to="/login" className={styles.loginLink}>Sign in.</Link></span>
                </div>
            </div>
        </>
    );
}

export default Register;