import { GridColDef } from '@mui/x-data-grid';

interface TableEndpoints {
    getAll: string;
    deleteRecord: string;
    updateRecord: string;
    insertRecord: string;
}

interface TableConfig {
    [tableName: string]: {
        onChain: boolean;
        name: string;
        url: string;
        columns: GridColDef[];
        endpoints: TableEndpoints;
    };
}

export const tableConfig: TableConfig = {
    activityTypeData: {
        onChain: false,
        name: 'activityTypeData',
        url: "/backoffice/activityTypeData",
        columns:
            [
                { field: 'id', headerName: 'id', width: 300 },
                { field: 'mandatory', headerName: 'mandatory', flex: 1, editable: true, type: 'number', },
                { field: 'ActivityTypeId', headerName: 'ActivityTypeId', flex: 1, editable: true, }, // TODO: tem de ir buscar lista
                { field: 'DataId', headerName: 'DataId', flex: 1, editable: true, },
            ],
        endpoints: {
            getAll: '/activityTypeData',
            deleteRecord: '/activityTypeData/delete',
            updateRecord: '/activityTypeData/update',
            insertRecord: '/activityTypeData/insert',
        }
    },
    // activityTypeIndicator: {
    //     onChain: false,
    //     name: "Activity Type Indicator",
    //     url: "/backoffice/activityTypeIndicator",
    //     columns:
    //         [
    //             { field: 'id', headerName: 'id', width: 300 },
    //             { field: 'ActivityTypeId', headerName: 'ActivityTypeId', flex: 1, editable: true, },
    //             { field: 'IndicatorId', headerName: 'IndicatorId', flex: 1, editable: true, },
    //         ],
    //     endpoints: {
    //         getAll: '/activityTypeIndicators',
    //         deleteRecord: '/activityTypeIndicators/delete',
    //         updateRecord: '/activityTypeIndicators/update',
    //         insertRecord: '/activityTypeIndicators/insert',
    //     }
    // },
    batchCertification: {
        onChain: false,
        name: "batchCertification",
        url: "/backoffice/batchCertification",
        columns:
            [
                { field: 'id', headerName: 'id', width: 300 },
                { field: 'issueDate', headerName: 'issueDate', flex: 1, editable: true, },
                { field: 'expirationDate', headerName: 'expirationDate', flex: 1, editable: true, },
                { field: 'BatchId', headerName: 'BatchId', flex: 1, editable: true, },
                { field: 'BatchCertificationTypeId', headerName: 'BatchCertificationTypeId', flex: 1, editable: true, },
                { field: 'CertifyingEntityId', headerName: 'CertifyingEntityId', flex: 1, editable: true, },
            ],
        endpoints: {
            getAll: '/batchCertifications',
            deleteRecord: '/batchCertifications/delete',
            updateRecord: '/batchCertifications/update',
            insertRecord: '/batchCertifications/insert',
        }
    },
    // batchCertificationType: {
    //     onChain: false,
    //     name: "Batch Certification Types",
    //     url: "/backoffice/batchCertificationType",
    //     columns:
    //         [
    //             { field: 'id', headerName: 'id', width: 300 },
    //             { field: 'name', headerName: 'name', flex: 1, editable: true },
    //             { field: 'description', headerName: 'description', flex: 1, editable: true },
    //         ],
    //     endpoints: {
    //         getAll: '/batchCertificationTypes',
    //         deleteRecord: '/batchCertificationTypes/delete',
    //         updateRecord: '/batchCertificationTypes/update',
    //         insertRecord: '/batchCertificationTypes/insert',
    //     }
    // },
    certifyingEntity: {
        onChain: false,
        name: "certifyingEntity",
        url: "/backoffice/certifyingEntity",
        columns:
            [
                { field: 'id', headerName: 'id', width: 300 },
                { field: 'name', headerName: 'name', flex: 1, editable: true },
                { field: 'description', headerName: 'description', flex: 1, editable: true },
                // { field: 'fiscalNumber', headerName: 'fiscalNumber', editable: true, type: 'number', width: 120 },
                // { field: 'caeType', headerName: 'caeType', flex: 1, editable: true, },
            ],
        endpoints: {
            getAll: '/certifyingEntities',
            deleteRecord: '/certifyingEntities/delete',
            updateRecord: '/certifyingEntities/update',
            insertRecord: '/certifyingEntities/insert',
        }
    },
    circularEnvironmentalData: {
        onChain: false,
        name: "circularEnvironmentalData",
        url: "/backoffice/circularEnvironmentalData",
        columns:
            [
                { field: 'id', headerName: 'id', width: 300 },
                { field: 'value', headerName: 'value', flex: 1, editable: true },
                { field: 'formulaValue', headerName: 'formulaValue', flex: 1, editable: true },
                { field: 'ProductionActivityId', headerName: 'ProductionActivityId', flex: 1, editable: true },
                { field: 'IndicatorId', headerName: 'IndicatorId', flex: 1, editable: true },
            ],
        endpoints: {
            getAll: '/circularEnvironmentalData',
            deleteRecord: '/circularEnvironmentalData/delete',
            updateRecord: '/circularEnvironmentalData/update',
            insertRecord: '/circularEnvironmentalData/insert',
        }
    },
    circularEnvironmentalFinalData: {
        onChain: false,
        name: "circularEnvironmentalFinalData",
        url: "/backoffice/circularEnvironmentalFinalData",
        columns:
            [
                { field: 'id', headerName: 'id', width: 300 },
                { field: 'value', headerName: 'value', flex: 1, editable: true },
                { field: 'FinalIndicatorId', headerName: 'FinalIndicatorId', flex: 1, editable: true },
            ],
        endpoints: {
            getAll: '/circularEnvironmentalFinalData',
            deleteRecord: '/circularEnvironmentalFinalData/delete',
            updateRecord: '/circularEnvironmentalFinalData/update',
            insertRecord: '/circularEnvironmentalFinalData/insert',
        }
    },
    companies: {
        onChain: false,
        name: "companies",
        url: "/backoffice/companies",
        columns:
            [
                { field: 'id', headerName: 'id', width: 300 },
                { field: 'legalName', headerName: 'legalName', flex: 1, editable: true },
                { field: 'shortName', headerName: 'shortName', flex: 1, editable: true },
                { field: 'fiscalNumber', headerName: 'fiscalNumber', editable: true, type: 'number', width: 120 },
                { field: 'caeType', headerName: 'caeType', flex: 1, editable: true, },
            ],
        endpoints: {
            getAll: '/companies',
            deleteRecord: '/companies/delete',
            updateRecord: '/companies/update',
            insertRecord: '/companies/insert',
        }
    },
    // companyCertification: {
    //     onChain: false,
    //     name: "Companies Certifications",
    //     url: "/backoffice/companyCertification",
    //     columns:
    //         [
    //             { field: 'id', headerName: 'id', width: 300 },
    //             { field: 'issueDate', headerName: 'issueDate', flex: 1, editable: true },
    //             { field: 'expirationDate', headerName: 'expirationDate', flex: 1, editable: true },
    //             { field: 'CompanyId', headerName: 'CompanyId', flex: 1, editable: true },
    //             { field: 'CompanyCertificationTypeId', headerName: 'CompanyCertificationTypeId', flex: 1, editable: true },
    //             { field: 'CertifyingEntityId', headerName: 'CertifyingEntityId', flex: 1, editable: true },
    //         ],
    //     endpoints: {
    //         getAll: '/companyCertifications',
    //         deleteRecord: '/companyCertifications/delete',
    //         updateRecord: '/companyCertifications/update',
    //         insertRecord: '/companyCertifications/insert',
    //     }
    // },
    // companyCertificationType: {
    //     onChain: false,
    //     name: "Company Certification Type",
    //     url: "/backoffice/companyCertificationType",
    //     columns:
    //         [
    //             { field: 'id', headerName: 'id', width: 300 },
    //             { field: 'name', headerName: 'name', flex: 1, editable: true },
    //             { field: 'description', headerName: 'description', flex: 1, editable: true },
    //             { field: 'logo', headerName: 'logo', flex: 1, editable: true, },
    //         ],
    //     endpoints: {
    //         getAll: '/companyCertificationTypes',
    //         deleteRecord: '/companyCertificationTypes/delete',
    //         updateRecord: '/companyCertificationTypes/update',
    //         insertRecord: '/companyCertificationTypes/insert',
    //     }
    // },
    // data: {
    //     onChain: false,
    //     name: "Data",
    //     url: "/backoffice/data",
    //     columns:
    //         [
    //             { field: 'id', headerName: 'id', width: 300 },
    //             { field: 'textContentId', headerName: 'textContentId', flex: 1, editable: true },
    //             { field: 'data', headerName: 'data', flex: 1, editable: true },
    //             { field: 'unity', headerName: 'unity', flex: 1, editable: true, },
    //             { field: 'description', headerName: 'description', flex: 1, editable: true, },
    //             { field: 'group', headerName: 'group', flex: 1, editable: true, },
    //             { field: 'master', headerName: 'master', flex: 1, editable: true, },
    //             { field: 'formulaCode', headerName: 'formulaCode', flex: 1, editable: true, },
    //         ],
    //     endpoints: {
    //         getAll: '/data',
    //         deleteRecord: '/data/delete',
    //         updateRecord: '/data/update',
    //         insertRecord: '/data/insert',
    //     }
    // },
    finalIndicator: {
        onChain: false,
        name: "finalIndicator",
        url: "/backoffice/finalIndicator",
        columns:
            [
                { field: 'id', headerName: 'id', width: 300 },
                { field: 'name', headerName: 'name', flex: 1, editable: true },
            ],
        endpoints: {
            getAll: '/finalIndicators',
            deleteRecord: '/finalIndicators/delete',
            updateRecord: '/finalIndicators/update',
            insertRecord: '/finalIndicators/insert',
        }
    },
    indicator: {
        onChain: false,
        name: "indicator",
        url: "/backoffice/indicator",
        columns:
            [
                { field: 'id', headerName: 'id', width: 300 },
                { field: 'name', headerName: 'name', flex: 1, editable: true },
                { field: 'minInterval', headerName: 'minInterval', flex: 1, editable: true },
                { field: 'maxInterval', headerName: 'maxInterval', flex: 1, editable: true },
                { field: 'penalty', headerName: 'penalty', flex: 1, editable: true },
                { field: 'goal', headerName: 'goal', flex: 1, editable: true },
                { field: 'formula', headerName: 'formula', flex: 1, editable: true },
                { field: 'FinalIndicatorId', headerName: 'FinalIndicatorId', flex: 1, editable: true },
            ],
        endpoints: {
            getAll: '/indicators',
            deleteRecord: '/indicators/delete',
            updateRecord: '/indicators/update',
            insertRecord: '/indicators/insert',
        }
    },
    productionActivityData: {
        onChain: false,
        name: "productionActivityData",
        url: "/backoffice/productionActivityData",
        columns:
            [
                { field: 'id', headerName: 'id', width: 300 },
                { field: 'value', headerName: 'value', flex: 1, editable: true },
                { field: 'ProductionActivityId', headerName: 'ProductionActivityId', flex: 1, editable: true },
                { field: 'DataId', headerName: 'DataId', flex: 1, editable: true },
            ],
        endpoints: {
            getAll: '/productionActivityData',
            deleteRecord: '/productionActivityData/delete',
            updateRecord: '/productionActivityData/update',
            insertRecord: '/productionActivityData/insert',
        }
    },
    productionUnit: {
        onChain: false,
        name: "productionUnit",
        url: "/backoffice/productionUnit",
        columns:
            [
                { field: 'id', headerName: 'id', width: 300 },
                { field: 'localization', headerName: 'localization', flex: 1, editable: true },
                { field: 'CompanyId', headerName: 'CompanyId', flex: 1, editable: true },
            ],
        endpoints: {
            getAll: '/productionUnits',
            deleteRecord: '/productionUnits/delete',
            updateRecord: '/productionUnits/update',
            insertRecord: '/productionUnits/insert',
        }
    },
    // rawMaterial: {
    //     onChain: false,
    //     name: "Raw Material",
    //     url: "/backoffice/rawMaterial",
    //     columns:
    //         [
    //             { field: 'id', headerName: 'id', width: 300 },
    //             { field: 'textContentId', headerName: 'textContentId', flex: 1, editable: true },
    //             { field: 'fiberName', headerName: 'fiberName', flex: 1, editable: true },
    //             { field: 'climateChange', headerName: 'climateChange', flex: 1, editable: true },
    //             { field: 'fossilDepletion', headerName: 'fossilDepletion', flex: 1, editable: true },
    //             { field: 'freshwatterConsunsuption', headerName: 'freshwatterConsunsuption', flex: 1, editable: true },
    //             { field: 'freshwatterEutrophication', headerName: 'freshwatterEutrophication', flex: 1, editable: true },
    //         ],
    //     endpoints: {
    //         getAll: '/rawMaterials',
    //         deleteRecord: '/rawMaterials/delete',
    //         updateRecord: '/rawMaterials/update',
    //         insertRecord: '/rawMaterials/insert',
    //     }
    // },
    socialEconomicData: {
        onChain: false,
        name: "socialEconomicData",
        url: "/backoffice/socialEconomicData",
        columns:
            [
                { field: 'id', headerName: 'id', width: 300 },
                { field: 'localization', headerName: 'localization', flex: 1, editable: true },
                { field: 'CompanyId', headerName: 'CompanyId', flex: 1, editable: true },
            ],
        endpoints: {
            getAll: '/socialEconomicData',
            deleteRecord: '/socialEconomicData/delete',
            updateRecord: '/socialEconomicData/update',
            insertRecord: '/socialEconomicData/insert',
        }
    },
    user: {
        onChain: false,
        name: "users",
        url: "/backoffice/user",
        columns:
            [
                { field: 'id', headerName: 'id', width: 300 },
                { field: 'email', headerName: 'email', flex: 1, editable: true },
                { field: 'name', headerName: 'name', flex: 1, editable: true },
                { field: 'permission', headerName: 'permission', flex: 1, editable: true },
            ],
        endpoints: {
            getAll: '/users',
            deleteRecord: '/users/delete',
            updateRecord: '/users/update',
            insertRecord: '/users/insert',
        }
    },
    registration: {
        onChain: true,
        name: "registration",
        url: "/activities/registration",
        columns:
            [

            ],
        endpoints: {
            getAll: '/onchain/channel/activities/logistical/registration',
            deleteRecord: '',
            updateRecord: '',
            insertRecord: '/onchain/channel/activities/logistical/registration/insert',
        }
    },
    reception: {
        onChain: true,
        name: "reception",
        url: "/activities/reception",
        columns:
            [

            ],
        endpoints: {
            getAll: '/onchain/channel/activities/logistical/reception',
            deleteRecord: '',
            updateRecord: '',
            insertRecord: '/onchain/channel/activities/logistical/reception/insert',
        }
    },
    transportation: {
        onChain: true,
        name: "transportation",
        url: "/activities/transportation",
        columns:
            [

            ],
        endpoints: {
            getAll: '/onchain/channel/activities/logistical/transportation',
            deleteRecord: '',
            updateRecord: '',
            insertRecord: '/onchain/channel/activities/logistical/transportation/insert',
        }
    },
    production: {
        onChain: true,
        name: "production",
        url: "/activities/production",
        columns:
            [
                { field: 'productionID', headerName: 'productionID' },
                { field: 'companyID', headerName: 'companyID' },
                { field: 'productionTypeID', headerName: 'productionTypeID' },
                { field: 'activityStartDate', headerName: 'activityStartDate' },
                { field: 'activityEndDate', headerName: 'activityEndDate' },
                { field: 'activityEndDate', headerName: 'activityEndDate' },
                { field: 'ecs', headerName: 'ecs' },
                { field: 'ses', headerName: 'ses' },
            ],
        endpoints: {
            getAll: '/onchain/channel/activities/production',
            deleteRecord: '',
            updateRecord: '',
            insertRecord: '/onchain/channel/activities/production/insert',
        }
    },
}
