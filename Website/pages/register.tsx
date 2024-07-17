// register.tsx
import React, { useState } from "react";
import { useRouter } from "next/router";
import { DatePicker } from "@nextui-org/date-picker";
import { CalendarDate, getLocalTimeZone, parseDate, today } from "@internationalized/date";
import styles from "../styles/Register.module.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState(new CalendarDate(1900, 0, 1));
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    } else {
      console.log("Registering with", { username, password });
    }
    router.push("/play");
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
              Sign up now and get full access to our brain tester.
            </div>
          </div>
          <form className={styles.form} onSubmit={handleRegister}>
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
            <div className={styles.inputfield}>
              <input
                required={true}
                autoComplete="off"
                type="password"
                name="password"
                id="passwordconfirm"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label>Confirm Password</label>
            </div>
            <div className={styles.datepicker}>
              Date of Birth :
              <input
                name="data"
                id="data"
                type="date"
                className={styles.infosDate}
                defaultValue={today("UTC").toString()}
                onChange={(e) => setDob(parseDate(e.target.value))}
              />
            </div>
            <button type="submit">Register</button>
            <p>
              Already Have an Account ? <a href="/login">Login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;