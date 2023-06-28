import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import useTranslation from 'next-translate/useTranslation'
import sendRequest from 'lib/requests';
import ls from 'localstorage-slim';

export default function FormDialog({ handleLogin }: any) {
    const [open, setOpen] = React.useState(false);

    const { t, lang } = useTranslation('common')

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [event, setEvent] = React.useReducer((prev: any, next: any) => {
        const newEvent = { ...prev, ...next }

        return newEvent;
    }, {
        id: '',
        secret: '',
    }
    )

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const request = await sendRequest('/onchain/users/enroll', 'POST', event)

        console.log(request)
        if (request.error) {
            //retornar erro
            ls.set('blockchainLoggedIn', false)
            console.log('Error inserting record')
        } else {
            setEvent({
                id: '',
                secret: '',
            })

            ls.set('blockchainLoggedIn', true)
            handleLogin(true)


            setTimeout(() => {
                ls.set('blockchainLoggedIn', false)
                handleLogin(false);
            }, 3 * 60 * 1000);

            handleClose()
        }
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Aceder à Blockchain
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Acessar à Rede</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Para aceder aos pedidos da blockchain por favor faça o login com as suas credenciais
                    </DialogContentText>
                    <TextField
                        onChange={(event) => setEvent({ id: event.target.value })}
                        autoFocus
                        margin="dense"
                        id="id"
                        label="Utilizador"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        onChange={(event) => setEvent({ secret: event.target.value })}
                        autoFocus
                        margin="dense"
                        id="secret"
                        label="Palavra-passe"
                        type="password"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t('cancel')}</Button>
                    <Button onClick={handleSubmit}>{t('login')}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}