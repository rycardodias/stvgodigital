import * as React from 'react';
import { Fragment, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { Box, Grid } from '@mui/material'
import TableGridList from './TablesList';
import { tableConfig } from './tableStructure';
import useSWR from 'swr'

import sendRequest from 'lib/requests';
import useTranslation from 'next-translate/useTranslation'

import {
    GridRowsProp,
    GridRowModesModel,
    GridRowModes,
    DataGrid,
    GridColumns,
    GridRowParams,
    MuiEvent,
    GridToolbarContainer,
    GridActionsCellItem,
    GridEventListener,
    GridRowId,
    GridRowModel,
} from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';

interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
        newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
}



type DataGridProps = {
    tableName: string;
}

export default function DataGridComponent({ tableName }: DataGridProps) {
    const { t, lang } = useTranslation('common')

    let { columns, endpoints } = tableConfig[tableName]
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

    const { data, error, mutate } = useSWR(endpoints.getAll, sendRequest)

    useEffect(() => {
        if (data && !data.error)
            setRows(data.data)
    }, [data])


    function EditToolbar(props: EditToolbarProps) {
        const { setRows, setRowModesModel } = props;

        const handleClick = () => {
            const id = uuidv4()
            setRows((oldRows) => [...oldRows, { id, isNew: true }]);
            setRowModesModel((oldModel) => ({
                ...oldModel,
                [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
            }));
        };

        return (
            <GridToolbarContainer>
                <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                    {t('addRecord')}
                </Button>
            </GridToolbarContainer>
        );
    }

    const handleDeleteRequest = (id: string) => {
        sendRequest(endpoints.deleteRecord, 'DELETE', { id })
            .then(response => {
                let newData: string[] = data.data.filter((item: any) => id !== id)
                // mutate({ data: newData }, false)
            })
            .catch((err) => console.log("error", err))
    }


    const handleRowEditStart = (
        params: GridRowParams,
        event: MuiEvent<React.SyntheticEvent>,
    ) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        setRows(rows.filter((row) => row.id !== id));
        handleDeleteRequest(id.toString())
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

        if (newRow.isNew) {
            sendRequest(endpoints.insertRecord,
                'POST',
                newRow)
        }


        return updatedRow;
    };


    const columnsGrid: GridColumns = [
        ...columns,
        {
            field: 'actions',
            type: 'actions',
            headerName: t('actions'),
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];
    return (
        <Grid container spacing={2} marginTop={0}>
            <Grid item xs={2}>
                <TableGridList />
            </Grid>
            <Grid item xs={10}>
                <div style={{ height: '90vh', width: '100%' }}>
                    {<DataGrid
                        rows={rows}
                        columns={columnsGrid}
                        editMode="row"
                        rowModesModel={rowModesModel}
                        onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
                        onRowEditStart={handleRowEditStart}
                        onRowEditStop={handleRowEditStop}
                        processRowUpdate={processRowUpdate}
                        components={{
                            Toolbar: EditToolbar,
                        }}
                        componentsProps={{
                            toolbar: { setRows, setRowModesModel },
                        }}
                        experimentalFeatures={{ newEditingApi: true }}
                    />
                    }
                </div>
            </Grid>
        </Grid >
    );
}