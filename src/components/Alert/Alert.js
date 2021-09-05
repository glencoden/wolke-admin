import { useEffect } from 'react';
import { Dialog, DialogContent, DialogContentText, DialogTitle, Typography } from '@material-ui/core';

const alertDefaultTime = 2;


function Alert({ alert, reset }) {
    const { title, text, error, time } = alert;

    useEffect(() => {
        if (!title && !text) {
            return;
        }
        const timeoutId = setTimeout(reset, (error ? 60 : (time || alertDefaultTime)) * 1000);
        return () => clearTimeout(timeoutId);
    }, [ reset, title, text, error, time ]);

    const open = !!title || !!text;

    const errorMessage = [];
    if (error) {
        for (const key in error) {
            const value = error[key];
            if (typeof value === 'string' || typeof value === 'number') {
                errorMessage.push(`${key}: ${value}`);
            }
        }
    }

    return (
        <Dialog
            open={open}
            onClick={reset}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            {!!title && (
                <DialogTitle id="alert-dialog-title" className={error ? 'alert-error' : ''}>
                    {title}
                </DialogTitle>
            )}
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                {!!text && (
                    <Typography>
                        {text}
                    </Typography>
                )}
                {!!errorMessage.length && errorMessage.map((message, index) => (
                    <Typography key={index}>
                        {message}
                    </Typography>
                ))}
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}

export default Alert;