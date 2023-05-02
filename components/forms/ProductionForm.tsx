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

    const [inputBatches1, setInputBatches1] = useState("")
    const [inputBatches2, setInputBatches2] = useState("")
    const [batchComposition1, setbatchComposition1] = useState("")
    const [batchComposition2, setbatchComposition2] = useState("")

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

    var units = ["KG", "L", "M", "M2"];

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

                <TextField label="Unit" variant="outlined"
                    value={event.unit} select
                    onChange={(event) => setEvent({ unit: event.target.value })}
                >
                    {units.map((item) => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                    ))}
                </TextField>


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
                    required
                    onChange={(event) => {
                        setInputBatches1(event.target.value);

                        setEvent({
                            inputBatches: {
                                ...event.inputBatches, [event.target.value]: '',
                            }
                        })
                    }}
                />
                <TextField label="Batch Quantity"
                    variant="outlined"
                    value={event.inputBatches[inputBatches1]} required
                    onChange={(event) => {
                        setEvent({
                            batchComposition: {
                                ...event.inputBatches, [inputBatches1]: event.target.value,
                            }
                        })
                    }}
                />
            </div>

            <div>
                <TextField label="Batch Id 2"
                    variant="outlined"
                    required
                    onChange={(event) => {
                        setInputBatches2(event.target.value);

                        setEvent({
                            inputBatches: {
                                ...event.inputBatches, [event.target.value]: '',
                            }
                        })
                    }}
                />
                <TextField label="Batch Quantity 2"
                    variant="outlined"
                    value={event.inputBatches[inputBatches2]} required
                    onChange={(event) => {
                        setEvent({
                            batchComposition: {
                                ...event.inputBatches, [inputBatches2]: event.target.value,
                            }
                        })
                    }}
                />
            </div>



            <div>
                <TextField label="Composition Name"
                    variant="outlined"
                    required
                    onChange={(event) => {
                        setbatchComposition1(event.target.value);

                        setEvent({
                            batchComposition: {
                                ...event.batchComposition, [event.target.value]: '',
                            }
                        })
                    }}
                />
                <TextField label="Composition Quantity"
                    variant="outlined"
                    value={event.batchComposition[batchComposition1]} required
                    onChange={(event) => {
                        setEvent({
                            batchComposition: {
                                ...event.batchComposition, [batchComposition1]: event.target.value,
                            }
                        })
                    }}
                />
            </div>

            <div>
                <TextField label="Composition Name 2"
                    variant="outlined"
                    required
                    onChange={(event) => {
                        setbatchComposition2(event.target.value);

                        setEvent({
                            batchComposition: {
                                ...event.batchComposition, [event.target.value]: '',
                            }
                        })
                    }}
                />
                <TextField label="Composition Quantity 2"
                    variant="outlined"
                    value={event.batchComposition[batchComposition2]} required
                    onChange={(event) => {
                        setEvent({
                            batchComposition: {
                                ...event.batchComposition, [batchComposition2]: event.target.value,
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
