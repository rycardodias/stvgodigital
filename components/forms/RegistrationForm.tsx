import React, { useState, useReducer, useRef } from 'react';
import { TextField, Button, Box, MenuItem } from '@mui/material'
import useTranslation from 'next-translate/useTranslation'
import sendRequest from 'lib/requests';
import { tableConfig } from 'components/backoffice/tableStructure';

export default function BasicForm() {
    const { t } = useTranslation('common')

    const formRef = useRef();

    const [batchComposition1, setbatchComposition1] = useState({ key: '', quantity: 0 })
    const [batchComposition2, setbatchComposition2] = useState({ key: '', quantity: 0 })


    const [event, setEvent] = useReducer((prev: any, next: any) => {
        const newEvent = { ...prev, ...next }

        return newEvent;
    }, {
        registrationID: 'rg-',
        ProductionUnitID: '',
        batchID: 'b-',
        batchType: '',
        batchInternalID: 'b-',
        supplierID: '',
        quantity: '',
        batchComposition: {},
    })

    const { endpoints } = tableConfig['registration']

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setEvent({
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
                registrationID: 'rg-',
                ProductionUnitID: '',
                batchID: 'b-',
                batchType: '',
                batchInternalID: 'b-',
                supplierID: '',
                quantity: '',
                batchComposition: {},
            })

            setbatchComposition1({ key: '', quantity: 0 });
            setbatchComposition2({ key: '', quantity: 0 });

            alert(request.data)
        }
    };

    const batchTypes = [
        "CONVENTIONAL_COTTON",
        "ORGANIC_COTTON",
        "RECYCLED_COTTON",
        "PES",
        "PES_RPET",
        "POLYPROPYLENE",
        "POLYAMIDE_6",
        "POLYAMIDE_66",
        "PAN",
        "VISCOSE",
        "FLAX",
        "JUTE",
        "KENAF",
        "BAMBOO",
        "SILK",
        "WOOL",
        "ELASTANE",
        "YARN",
        "RAW_FABRIC",
        "DYED_FABRIC",
        "RAW_KNITTED_FABRIC",
        "DYED_KNITTED_FABRIC",
        "GARMENT"
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

                <TextField label="Production Unit"
                    variant="outlined"
                    value={event.ProductionUnitID} select
                    onChange={(event) => setEvent({ ProductionUnitID: event.target.value })}
                >
                    {['PU1', 'InovafilMSP:PU1', 'ASampaioMSP:PU1', 'TintexMSP:PU1', 'TMGMSP:PU1',].map((item) => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                    ))}
                </TextField>

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
