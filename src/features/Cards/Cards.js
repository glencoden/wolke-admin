import { useState, useEffect } from 'react';
import { Button, Checkbox, FormControlLabel, TextField, Typography } from '@material-ui/core';
import { requestService } from '../../lib/requestService/requestService';

function parseLangInput(input) {
    return input.split(', ');
}


function Cards({ adminPassword }) {
    const [ registerUserName, setRegisterUserName ] = useState('');
    const [ from, setFrom ] = useState('');
    const [ to, setTo ] = useState('');
    const [ isAdmin, setIsAdmin ] = useState(false); // TODO this is an unused example

    const [ deleteUserName, setDeleteUserName ] = useState('');

    const [ users, setUsers ] = useState([]);

    useEffect(() => {
        requestService.getCardsUsers()
            .then(resp => {
                if (!resp.success) {
                    console.log('something went wrong getting cards users');
                    return;
                }
                setUsers(resp.users);
            });
    }, []);

    return (
        <>
            <div className="center-column">
                <Typography className="title">
                    Register Cards User
                </Typography>
                <TextField
                    className="input-field"
                    label="name"
                    value={registerUserName}
                    onChange={({ target }) => setRegisterUserName(target.value)}
                />
                <TextField
                    className="input-field"
                    label="from"
                    value={from}
                    onChange={({ target }) => setFrom(target.value)}
                />
                <TextField
                    className="input-field"
                    label="to"
                    value={to}
                    onChange={({ target }) => setTo(target.value)}
                />
                <FormControlLabel
                    className="checkbox"
                    control={<Checkbox checked={isAdmin} onChange={() => setIsAdmin(prevState => !prevState)} name="checkedA" />}
                    label="is admin"
                />
                <Button
                    className="cta-button"
                    variant="contained"
                    onClick={() => {
                        requestService.registerCardsUser({
                            admin_password: adminPassword,
                            name: registerUserName,
                            from: parseLangInput(from),
                            to: parseLangInput(to),
                            isAdmin
                        })
                            .then(resp => console.log(resp));
                    }}
                >
                    Register
                </Button>
            </div>
            <div className="center-column">
                <Typography className="title">
                    Delete Cards User
                </Typography>
                <TextField
                    className="input-field"
                    label="name"
                    value={deleteUserName}
                    onChange={({ target }) => setDeleteUserName(target.value)}
                />
                <Button
                    className="cta-button"
                    variant="contained"
                    onClick={() => {
                        requestService.deleteCardsUser({
                            admin_password: adminPassword,
                            name: deleteUserName,
                        })
                            .then(resp => console.log(resp));
                    }}
                >
                    Delete
                </Button>
            </div>
            <div className="center-column">
                <Typography className="title">
                    All Users
                </Typography>
                {users.map((user, index) => (
                    <Typography key={index} className="title" color="textSecondary" variant="caption">
                        {user.name}
                    </Typography>
                ))}
            </div>
        </>
    );
}

export default Cards;