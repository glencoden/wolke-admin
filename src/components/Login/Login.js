import { useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import { requestService } from '../../lib/requestService/requestService';


function Login({ onSuccess }) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    return (
        <div className="action-box">
            <Typography className="title">
                Login
            </Typography>
            <TextField
                className="input-field"
                label="username"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
            />
            <TextField
                type="password"
                className="input-field"
                label="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
            />
            <Button
                className="cta-button"
                variant="contained"
                onClick={() => {
                    requestService.loginToWolke({
                        username,
                        password
                    })
                        .then(resp => {
                            if (!resp.success) {
                                console.log('login failed', resp);
                                return;
                            }
                            onSuccess(password);
                        });
                }}
            >
                Login
            </Button>
        </div>
    );
}

export default Login;