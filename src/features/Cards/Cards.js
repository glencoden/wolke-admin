import { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { requestService } from '../../lib/requestService/requestService';


function Cards({ adminPassword }) {
    const [ userName, setUserName ] = useState('');
    // const [ from, setFrom ] = useState([]);
    // const [ to, setTo ] = useState([]);
    // const [ isAdmin, setIsAdmin ] = useState(false);

    return (
        <div className="center-column">
            <TextField
                label="name"
                value={userName}
                onChange={({ target }) => setUserName(target.value)}
            />

            {/* add breadcrumb input and select field */}

            <Button
                variant="contained"
                onClick={() => {
                    requestService.registerCardsUser({
                        admin_password: adminPassword
                    })
                        .then(resp => console.log(resp));
                }}
            >
                Register Cards User
            </Button>
        </div>
    );
}

export default Cards;