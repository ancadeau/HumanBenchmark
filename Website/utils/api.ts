// API endpoint URLs
import {CalendarDate} from "@nextui-org/react";
import {redirect, RedirectType} from "next/navigation";

const BASE_URL = "/wdp/Group3"
const LOGIN_URL = BASE_URL + "/api/login.php";
const REGISTER_URL = BASE_URL + "/api/register.php";

// Login API call
async function login(username: string, password: string): Promise<Response> {
    return await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
            "Cookie": document.cookie
        },
        body: new URLSearchParams({
            username: username,
            password: password
        })
    });
}

// Register API call
async function register(username: string, password: string, dob: CalendarDate): Promise<Response> {
    return await fetch(REGISTER_URL, {
        method: "POST",
        headers: {
            "Cookie": document.cookie
        },
        body: new URLSearchParams({
            username: username,
            password: password,
            dob: dob.toString()
        })
    });
}

export { login, register };