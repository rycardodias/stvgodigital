import React, { useState, useReducer, Fragment, useRef } from 'react';
import { TextField, Button, Grid, styled, Box, Select, MenuItem } from '@mui/material'
import useTranslation from 'next-translate/useTranslation'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import sendRequest from 'lib/requests';
import { tableConfig } from 'components/backoffice/tableStructure';

const StyledDataPicker = styled(DatePicker)`
margin: 10px;
    width: 100%;
`;


export default function BasicForm() {
    const { t } = useTranslation('common')
    const formRef = useRef();

    const [event, setEvent] = useReducer((prev, next) => {
        const newEvent = { ...prev, ...next }

        return newEvent;
    }, {
        receptionID: '',
        productionUnitID: '',
        activityDate: '',
        receivedBatchID: '',
        newBatchID: '',
        newBatchInternalID: '',
        isAccepted: '',
        ECS: '',
        SES: '',
    })

    const { endpoints } = tableConfig['reception']

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(endpoints)
        const request = await sendRequest(endpoints.insertRecord, 'POST', event)

        if (request.error) {
            //retornar erro
            alert('Error inserting record')
        } else {
            setEvent({
                receptionID: '',
                productionUnitID: '',
                activityDate: '',
                receivedBatchID: '',
                newBatchID: '',
                newBatchInternalID: '',
                isAccepted: '',
                ECS: '',
                SES: '',
            })
        }
    };


    return (
        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px' }} onSubmit={handleSubmit} ref={formRef}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField label="Reception ID"
                        variant="outlined" style={{ margin: '10px', width: '100%' }}
                        value={event.receptionID} required
                        onChange={(event) => setEvent({ receptionID: event.target.value })}
                    />
                    <TextField label="productionUnitID"
                        variant="outlined" style={{ margin: '10px', width: '100%' }}
                        value={event.productionUnitID} required
                        onChange={(event) => setEvent({ productionUnitID: event.target.value })}
                    />
                    <TextField label="newBatchID"
                        variant="outlined" style={{ margin: '10px', width: '100%' }}
                        value={event.newBatchID} required
                        onChange={(event) => setEvent({ newBatchID: event.target.value })}
                    />
                    <TextField label="isAccepted"
                        variant="outlined" style={{ margin: '10px', width: '100%' }}
                        value={event.isAccepted} required
                        onChange={(event) => setEvent({ isAccepted: event.target.value })}
                    />
                    <TextField label="SES"
                        variant="outlined" style={{ margin: '10px', width: '100%' }}
                        value={event.SES} required
                        onChange={(event) => setEvent({ SES: event.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <StyledDataPicker label="activityDate"
                        className='datepicker' format="DD/MM/YYYY"
                        value={event.activityDate}
                        onChange={(value) => setEvent({ activityDate: value })}
                    />
                    <TextField label="receivedBatchID"
                        variant="outlined" style={{ margin: '10px', width: '100%' }}
                        value={event.receivedBatchID} required
                        onChange={(event) => setEvent({ receivedBatchID: event.target.value })}
                    />
                    <TextField label="newBatchInternalID"
                        variant="outlined" style={{ margin: '10px', width: '100%' }}
                        value={event.newBatchInternalID} required
                        onChange={(event) => setEvent({ newBatchInternalID: event.target.value })}
                    />
                    <TextField label="ECS"
                        variant="outlined" style={{ margin: '10px', width: '100%' }}
                        value={event.ECS} required
                        onChange={(event) => setEvent({ ECS: event.target.value })}
                    />
                </Grid>

                <Grid item xs={12} display="flex" justifyContent="flex-end">
                    <Button variant="contained" color="primary" style={{ marginLeft: '10px' }} type="submit">
                        {t('submit')}
                    </Button>
                </Grid>
            </Grid>


        </form >
    );
};
