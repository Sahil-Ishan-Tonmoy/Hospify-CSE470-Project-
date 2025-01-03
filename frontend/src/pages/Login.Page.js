import { useState } from 'react';
import '../css/Login.css'


const Login = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Login successful:", data);
                // Redirect to the home page with the user ID
                window.location.href = `http://localhost:3000/home/${data.role}/${data.userId}`;
            } else {
                const error = await response.json();
                console.error("Login failed:", error.message);
                alert("Invalid credentials");
            }
        } catch (err) {
            console.error("Error during login:", err);
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2 className="heading">Login</h2>
                <input
                    type="text"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input"
                />
                <button onClick={handleLogin} className="button">Login</button>

                <div className="footer">
                    <button onClick={() => window.location.href = 'http://localhost:3000/signup'} className="footerButton">Sign Up</button>
                    <button onClick={() => window.location.href = 'http://localhost:3000/forgot-password'} className="footerButton">Forgot Password?</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
