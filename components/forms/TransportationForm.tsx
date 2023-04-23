import React, { useState, useReducer, Fragment, useRef } from 'react';
import { TextField, Button, Grid, styled, RadioGroup, FormControlLabel, Radio } from '@mui/material'
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
    const [currentStep, setCurrentStep] = useState(1);

    const formRef = useRef();

    const handleNextClick = () => {
        const valid: boolean = formRef.current.reportValidity()

        valid && setCurrentStep(currentStep + 1);
    }
    const handlePreviousClick = () => {
        setCurrentStep(currentStep - 1);
    }

    const [event, setEvent] = useReducer((prev, next) => {
        const newEvent = { ...prev, ...next }

        return newEvent;
    }, {
        transportID: '',
        destinationProductionUnitID: '',
        transportationTypeID: '', // enum
        activityDate: '',
        distance: '',
        cost: '',
        isReturn: false,
        inputBatch: {

        },
    })

    const { endpoints } = tableConfig['transportation']

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(event)
        const request = await sendRequest(endpoints.insertRecord, 'POST', event)

        console.log(request)
        if (request.error) {
            //retornar erro
            alert('Error inserting record')
        } else {

            setCurrentStep(1);

            setEvent({
                transportID: '',
                destinationProductionUnitID: '',
                transportationTypeID: '',
                activityDate: '',
                distance: '',
                cost: '',
                isReturn: false,
                inputBatch: {

                }
            })

        }


    };

    const level1Fields: JSX.Element = (
        <Fragment>
            <Grid item xs={12} sm={6}>
                <TextField label="Transport ID"
                    variant="outlined" style={{ margin: '10px', width: '100%' }}
                    value={event.transportID} required
                    onChange={(event) => setEvent({ transportID: event.target.value })}
                />
                <TextField label="destinationProductionUnitID"
                    variant="outlined" style={{ margin: '10px', width: '100%' }}
                    value={event.destinationProductionUnitID} required
                    onChange={(event) => setEvent({ destinationProductionUnitID: event.target.value })}
                />
                <TextField label="transportationTypeID"
                    variant="outlined" style={{ margin: '10px', width: '100%' }}
                    value={event.transportationTypeID} required
                    onChange={(event) => setEvent({ transportationTypeID: event.target.value })}
                />
                <TextField label="isReturn"
                    variant="outlined" style={{ margin: '10px', width: '100%' }}
                    value={event.isReturn} required
                    onChange={(event) => setEvent({ isReturn: event.target.value })}
                />

                {/* <RadioGroup value={event.isReturn} row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                    <FormControlLabel value={true} control={<Radio />} label="True" />
                    <FormControlLabel value={false} control={<Radio />} label="False" />
                </RadioGroup> */}

            </Grid>
            <Grid item xs={12} sm={6}>
                <StyledDataPicker label="activityDate"
                    className='datepicker' format="DD/MM/YYYY"
                    value={event.activityDate}
                    onChange={(value) => setEvent({ activityDate: value })}
                />
                <TextField label="distance"
                    variant="outlined" style={{ margin: '10px', width: '100%' }}
                    value={event.distance} required
                    onChange={(event) => setEvent({ distance: event.target.value })}
                />
                <TextField label="cost"
                    variant="outlined" style={{ margin: '10px', width: '100%' }}
                    value={event.cost} required
                    onChange={(event) => setEvent({ cost: event.target.value })}
                />

            </Grid>
        </Fragment>
    )

    const level2Fields: JSX.Element = (
        <Fragment>
            <Grid item xs={12} sm={4}>
                {/* <TextField label="InputBatch"
                    variant="outlined" style={{ margin: '10px', width: '100%' }}
                    value={event.inputBatch} required
                    onChange={(event) => setEvent({ inputBatch: event.target.value })}
                /> */}
            </Grid>

            <Grid item xs={12} sm={4}>

            </Grid>

            <Grid item xs={12} sm={4}>
            </Grid>
        </Fragment>
    )




    return (
        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px' }} onSubmit={handleSubmit} ref={formRef}>
            <Grid container spacing={3}>
                {currentStep === 1 && level1Fields}
                {currentStep === 2 && level2Fields}


                <Grid item xs={12} display="flex" justifyContent="flex-end">
                    {currentStep === 1 &&
                        <Button variant="contained" color="primary" onClick={handleNextClick}>
                            {t('next')}
                        </Button>
                    }

                    {currentStep === 2 &&
                        <Fragment>
                            <Button variant="contained" color="primary" onClick={handlePreviousClick}>
                                {t('previous')}
                            </Button>
                            <Button variant="contained" color="primary" style={{ marginLeft: '10px' }} type="submit">
                                {t('submit')}
                            </Button>
                        </Fragment>
                    }
                </Grid>
            </Grid>


        </form >
    );
};
