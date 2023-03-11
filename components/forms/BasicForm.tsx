import React, { useState, useReducer } from 'react';
import { TextField, Button, Grid, styled, } from '@mui/material'
import useTranslation from 'next-translate/useTranslation'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

const StyledDataPicker = styled(DatePicker)`
margin: 10px;
    width: 100%;
`;


export default function BasicForm() {
    const { t } = useTranslation('common')
    const [currentStep, setCurrentStep] = useState(1);

    const handleNextClick = () => {
        setCurrentStep(2);
    }

    const [event, setEvent] = useReducer((prev, next) => {
        const newEvent = { ...prev, ...next }

        return newEvent;
    }, {
        registrationID: '',
        activityDate: '',
        ECS: '',
        SES: '',
        batch: {
            docType: '',
            ID: '',
            batchType: '',
            productionUnitID: '',
            batchInternalID: '',
            supplierID: '',
            quantity: 0,
            unit: '',
            ecs: 0,
            ses: 0,
            batchComposition: '',
        }
    })

    const handleSubmit = (event: any) => {
        event.preventDefault();
    };

    return (
        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px' }} onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                {currentStep === 1 && (
                    <>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                label="Registration ID"
                                variant="outlined"
                                style={{ margin: '10px', width: '100%' }}
                                value={event.registrationID}
                                onChange={(event) => setEvent({ registrationID: event.target.value })}
                            />

                            <TextField
                                label="docType"
                                variant="outlined"
                                style={{ margin: '10px', width: '100%' }}
                                value={event.batch.docType}
                                onChange={(event) => setEvent({ batch: { ...event.batch, docType: event.target.value } })}
                            />
                            <TextField
                                label="batchInternalID"
                                variant="outlined"
                                style={{ margin: '10px', width: '100%' }}
                                value={event.batch.batchInternalID}
                                onChange={(event) => setEvent({ batch: { ...event.batch, batchInternalID: event.target.value } })}
                            />
                            <TextField
                                label="docType"
                                variant="outlined"
                                style={{ margin: '10px', width: '100%' }}
                                value={event.batch.ecs}
                                onChange={(event) => setEvent({ batch: { ...event.batch, ecs: event.target.value } })}
                            />


                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                label="ECS"
                                variant="outlined"
                                style={{ margin: '10px', width: '100%' }}
                                value={event.ECS}
                                onChange={(event) => setEvent({ ECS: event.target.value })}
                            />

                            <TextField
                                label="ID"
                                variant="outlined"
                                style={{ margin: '10px', width: '100%' }}
                                value={event.batch.ID}
                                onChange={(event) => setEvent({ batch: { ...event.batch, ID: event.target.value } })}
                            />
                            <TextField
                                label="supplierID"
                                variant="outlined"
                                style={{ margin: '10px', width: '100%' }}
                                value={event.batch.supplierID}
                                onChange={(event) => setEvent({ batch: { ...event.batch, supplierID: event.target.value } })}
                            />
                            <TextField
                                label="ses"
                                variant="outlined"
                                style={{ margin: '10px', width: '100%' }}
                                value={event.batch.ses}
                                onChange={(event) => setEvent({ batch: { ...event.batch, ses: event.target.value } })}
                            />



                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                label="SES"
                                variant="outlined"
                                style={{ margin: '10px', width: '100%' }}
                                value={event.SES}
                                onChange={(event) => setEvent({ SES: event.target.value })}
                            />

                            <TextField
                                label="batchType"
                                variant="outlined"
                                style={{ margin: '10px', width: '100%' }}
                                value={event.batch.batchType}
                                onChange={(event) => setEvent({ batch: { ...event.batch, batchType: event.target.value } })}
                            />
                            <TextField
                                label="quantity"
                                variant="outlined"
                                style={{ margin: '10px', width: '100%' }}
                                value={event.batch.quantity}
                                onChange={(event) => setEvent({ batch: { ...event.batch, quantity: event.target.value } })}
                            />
                            <TextField
                                label="batchComposition"
                                variant="outlined"
                                style={{ margin: '10px', width: '100%' }}
                                value={event.batch.batchComposition}
                                onChange={(event) => setEvent({ batch: { ...event.batch, batchComposition: event.target.value } })}
                            />
                        </Grid>


                        <Grid item xs={12} sm={3}>
                            <StyledDataPicker
                                className='datepicker'
                                format="DD/MM/YYYY"
                                label="activityDate"
                                value={event.activityDate}
                                onChange={(value) => setEvent({ activityDate: value })}
                            />

                            <TextField
                                label="productionUnitID"
                                variant="outlined"
                                style={{ margin: '10px', width: '100%' }}
                                value={event.batch.productionUnitID}
                                onChange={(event) => setEvent({ batch: { ...event.batch, productionUnitID: event.target.value } })}
                            />

                            <TextField
                                label="unit"
                                variant="outlined"
                                style={{ margin: '10px', width: '100%' }}
                                value={event.batch.unit}
                                onChange={(event) => setEvent({ batch: { ...event.batch, unit: event.target.value } })}
                            />
                        </Grid>
                    </>
                )
                }
            </Grid>

            {currentStep === 1 &&
                <Button variant="contained" color="primary" onClick={handleNextClick}>
                    {t('next')}
                </Button>
            }

            {currentStep === 2 &&
                <>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        style={{ margin: '30px' }}
                    >
                        {t('submit')}
                    </Button>
                </>
            }


        </form >
    );
};
