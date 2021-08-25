import { useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import { requestService } from '../../lib/requestService/requestService';


function OAuth({ adminPassword }) {
    const [ registerUserName, setRegisterUserName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ deleteUserName, setDeleteUserName ] = useState('');

    return (
        <>
            <div className="center-column">
                <Typography className="title">
                    Register OAuth2 User
                </Typography>
                <TextField
                    label="name"
                    value={registerUserName}
                    onChange={({ target }) => setRegisterUserName(target.value)}
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
                            username: registerUserName,
                            password,
                            admin_password: adminPassword
                        })
                            .then(resp => console.log(resp));
                    }}
                >
                    Register
                </Button>
            </div>
            <div className="center-column">
                <Typography className="title">
                    Delete OAuth2 User
                </Typography>
                <TextField
                    label="name"
                    value={deleteUserName}
                    onChange={({ target }) => setDeleteUserName(target.value)}
                />
                <Button
                    className="cta-button"
                    variant="contained"
                    onClick={() => {
                        requestService.deleteOAuthUser({
                            username: deleteUserName,
                            admin_password: adminPassword
                        })
                            .then(resp => console.log(resp));
                    }}
                >
                    Delete
                </Button>
            </div>
        </>
    );
}

export default OAuth;