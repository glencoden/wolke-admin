import { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { requestService } from '../../lib/requestService/requestService';


function OAuth({ adminPassword }) {
    const [ userName, setUserName ] = useState('');
    const [ password, setPassword ] = useState('');

    return (
        <div className="center-column">
            <TextField
                label="name"
                value={userName}
                onChange={({ target }) => setUserName(target.value)}
            />
            <TextField
                label="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
            />
            <Button
                className="cta-button"
                variant="contained"
                onClick={() => {
                    requestService.registerOAuthUser({
                        username: userName,
                        password,
                        admin_password: adminPassword
                    })
                        .then(resp => console.log(resp));
                }}
            >
                Register OAuth User
            </Button>
        </div>
    );
}

export default OAuth;