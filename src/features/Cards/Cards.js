import { useState, useCallback, useEffect } from 'react';
import { Button, Checkbox, FormControlLabel, Paper, TextField, Typography } from '@material-ui/core';
import { requestService } from '../../lib/requestService/requestService';

function parseLangInput(input) {
    return input.split(', ');
}


function Cards({ setAlert }) {
    const [ registerUserName, setRegisterUserName ] = useState('');
    const [ from, setFrom ] = useState('');
    const [ to, setTo ] = useState('');
    const [ isAdmin, setIsAdmin ] = useState(false); // TODO this is an unused example

    const [ deleteUserName, setDeleteUserName ] = useState('');

    const [ users, setUsers ] = useState([]);

    const getUsers = useCallback(
        () => {
            requestService.getCardsUsers()
                .then(resp => {
                    if (!resp.success) {
                        setAlert({ title: 'Failed to get cards users', error: resp });
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
                        Register Cards User
                    </Typography>
                    <TextField
                        label="name"
                        value={registerUserName}
                        onChange={({ target }) => setRegisterUserName(target.value)}
                    />
                    <TextField
                        label="from"
                        value={from}
                        onChange={({ target }) => setFrom(target.value)}
                    />
                    <TextField
                        label="to"
                        value={to}
                        onChange={({ target }) => setTo(target.value)}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={isAdmin} onChange={() => setIsAdmin(prevState => !prevState)} name="checkedA" />}
                        label="is admin"
                    />
                </div>
                <div className="elements-box">
                    <Button
                        variant="contained"
                        onClick={() => {
                            requestService.registerCardsUser({
                                name: registerUserName,
                                from: parseLangInput(from),
                                to: parseLangInput(to),
                                isAdmin
                            })
                                .then(resp => {
                                    if (!resp.success) {
                                        setAlert({ title: 'Failed to register cards user', error: resp });
                                        return;
                                    }
                                    setRegisterUserName('');
                                    setFrom('');
                                    setTo('');
                                    setIsAdmin(false);
                                    setAlert({ title: `Registered cards user ${resp.user.name}` });
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
                        Delete Cards User
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
                            requestService.deleteCardsUser({
                                name: deleteUserName,
                            })
                                .then(resp => {
                                    if (!resp.success) {
                                        setAlert({ title: 'Failed to delete cards user', error: resp });
                                        return;
                                    }
                                    setDeleteUserName('');
                                    setAlert({ title: 'Deleted cards user' });
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
                            {user.name}
                        </Typography>
                    ))}
                </div>
            </Paper>
        </div>
    );
}

export default Cards;