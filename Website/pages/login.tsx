// login.tsx
import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Login.module.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add login logic here
    console.log("Logging in with", { username, password });
    router.push("/play"); // Redirect to dashboard after login
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.left}>
          <img src="BigBrain.svg" alt="BigBrain" />
        </div>
        <div className={styles.right}>
          <div className={styles.top}>
            <img src="logo.png" alt="Logo" />
            <h1>Welcome to Brainer</h1>
            <div className={styles.desc}>
              Login to your account and continue training your brain.
            </div>
          </div>
          <form className={styles.form} onSubmit={handleLogin}>
            <div className={styles.inputfield}>
              <input
                required={true}
                autoComplete="off"
                type="text"
                name="text"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <label>Username</label>
            </div>
            <div className={styles.inputfield}>
              <input
                required={true}
                autoComplete="off"
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Password</label>
            </div>
            <div className={styles.rememberforgot}>
              <label className={styles.materialcheckbox}>
                <input
                  type="checkbox"
                  onChange={() => setRemember(!remember)}
                />
                <span className={styles.checkmark}></span>
                Remember me
              </label>
              <a href="/forgotpassword">Forgot Password?</a>
            </div>
            <button type="submit">Login</button>
            <p>
              Don’t have an account yet ? <a href="/register">Sign Up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;