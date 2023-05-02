import React, { useState, useReducer, Fragment, useRef } from 'react';
import { TextField, Button, Grid, styled, RadioGroup, FormControlLabel, Radio, Box, MenuItem } from '@mui/material'
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

    const [batchComposition1, setbatchComposition1] = useState("")
    const [batchComposition2, setbatchComposition2] = useState("")

    const formRef = useRef();

    const [event, setEvent] = useReducer((prev, next) => {
        const newEvent = { ...prev, ...next }

        return newEvent;
    }, {
        transportID: '',
        originProductionUnitInternalID: '',
        destinationProductionUnitID: '',
        transportType: '',
        activityDate: '',
        isReturn: false,
        inputBatches: {},
    })


    const { endpoints } = tableConfig['transportation']

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const request = await sendRequest(endpoints.insertRecord, 'POST', event)

        if (request.error) {
            //retornar erro
            alert('Error inserting record')
        } else {
            setEvent({
                transportID: '',
                originProductionUnitInternalID: '',
                destinationProductionUnitID: '',
                transportType: '',
                activityDate: '',
                isReturn: false,
                inputBatches: {},
            })

        }


    };

    const transportTypes = ["ROAD", "MARITIME", "AIR", "RAIL", "INTERMODAL"];

    return (
        <Box onSubmit={handleSubmit} ref={formRef}
            component="form" noValidate autoComplete="off"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '40ch' },
            }}
        >
            <div>
                <TextField label="Transport ID"
                    variant="outlined"
                    value={event.transportID} required
                    onChange={(event) => setEvent({ transportID: event.target.value })}
                />
                <TextField label="Origin Production Unit ID"
                    variant="outlined"
                    value={event.originProductionUnitInternalID} required
                    onChange={(event) => setEvent({ originProductionUnitInternalID: event.target.value })}
                />

                <TextField label="Destination Production Unit ID"
                    variant="outlined"
                    value={event.destinationProductionUnitID} required
                    onChange={(event) => setEvent({ destinationProductionUnitID: event.target.value })}
                />



                <TextField label="Transport Type"
                    variant="outlined"
                    value={event.transportType} select
                    onChange={(event) => setEvent({ transportType: event.target.value })}
                >
                    {transportTypes.map((item) => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                    ))}
                </TextField>

                <StyledDataPicker label="activityDate"
                    className='datepicker' format="DD/MM/YYYY"
                    value={event.activityDate}
                    onChange={(value) => setEvent({ activityDate: value })}
                />

                <TextField label="Is Return"
                    variant="outlined"
                    value={event.isReturn} select
                    onChange={(event) => setEvent({ isReturn: event.target.value })}
                >
                    <MenuItem key={'isReturnFalse'} value={'false'}>{'false'}</MenuItem>
                    <MenuItem key={'isReturnTrue'} value={'true'}>{'true'}</MenuItem>
                </TextField>

            </div>

            <div>
                <TextField label="Batch Id"
                    variant="outlined"
                    required
                    onChange={(event) => {
                        setbatchComposition1(event.target.value);

                        setEvent({
                            inputBatches: {
                                ...event.inputBatches, [event.target.value]: '',
                            }
                        })
                    }}
                />
                <TextField label="Batch Quantity"
                    variant="outlined"
                    value={event.inputBatches[batchComposition1]} required
                    onChange={(event) => {
                        setEvent({
                            batchComposition: {
                                ...event.inputBatches, [batchComposition1]: event.target.value,
                            }
                        })
                    }}
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
