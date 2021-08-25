import { useState } from 'react';
import { Button, Checkbox, FormControlLabel, TextField, Typography } from '@material-ui/core';
import { requestService } from '../../lib/requestService/requestService';

function parseLangInput(input) {
    return input.split(', ');
}


function Cards({ adminPassword }) {
    const [ userName, setUserName ] = useState('');
    const [ from, setFrom ] = useState('');
    const [ to, setTo ] = useState('');
    const [ isAdmin, setIsAdmin ] = useState(false); // TODO this is an unused example

    return (
        <div className="center-column">
            <Typography className="title">
                Register Cards User
            </Typography>
            <TextField
                label="name"
                value={userName}
                onChange={({ target }) => setUserName(target.value)}
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
                        name: userName,
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
    );
}

export default Cards;