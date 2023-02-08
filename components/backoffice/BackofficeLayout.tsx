import { DataGrid } from '@mui/x-data-grid';
import { Box, Grid } from '@mui/material'
import TableGridList from './TablesList';
import { Fragment, useState } from 'react';
import Button from '@mui/material/Button';

import useTranslation from 'next-translate/useTranslation'

type DataGridProps = {
    rows: Array<object>,
    columns: any[]
}

export default function DataGridComponent({ rows, columns }: DataGridProps) {
    const { t, lang } = useTranslation('common')

    const [selectedItems, setSelectedItems] = useState([])

    const Controls = () => {
        const Buttons = () => {
            return (
                <Fragment>
                    <Grid item xs={1}>
                        <Button variant="contained" color="success">{t('add')}</Button>
                    </Grid>
                    <Grid item xs={1}>
                        {selectedItems.length > 0 && selectedItems.length < 2 && <Button variant="contained" color="warning">{t('update')}</Button>}

                    </Grid>
                    <Grid item xs={1}>
                        {selectedItems.length > 0 && <Button variant="contained" color="error">{t('delete')}</Button>}
                    </Grid>
                </Fragment>
            )
        }

        return (
            <Grid container spacing={2}>
                <Grid item xs={9} />
                <Buttons />
            </Grid>
        )
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={2}>
                <TableGridList />
            </Grid>
            <Grid item xs={10}>
                <Controls />

                <div style={{ height: 500, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                        onSelectionModelChange={itm => setSelectedItems(itm)}
                    />

                </div>
            </Grid>
        </Grid>
    )
}