import { useCallback, useEffect } from 'react';
import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';


function Alert({ alert, setAlert }) {
    const { title, text, isError, time } = alert;

    const closeAlert = useCallback(
        () => {
            setAlert({ title: '', text: '', isError: false });
        },
        [ setAlert ]
    );

    useEffect(() => {
        if (!title && !text) {
            return;
        }
        const timeoutId = setTimeout(closeAlert, (time ? time : 3) * 1000);
        return () => clearTimeout(timeoutId);
    }, [ closeAlert, title, text, time ]);

    const open = !!title || !!text;

    return (
        <Dialog
            open={open}
            onClick={closeAlert}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            {!!title && (
                <DialogTitle id="alert-dialog-title">
                    {`${isError ? 'Error: ' : ''}${title}`}
                </DialogTitle>
            )}
            {!!text && (
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {text}
                    </DialogContentText>
                </DialogContent>
            )}
        </Dialog>
    );
}

export default Alert;