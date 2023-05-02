import React, { useState, useReducer, Fragment, useRef } from 'react';
import { TextField, Button, Grid, styled, Box, Select, MenuItem } from '@mui/material'
import useTranslation from 'next-translate/useTranslation'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import sendRequest from 'lib/requests';
import { tableConfig } from 'components/backoffice/tableStructure';

export default function BasicForm() {
    const { t } = useTranslation('common')
    const formRef = useRef();

    const [event, setEvent] = useReducer((prev, next) => {
        const newEvent = { ...prev, ...next }

        return newEvent;
    }, {
        productionID: '',
        productionUnitInternalID: '',
        productionType: '',
        activityStartDate: '',
        batchID: '',
        batchType: '',
        batchInternalID: '',
        supplierID: '',
        unit: '',
        inputBatches: {
            // "b-001": 100,
            // "b-002":100
        },
        batchComposition: {
            // "organic_cotton": 50,
            // "polyamide6": 50
        },
        quantity: '',
        finalScore: '',
        productionScore: '',
        ses: '',
    }
    )

    const { endpoints } = tableConfig['registration']

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const request = await sendRequest(endpoints.insertRecord, 'POST', event)

        if (request.error) {
            alert('Error inserting record')
        } else {
            setEvent({
                productionID: '',
                productionUnitInternalID: '',
                productionType: '',
                activityStartDate: '',
                batchID: '',
                batchType: '',
                batchInternalID: '',
                supplierID: '',
                unit: '',
                inputBatches: {
                    // "b-001": 100,
                    // "b-002":100
                },
                batchComposition: {
                    // "organic_cotton": 50,
                    // "polyamide6": 50
                },
                quantity: '',
                finalScore: '',
                productionScore: '',
                ses: '',
            })

        }
    };

    var batchTypes = [
        "FIBER",
        "YARN",
        "MESH",
        "FABRIC",
        "DYED_MESH",
        "FINISHED_MESH",
        "DYED_FABRIC",
        "FINISHED_FABRIC",
        "CUT",
        "FINISHED_PIECE",
        "OTHER",
    ];

    var productionTypes = [
        "SPINNING",
        "WEAVING",
        "KNITTING",
        "DYEING_FINISHING",
        "CONFECTION",
    ];

    return (
        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px' }} onSubmit={handleSubmit} ref={formRef}>
            <Grid container spacing={3}>
                <Fragment>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Production ID"
                            variant="outlined" style={{ margin: '10px', width: '100%' }}
                            value={event.productionID} required
                            onChange={(event) => setEvent({ productionID: event.target.value })}
                        />

                        <TextField label="productionType"
                            variant="outlined" style={{ margin: '10px', width: '100%' }}
                            value={event.productionType} select
                            onChange={(event) => setEvent({ productionType: event.target.value })}
                        >
                            {productionTypes.map((item) => (
                                <MenuItem key={item} value={item}>{item}</MenuItem>
                            ))}
                        </TextField>

                    </Grid>

                    <Grid item xs={12} sm={6}>

                        <TextField label="Production Unit Internal ID"
                            variant="outlined" style={{ margin: '10px', width: '100%' }}
                            value={event.productionUnitInternalID} required
                            onChange={(event) => setEvent({ productionUnitInternalID: event.target.value })}
                        />

                        <TextField label="batchType"
                            variant="outlined" style={{ margin: '10px', width: '100%' }}
                            value={event.batchType} select
                            onChange={(event) => setEvent({ batchType: event.target.value })}
                        >
                            {batchTypes.map((item) => (
                                <MenuItem key={item} value={item}>{item}</MenuItem>
                            ))}
                        </TextField>

                    </Grid>
                </Fragment>


                <Grid item xs={12} display="flex" justifyContent="flex-end">
                    <Button variant="contained" color="primary" style={{ marginLeft: '10px' }} type="submit">
                        {t('submit')}
                    </Button>
                </Grid>
            </Grid>
        </form >
    );
};
