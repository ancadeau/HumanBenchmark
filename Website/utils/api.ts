// API endpoint URLs
const LOGIN_URL = "login.php";
const REGISTER_URL = "register.php";

// Login API call
async function login(username: string, password: string): Promise<Response> {
    const response = fetch(LOGIN_URL, {
        method: "POST",
        headers: {
            "Cookie": document.cookie
        },
        body: new URLSearchParams({
            username: username,
            password: password
        })
    });

    return await response;
}

// Register API call
async function register(username: string, password: string, dob: Date): Promise<Response> {
    const response = fetch(REGISTER_URL, {
        method: "POST",
        headers: {
            "Cookie": document.cookie
        },
        body: new URLSearchParams({
            username: username,
            password: password,
            dob: dob.toISOString()
        })
    });

    return await response;
}

export { login, register };