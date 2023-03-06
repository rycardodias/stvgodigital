// import {
//     DataGrid, GridRowId, GridRowModes, GridRowModesModel, GridActionsCellItem, GridEventListener, GridRowParams, MuiEvent,
//     GridToolbarContainer
// } from '@mui/x-data-grid';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/DeleteOutlined';
// import SaveIcon from '@mui/icons-material/Save';
// import CancelIcon from '@mui/icons-material/Close';
// import AddIcon from '@mui/icons-material/Add';


// import { Box, Grid } from '@mui/material'
// import TableGridList from './TablesList';
// import { Fragment, useState, useEffect } from 'react';
// import Button from '@mui/material/Button';
// import useSWR from 'swr'
// import useTranslation from 'next-translate/useTranslation'
// import { tableConfig } from './tableStructure';
// import sendRequest from 'lib/requests';

// type DataGridProps = {
//     tableName: string;
// }

// interface EditToolbarProps {
//     setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
//     setRowModesModel: (
//         newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
//     ) => void;
// }

// function EditToolbar(props: EditToolbarProps) {
//     const { setRows, setRowModesModel } = props;

//     const handleClick = () => {
//         const id = "sdasdas";
//         setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
//         setRowModesModel((oldModel) => ({
//             ...oldModel,
//             [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
//         }));
//     };

//     return (
//         <GridToolbarContainer>
//             <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
//                 Add record
//             </Button>
//         </GridToolbarContainer>
//     );
// }

// export default function DataGridComponent({ tableName }: DataGridProps) {
//     const { t, lang } = useTranslation('common')
//     let { columns, endpoints } = tableConfig[tableName]

//     const { data, error, mutate } = useSWR(endpoints.getAll, sendRequest)

//     useEffect(() => {
//         if (data) {
//             setRows(data.data)
//         }
//     }, [data])

//     const actionButtons =
//     {
//         field: 'actions',
//         type: 'actions',
//         headerName: 'Actions',
//         width: 100,
//         cellClassName: 'actions',
//         getActions: ({ id }: any) => {
//             const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
//             if (isInEditMode) {
//                 return [
//                     <GridActionsCellItem
//                         icon={< SaveIcon />}
//                         label="Save"
//                         onClick={handleSaveClick(id)}
//                     />,
//                     <GridActionsCellItem
//                         icon={
//                             <CancelIcon />}
//                         label="Cancel"
//                         className="textPrimary"
//                         onClick={handleCancelClick(id)}
//                         color="inherit"
//                     />,
//                 ];
//             }

//             return [
//                 <GridActionsCellItem
//                     icon={< EditIcon />}
//                     label="Edit"
//                     className="textPrimary"
//                     onClick={handleEditClick(id)}
//                     color="inherit"
//                 />,
//                 <GridActionsCellItem
//                     icon={< DeleteIcon />}
//                     label="Delete"
//                     onClick={handleDeleteClick(id)}
//                     color="inherit"
//                 />,
//             ];
//         },
//     }

//     useEffect(() => {
//         columns.push(actionButtons)
//     }, [columns])


//     // const [selectedItems, setSelectedItems] = useState([])

//     const handleDeleteRequest = (ids: string[]) => {
//         ids.forEach(id => {
//             sendRequest(endpoints.deleteRecord, 'DELETE', { id })
//                 .then(response => {
//                     let newData: string[] = data.data.filter((item: any) => item.id !== id)
//                     mutate({ data: newData }, false)
//                 })
//                 .catch((err) => console.log("error", err))
//         })
//     }

//     // const Controls = () => {
//     //     const Buttons = () => {
//     //         return (
//     //             <Fragment>
//     //                 <Grid item xs={1}>
//     //                     <Button variant="contained" color="success">{t('add')}</Button>
//     //                 </Grid>
//     //                 <Grid item xs={1}>
//     //                     {selectedItems.length > 0 && selectedItems.length < 2 && <Button variant="contained" color="warning">{t('update')}</Button>}

//     //                 </Grid>
//     //                 <Grid item xs={1}>
//     //                     {selectedItems.length > 0 && <Button variant="contained" color="error" onClick={() => handleDeleteRequest(selectedItems)}>{t('delete')}</Button>}
//     //                 </Grid>
//     //             </Fragment>
//     //         )
//     //     }

//     return (
//         <Grid container spacing={2}>
//             <Grid item xs={9} />
//             <Buttons />
//         </Grid>
//     )
// }

// const [rows, setRows] = useState([]);
// const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

// const handleRowEditStart = (
//     params: GridRowParams,
//     event: MuiEvent<React.SyntheticEvent>,
// ) => {
//     event.defaultMuiPrevented = true;
// };

// const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
//     event.defaultMuiPrevented = true;
// };

// const handleEditClick = (id: GridRowId) => () => {
//     setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
// };

// const handleSaveClick = (id: GridRowId) => () => {
//     setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
// };

// const handleDeleteClick = (id: GridRowId) => () => {
//     console.log(rows)
//     // setRows(rows.filter((row) => row.id !== id));
// };

// const handleCancelClick = (id: GridRowId) => () => {
//     setRowModesModel({
//         ...rowModesModel,
//         [id]: { mode: GridRowModes.View, ignoreModifications: true },
//     });

//     const editedRow = rows.find((row) => row.id === id);
//     if (editedRow!.isNew) {
//         setRows(rows.filter((row) => row.id !== id));
//     }
// };

// const processRowUpdate = (newRow: GridRowModel) => {
//     const updatedRow = { ...newRow, isNew: false };
//     setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
//     return updatedRow;
// };

// return (
//     <Grid container spacing={2} marginTop={0}>
//         <Grid item xs={2}>
//             <TableGridList />
//         </Grid>
//         <Grid item xs={10}>
//             {/* <Controls /> */}

//             {/* {error && <div>Failed to load</div>}
//                 {!data && <div>Loading...</div>} */}


//             {/* {data && */}
//             <div style={{ height: '80vh', width: '100%' }}>
//                 {/* <DataGrid
//                             rows={rows}
//                             columns={columns}
//                             pageSize={10}
//                             rowsPerPageOptions={[10]}
//                             editMode="row"
//                             rowModesModel={rowModesModel}
//                             onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
//                             onRowEditStart={handleRowEditStart}
//                             onRowEditStop={handleRowEditStop}
//                             processRowUpdate={processRowUpdate}
//                         // // checkboxSelection
//                         // onSelectionModelChange={itm => setSelectedItems(itm)}
//                         // onCellEditStop={(cell) => console.log(cell, "cellEditStop")}
//                         // onCellEditCommit={(cell) => console.log(cell, "onCellEditCommit")}
//                         /> */}
//                 {console.log(rows)}
//                 <DataGrid
//                     rows={rows}
//                     columns={columns}
//                     editMode="row"
//                     rowModesModel={rowModesModel}
//                     onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
//                     onRowEditStart={handleRowEditStart}
//                     onRowEditStop={handleRowEditStop}
//                     processRowUpdate={processRowUpdate}
//                     components={{
//                         Toolbar: EditToolbar,
//                     }}
//                     componentsProps={{
//                         toolbar: { setRows, setRowModesModel },
//                     }}
//                     experimentalFeatures={{ newEditingApi: true }}
//                 />
//             </div>
//             {/* } */}
//         </Grid>
//     </Grid>
// )
// }