import * as React from 'react';
import { useState, useEffect } from 'react';
import { Grid } from '@mui/material'
import TableGridList from '../backoffice/TablesList';
import { tableConfig } from '../backoffice/tableStructure';
import useSWR from 'swr'

import sendRequest from 'lib/requests';
import useTranslation from 'next-translate/useTranslation'

import {
    DataGrid,
} from '@mui/x-data-grid';


type DataGridProps = {
    tableName: string;
}

export default function ListLayout({ tableName }: DataGridProps) {
    const { t, lang } = useTranslation('common')

    let { columns, endpoints, name } = tableConfig[tableName]
    const [rows, setRows] = useState([]);

    const { data, error, mutate } = useSWR(endpoints.getAll, sendRequest)

    useEffect(() => {
        if (data && !data.error)
            setRows(data.data)
    }, [data])

    return (
        <Grid container spacing={2} marginTop={0}>
            <Grid item xs={2}>
                <TableGridList onChainRecords />
            </Grid>
            <Grid item xs={10}>
                <div style={{ height: '90vh', width: '100%' }}>
                    {<DataGrid
                        rows={rows}
                        columns={columns}
                    />
                    }
                </div>
            </Grid>
        </Grid >
    );
}