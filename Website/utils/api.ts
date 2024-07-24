// API endpoint URLs
import {CalendarDate} from "@nextui-org/react";
import {redirect, RedirectType} from "next/navigation";

const LOGIN_URL = "/api/login.php";
const REGISTER_URL = "/api/register.php";

// Login API call
async function login(username: string, password: string): Promise<Response> {
    const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
            "Cookie": document.cookie
        },
        redirect: "follow",
        body: new URLSearchParams({
            username: username,
            password: password
        })
    });

    if (response.ok && response.headers.has("Location")) {
        redirect(response.headers.get("Location")!, RedirectType.replace);
    }

    return response;
}

// Register API call
async function register(username: string, password: string, dob: CalendarDate): Promise<Response> {
    const response = await fetch(REGISTER_URL, {
        method: "POST",
        headers: {
            "Cookie": document.cookie
        },
        redirect: "follow",
        body: new URLSearchParams({
            username: username,
            password: password,
            dob: dob.toString()
        })
    });

    if (response.ok && response.headers.has("Location")) {
        redirect(response.headers.get("Location")!, RedirectType.replace);
    }
    return response;
}

export { login, register };