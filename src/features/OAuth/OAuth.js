import { useEffect, useState } from 'react';
import { Button, Paper, TextField, Typography } from '@material-ui/core';
import { requestService } from '../../lib/requestService/requestService';


function OAuth({ adminPassword }) {
    const [ registerUserName, setRegisterUserName ] = useState('');
    const [ password, setPassword ] = useState('');

    const [ deleteUserName, setDeleteUserName ] = useState('');

    const [ users, setUsers ] = useState([]);

    useEffect(() => {
        requestService.getOAuthUsers({ admin_password: adminPassword })
            .then(resp => {
                if (!resp.success) {
                    console.log('something went wrong getting oAuth users');
                    return;
                }
                setUsers(resp.users);
            });
    }, [ adminPassword ]);

    return (
        <div className="feature-box">
            <Paper variant="outlined" className="action-box">
                <div className="elements-box">
                    <Typography className="title">
                        Register OAuth2 User
                    </Typography>
                    <TextField
                        className="input-field"
                        label="name"
                        value={registerUserName}
                        onChange={({ target }) => setRegisterUserName(target.value)}
                    />
                    <TextField
                        className="input-field"
                        label="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <div className="elements-box">
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
            </Paper>
            <Paper variant="outlined" className="action-box">
                <div className="elements-box">
                    <Typography className="title">
                        Delete OAuth2 User
                    </Typography>
                    <TextField
                        className="input-field"
                        label="name"
                        value={deleteUserName}
                        onChange={({ target }) => setDeleteUserName(target.value)}
                    />
                </div>
                <div className="elements-box">
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
            </Paper>
            <Paper variant="outlined" className="action-box">
                <div className="elements-box">
                    <Typography className="title">
                        All Users
                    </Typography>
                    {users.map((user, index) => (
                        <Typography key={index} className="title" color="textSecondary" variant="caption">
                            {user.username}
                        </Typography>
                    ))}
                </div>
            </Paper>
        </div>
    );
}

export default OAuth;