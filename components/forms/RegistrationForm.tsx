import React, { useState, useReducer, Fragment, useRef } from 'react';
import { TextField, Button, Grid, styled, Box, Select, MenuItem, Divider } from '@mui/material'
import useTranslation from 'next-translate/useTranslation'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import sendRequest from 'lib/requests';
import { tableConfig } from 'components/backoffice/tableStructure';
import { isTemplateExpression } from 'typescript';

export default function BasicForm() {
    const { t } = useTranslation('common')

    const formRef = useRef();

    const [batchComposition1, setbatchComposition1] = useState("")
    const [batchComposition2, setbatchComposition2] = useState("")


    const [event, setEvent] = useReducer((prev: any, next: any) => {
        const newEvent = { ...prev, ...next }

        // const newBatchComposition = batchCompositionList.reduce((acc, item) => {
        //     if (item.key !== '') {
        //         return { ...acc, [item.key]: item.value };
        //     }
        //     return acc;
        // }, {});

        // return { ...newEvent, batchComposition: { ...newBatchComposition } };

        return newEvent;
    }, {
        registrationID: '',
        ProductionUnitID: '',
        batchID: '',
        batchType: '',
        batchInternalID: '',
        supplierID: '',
        quantity: '',
        finalScore: '',
        batchComposition: {
        },
    })

    const { endpoints } = tableConfig['registration']

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const request = await sendRequest(endpoints.insertRecord, 'POST', event)

        if (request.error) {
            alert('Error inserting record')
        } else {
            setEvent({
                registrationID: '',
                ProductionUnitID: '',
                batchID: '',
                batchType: '',
                batchInternalID: '',
                supplierID: '',
                quantity: '',
                finalScore: '',
                batchComposition: {},
            })
        }
    };

    const batchTypes = [
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

    return (
        <Box onSubmit={handleSubmit} ref={formRef}
            component="form" noValidate autoComplete="off"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '40ch' },
            }}
        >
            <div>
                <TextField label="Registration ID"
                    variant="outlined"
                    value={event.registrationID} required
                    onChange={(event) => setEvent({ registrationID: event.target.value })}
                />
                <TextField label="Batch ID"
                    variant="outlined"
                    value={event.batchID} required
                    onChange={(event) => setEvent({ batchID: event.target.value })}
                />
                <TextField label="Batch Internal ID"
                    variant="outlined"
                    value={event.batchInternalID} required
                    onChange={(event) => setEvent({ batchInternalID: event.target.value })}
                />
                <TextField label="Quantity"
                    variant="outlined"
                    value={event.quantity} required
                    onChange={(event) => setEvent({ quantity: event.target.value })}
                />

                <TextField label="Production Unit ID"
                    variant="outlined"
                    value={event.ProductionUnitID} required
                    onChange={(event) => setEvent({ ProductionUnitID: event.target.value })}
                />

                <TextField label="batchType"
                    variant="outlined"
                    value={event.batchType} select
                    onChange={(event) => setEvent({ batchType: event.target.value })}
                >
                    {batchTypes.map((item) => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                    ))}
                </TextField>

                <TextField label="Supplier ID"
                    variant="outlined"
                    value={event.supplierID} required
                    onChange={(event) => setEvent({ supplierID: event.target.value })}
                />
                <TextField label="Final Score"
                    variant="outlined"
                    value={event.finalScore} required
                    onChange={(event) => setEvent({ finalScore: event.target.value })}
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
        // <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px' }} onSubmit={handleSubmit} ref={formRef}>
        //     <Grid container spacing={3}>
        //         <Fragment>
        //             <Grid item xs={12} sm={6}>
        //                 <TextField label="Registration ID"
        //                     variant="outlined" style={{ margin: '10px', width: '100%' }}
        //                     value={event.registrationID} required
        //                     onChange={(event) => setEvent({ registrationID: event.target.value })}
        //                 />
        //                 <TextField label="Batch ID"
        //                     variant="outlined" style={{ margin: '10px', width: '100%' }}
        //                     value={event.batchID} required
        //                     onChange={(event) => setEvent({ batchID: event.target.value })}
        //                 />
        //                 <TextField label="Batch Internal ID"
        //                     variant="outlined" style={{ margin: '10px', width: '100%' }}
        //                     value={event.batchInternalID} required
        //                     onChange={(event) => setEvent({ batchInternalID: event.target.value })}
        //                 />
        //                 <TextField label="Quantity"
        //                     variant="outlined" style={{ margin: '10px', width: '100%' }}
        //                     value={event.quantity} required
        //                     onChange={(event) => setEvent({ quantity: event.target.value })}
        //                 />

        //                 <TextField label="Composition Quantity"
        //                     variant="outlined" style={{ margin: '10px', width: '100%' }}
        //                     value={event.batchComposition['cotton']} required
        //                     onChange={(event) => setEvent({ batchComposition: { ...event.batchComposition, "cotton": event.target.value } })}
        //                 />


        //             </Grid>

        //             <Grid item xs={12} sm={6}>
        //                 <TextField label="Production Unit ID"
        //                     variant="outlined" style={{ margin: '10px', width: '100%' }}
        //                     value={event.ProductionUnitID} required
        //                     onChange={(event) => setEvent({ ProductionUnitID: event.target.value })}
        //                 />

        //                 <TextField label="batchType"
        //                     variant="outlined" style={{ margin: '10px', width: '100%' }}
        //                     value={event.batchType} select
        //                     onChange={(event) => setEvent({ batchType: event.target.value })}
        //                 >
        //                     {batchTypes.map((item) => (
        //                         <MenuItem key={item} value={item}>{item}</MenuItem>
        //                     ))}
        //                 </TextField>

        //                 <TextField label="Supplier ID"
        //                     variant="outlined" style={{ margin: '10px', width: '100%' }}
        //                     value={event.supplierID} required
        //                     onChange={(event) => setEvent({ supplierID: event.target.value })}
        //                 />
        //                 <TextField label="Final Score"
        //                     variant="outlined" style={{ margin: '10px', width: '100%' }}
        //                     value={event.finalScore} required
        //                     onChange={(event) => setEvent({ finalScore: event.target.value })}
        //                 />
        //             </Grid>
        //         </Fragment>


        //         <Grid item xs={12} display="flex" justifyContent="flex-end">
        //             <Button variant="contained" color="primary" style={{ marginLeft: '10px' }} type="submit">
        //                 {t('submit')}
        //             </Button>
        //         </Grid>
        //     </Grid>
        // </form >
    );
};
