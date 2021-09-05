import { useState, useCallback, useEffect } from 'react';
import { Button, Paper, TextField, Typography } from '@material-ui/core';
import { requestService } from '../../lib/requestService/requestService';


function OAuth({ setAlert }) {
    const [ registerUserName, setRegisterUserName ] = useState('');
    const [ password, setPassword ] = useState('');

    const [ deleteUserName, setDeleteUserName ] = useState('');

    const [ users, setUsers ] = useState([]);

    const getUsers = useCallback(
        () => {
            requestService.getOAuthUsers()
                .then(resp => {
                    if (!resp.success) {
                        setAlert({ title: 'Failed to get oAuth2 users', error: resp });
                        return;
                    }
                    setUsers(resp.users);
                })
                .catch(error => setAlert({ title: 'request error', error }));
        },
        [ setAlert ]
    );

    useEffect(() => getUsers(), [ getUsers ]);

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
                                .then(resp => {
                                    if (!resp.success) {
                                        setAlert({ title: 'Failed to register oAuth2 user', error: resp });
                                        return;
                                    }
                                    setRegisterUserName('');
                                    setPassword('');
                                    console.log(resp);// TODO remove dev code
                                    setAlert({ title: 'Registered oAuth2 user' });
                                    getUsers();
                                })
                                .catch(error => setAlert({ title: 'request error', error }));
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
                                .then(resp => {
                                    if (!resp.success) {
                                        setAlert({ title: 'Failed to delete oAuth2 user', error: resp });
                                        return;
                                    }
                                    setDeleteUserName('');
                                    setAlert({ title: 'Deleted oAuth2 user' });
                                    getUsers();
                                })
                                .catch(error => setAlert({ title: 'request error', error }));
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
                        <Typography key={index} className="list-item" color="textSecondary" variant="caption">
                            {user.username}
                        </Typography>
                    ))}
                </div>
            </Paper>
        </div>
    );
}

export default OAuth;