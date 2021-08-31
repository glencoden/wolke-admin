import { useEffect, useState } from 'react';
import { Button, Paper, TextField, Typography } from '@material-ui/core';
import { requestService } from '../../lib/requestService/requestService';


function OAuth({ setAlert }) {
    const [ registerUserName, setRegisterUserName ] = useState('');
    const [ password, setPassword ] = useState('');

    const [ deleteUserName, setDeleteUserName ] = useState('');

    const [ users, setUsers ] = useState([]);

    useEffect(() => {
        requestService.getOAuthUsers()
            .then(resp => {
                if (!resp.success) {
                    console.log('something went wrong getting oAuth users');
                    return;
                }
                setUsers(resp.users);
            });
    }, []);

    return (
        <div className="feature-box">
            <Paper variant="outlined" className="action-box">
                <div className="elements-box">
                    <Typography>
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
                </div>
                <div className="elements-box">
                    <Button
                        variant="contained"
                        onClick={() => {
                            requestService.registerOAuthUser({
                                username: registerUserName,
                                password,
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
                    <Typography>
                        Delete OAuth2 User
                    </Typography>
                    <TextField
                        label="name"
                        value={deleteUserName}
                        onChange={({ target }) => setDeleteUserName(target.value)}
                    />
                </div>
                <div className="elements-box">
                    <Button
                        variant="contained"
                        onClick={() => {
                            requestService.deleteOAuthUser({
                                username: deleteUserName,
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
                    <Typography>
                        All Users
                    </Typography>
                    {users.map((user, index) => (
                        <Typography key={index} color="textSecondary" variant="caption">
                            {user.username}
                        </Typography>
                    ))}
                </div>
            </Paper>
        </div>
    );
}

export default OAuth;