import { useState } from 'react';
import { Button, Paper, TextField, Typography } from '@material-ui/core';
import { requestService } from '../../lib/requestService/requestService';


function Login({ onSuccess, setAlert }) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    return (
        <div className="feature-box">
            <Paper variant="outlined" className="action-box">
                <div className="elements-box">
                    <Typography>
                        Login
                    </Typography>
                    <TextField
                        label="username"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                    <TextField
                        type="password"
                        label="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <div className="elements-box">
                    <Button
                        variant="contained"
                        onClick={() => {
                            requestService.loginToWolke({
                                username,
                                password
                            })
                                .then(resp => {
                                    if (!resp.ok) {
                                        setAlert({ title: 'Login failed', error: resp });
                                        return;
                                    }
                                    onSuccess(password);
                                })
                                .catch(error => setAlert({ title: 'request error', error }));
                        }}
                    >
                        Login
                    </Button>
                </div>
            </Paper>
        </div>
    );
}

export default Login;