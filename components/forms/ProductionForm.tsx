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

    const [inputBatches1, setInputBatches1] = useState({ key: '', quantity: 0 });
    const [inputBatches2, setInputBatches2] = useState({ key: '', quantity: 0 })
    const [batchComposition1, setbatchComposition1] = useState({ key: '', quantity: 0 })
    const [batchComposition2, setbatchComposition2] = useState({ key: '', quantity: 0 })

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
        inputBatches: {},
        batchComposition: {},
        quantity: '',
        finalScore: '',
        productionScore: '',
        ses: '',
    }
    )

    const { endpoints } = tableConfig['production']

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setEvent({
            inputBatches: {
                ...(inputBatches1.key !== "" ? { [inputBatches1.key]: inputBatches1.quantity } : {}),
                ...(inputBatches2.key !== "" ? { [inputBatches2.key]: inputBatches2.quantity } : {})
            },

            batchComposition: {
                ...(batchComposition1.key !== "" ? { [batchComposition1.key]: batchComposition1.quantity } : {}),
                ...(batchComposition2.key !== "" ? { [batchComposition2.key]: batchComposition2.quantity } : {})
            }
        })
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
                inputBatches: {},
                batchComposition: {},
                quantity: '',
                finalScore: '',
                productionScore: '',
                ses: '',
            })

            setInputBatches1({ key: '', quantity: 0 });
            setInputBatches2({ key: '', quantity: 0 });

            setbatchComposition1({ key: '', quantity: 0 });
            setbatchComposition2({ key: '', quantity: 0 });

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
        <Box onSubmit={handleSubmit} ref={formRef}
            component="form" noValidate autoComplete="off"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '40ch' },
            }}
        >
            <div>
                <TextField label="Production ID" variant="outlined"
                    value={event.productionID} required
                    onChange={(event) => setEvent({ productionID: event.target.value })}
                />

                <TextField label="Production Unit InternalID" variant="outlined"
                    value={event.productionUnitInternalID} required
                    onChange={(event) => setEvent({ productionUnitInternalID: event.target.value })}
                />

                <TextField label="productionType" variant="outlined"
                    value={event.productionType} select
                    onChange={(event) => setEvent({ productionType: event.target.value })}
                >
                    {productionTypes.map((item) => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                    ))}
                </TextField>

                <StyledDataPicker label="Activity Start Date"
                    className='datepicker' format="DD/MM/YYYY"
                    value={event.activityStartDate}
                    onChange={(value) => setEvent({ activityStartDate: value })}
                />

                <TextField label="Batch ID" variant="outlined"
                    value={event.batchID} required
                    onChange={(event) => setEvent({ batchID: event.target.value })}
                />


                <TextField label="batchType" variant="outlined"
                    value={event.batchType} select
                    onChange={(event) => setEvent({ batchType: event.target.value })}
                >
                    {batchTypes.map((item) => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                    ))}
                </TextField>

                <TextField label="Batch Internal ID" variant="outlined"
                    value={event.batchInternalID} required
                    onChange={(event) => setEvent({ batchInternalID: event.target.value })}
                />

                <TextField label="Supplier ID" variant="outlined"
                    value={event.supplierID} required
                    onChange={(event) => setEvent({ supplierID: event.target.value })}
                />

                <TextField label="quantity" variant="outlined"
                    value={event.quantity} required
                    onChange={(event) => setEvent({ quantity: event.target.value })}
                />

                <TextField label="finalScore" variant="outlined"
                    value={event.finalScore} required
                    onChange={(event) => setEvent({ finalScore: event.target.value })}
                />

                <TextField label="productionScore" variant="outlined"
                    value={event.productionScore} required
                    onChange={(event) => setEvent({ productionScore: event.target.value })}
                />

                <TextField label="ses" variant="outlined"
                    value={event.ses} required
                    onChange={(event) => setEvent({ ses: event.target.value })}
                />

            </div>

            <div>
                <TextField label="Batch Id"
                    variant="outlined"
                    value={inputBatches1.key} required
                    onChange={(event) => {
                        setInputBatches1({ key: event.target.value, quantity: 0 });
                    }}
                />
                <TextField label="Batch Quantity"
                    variant="outlined"
                    type='number'
                    value={inputBatches1.quantity || ""} required
                    onChange={(event) => {
                        setInputBatches1({ ...inputBatches1, quantity: parseInt(event.target.value) });
                    }}
                />
            </div>

            <div>
                <TextField label="Batch Id 2"
                    variant="outlined"
                    value={inputBatches2.key} required
                    onChange={(event) => {
                        setInputBatches2({ key: event.target.value, quantity: 0 });
                    }}
                />
                <TextField label="Batch Quantity 2"
                    variant="outlined"
                    type='number'
                    value={inputBatches2.quantity || ""} required
                    onChange={(event) => {
                        setInputBatches2({ ...inputBatches2, quantity: parseInt(event.target.value) });
                    }}
                />
            </div>


            <div>
                <TextField label="Composition Name"
                    variant="outlined"
                    value={batchComposition1.key} required
                    onChange={(event) => {
                        setbatchComposition1({ key: event.target.value, quantity: 0 });

                    }}
                />
                <TextField label="Composition Quantity"
                    variant="outlined"
                    value={batchComposition1.quantity || ""} required
                    onChange={(event) => {
                        setbatchComposition1({ ...batchComposition1, quantity: parseInt(event.target.value) })
                    }}
                />
            </div>

            <div>
                <TextField label="Composition Name 2"
                    variant="outlined"
                    value={batchComposition2.key} required
                    onChange={(event) => {
                        setbatchComposition2({ key: event.target.value, quantity: 0 });

                    }}
                />
                <TextField label="Composition Quantity 2"
                    variant="outlined"
                    value={batchComposition2.quantity || ""} required
                    onChange={(event) => {
                        setbatchComposition2({ ...batchComposition2, quantity: parseInt(event.target.value) })
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
