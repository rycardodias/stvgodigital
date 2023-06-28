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

    const [event, setEvent] = useReducer((prev: any, next: any) => {
        const newEvent = { ...prev, ...next }

        return newEvent;
    }, {
        receptionID: 'rc-',
        productionUnitInternalID: '',
        activityDate: '',
        receivedBatchID: 'b-',
        newBatchID: 'b-',
        newBatchInternalID: 'b-',
        isAccepted: '',
        distance: '',
    })

    const { endpoints } = tableConfig['reception']

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const request = await sendRequest(endpoints.insertRecord, 'POST', event)

        if (request.error) {
            //retornar erro
            alert('Error inserting record')
        } else {
            setEvent({
                receptionID: 'rc-',
                productionUnitInternalID: '',
                activityDate: '',
                receivedBatchID: 'b-',
                newBatchID: 'b-',
                newBatchInternalID: 'b-',
                isAccepted: '',
                distance: '',
            })

            alert(request.data)
        }
    };



    return (
        <Box onSubmit={handleSubmit} ref={formRef}
            component="form" noValidate autoComplete="off"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '40ch' },
            }}
        >
            <div>
                <TextField label="Reception ID"
                    variant="outlined"
                    value={event.receptionID} required
                    onChange={(event) => setEvent({ receptionID: event.target.value })}
                />

                <TextField label="Production Unit Internal ID"
                    variant="outlined"
                    value={event.productionUnitInternalID} select
                    onChange={(event) => setEvent({ productionUnitInternalID: event.target.value })}
                >
                    {['PU1', 'InovafilMSP:PU1', 'ASampaioMSP:PU1', 'TintexMSP:PU1', 'TMGMSP:PU1',].map((item) => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                    ))}
                </TextField>

                <StyledDataPicker label="activityDate"
                    className='datepicker' format="DD/MM/YYYY"
                    value={event.activityDate}
                    onChange={(value) => setEvent({ activityDate: value })}
                />

                <TextField label="Received Batch ID"
                    variant="outlined"
                    value={event.receivedBatchID} required
                    onChange={(event) => setEvent({ receivedBatchID: event.target.value })}
                />
                <TextField label="New Batch ID"
                    variant="outlined"
                    value={event.newBatchID} required
                    onChange={(event) => setEvent({ newBatchID: event.target.value })}
                />
                <TextField label="New Batch Internal ID"
                    variant="outlined"
                    value={event.newBatchInternalID} required
                    onChange={(event) => setEvent({ newBatchInternalID: event.target.value })}
                />

                <TextField label="isAccepted"
                    variant="outlined"
                    value={event.isAccepted} select
                    onChange={(event) => setEvent({ isAccepted: event.target.value })}
                >
                    <MenuItem key={'isAcceptedFalse'} value={'false'}>{'false'}</MenuItem>
                    <MenuItem key={'isAcceptedTrue'} value={'true'}>{'true'}</MenuItem>
                </TextField>

                <TextField label="distance"
                    variant="outlined"
                    value={event.distance} required
                    onChange={(event) => setEvent({ distance: event.target.value })}
                />



            </div>

            <div>
                <Button variant="contained" color="primary" style={{ marginLeft: '10px' }} type="submit">
                    {t('submit')}
                </Button>
            </div>
        </Box >
    );
};
