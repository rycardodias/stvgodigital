import React, { ReactElement } from 'react'
import { Popup } from 'react-leaflet'
import useTranslation from 'next-translate/useTranslation'
import { parseISO, format } from 'date-fns';

export const MapPopupHandler = ({ item }: any) => {

    const { t, lang } = useTranslation('common')

    let PopupContent: ReactElement | undefined;

    switch (item.docType) {
        case 'b':
            PopupContent = handleBatchItem(item);
            break;
        case 'rg':
            PopupContent = handleRegistrationItem(item);
            break;
        case 'rc':
            PopupContent = handleReceptionItem(item);
            break;
        case 'p':
            PopupContent = handleProductionItem(item);
            break;
        case 't':
            PopupContent = handleTransportationItem(item);
            break;
        default:
        // name = ''
    }

    return (
        <>
            {PopupContent && PopupContent}
        </>
    );

    function handleBatchItem(item: any): ReactElement {
        return (
            <Popup>
                <p><strong>{getTypeName(item.docType)}:</strong> {item.ID}</p>
            </Popup>
        );
    }
    function handleRegistrationItem(item: any): ReactElement {
        return (
            <Popup>
                <p><strong>{getTypeName(item.docType)}:</strong> {item.ID}</p>
                <p style={{ margin: 0 }}><strong>{`${t('outputBatches')}:`}</strong> {item.mapInfo.output.join(', ')}</p>

                <p style={{ margin: 0 }}><strong>{`${t('activityDate')}:`}</strong> {parseDate(item.activityDate)}</p>
                <p style={{ margin: 0 }}><strong>{`${t('productionUnitID')}:`}</strong> {item.productionUnitID}</p>
            </Popup>
        );
    }

    function handleReceptionItem(item: any): ReactElement {
        return (
            <Popup>
                <p><strong>{getTypeName(item.docType)}:</strong> {item.ID}</p>
                <p style={{ margin: 0 }}><strong>{`${t('inputBatches')}:`}</strong> {item.mapInfo.input.join(', ')}</p>
                <p style={{ margin: 0 }}><strong>{`${t('outputBatches')}:`}</strong> {item.mapInfo.output.join(', ')}</p>

                <p style={{ margin: 0 }}><strong>{`${t('activityDate')}:`}</strong> {parseDate(item.activityDate)}</p>
                <p style={{ margin: 0 }}><strong>{`${t('productionUnitID')}:`}</strong> {item.productionUnitID}</p>
                <p style={{ margin: 0 }}><strong>{`${t('distance')}:`}</strong> {item.distance}</p>
                <p style={{ margin: 0 }}><strong>{`${t('transportScore')}:`}</strong> {item.transportScore}</p>
                <p style={{ margin: 0 }}><strong>{`${t('ses')}:`}</strong> {item.ses}</p>
            </Popup>
        );
    }

    function handleProductionItem(item: any): ReactElement {
        return (
            <Popup>
                <p><strong>{getTypeName(item.docType)}:</strong> {item.ID}</p>
                <p style={{ margin: 0 }}><strong>{`${t('inputBatches')}:`}</strong> {item.mapInfo.input.join(', ')}</p>
                <p style={{ margin: 0 }}><strong>{`${t('outputBatches')}:`}</strong> {item.mapInfo.output.join(', ')}</p>

                <p style={{ margin: 0 }}><strong>{`${t('productionUnitID')}:`}</strong> {item.productionUnitID}</p>
                <p style={{ margin: 0 }}><strong>{`${t('activityStartDate')}:`}</strong> {parseDate(item.activityStartDate)}</p>
                <p style={{ margin: 0 }}><strong>{`${t('activityEndDate')}:`}</strong> {parseDate(item.activityEndDate)}</p>
                <p style={{ margin: 0 }}><strong>{`${t('productionType')}:`}</strong> {item.productionType}</p>
                <p style={{ margin: 0 }}><strong>{`${t('productionScore')}:`}</strong> {item.productionScore}</p>
                <p style={{ margin: 0 }}><strong>{`${t('ses')}:`}</strong> {item.ses}</p>
            </Popup>
        );
    }

    function handleTransportationItem(item: any): ReactElement {
        return (
            <Popup>
                <p><strong>{getTypeName(item.docType)}:</strong> {item.ID}</p>
                <p style={{ margin: 0 }}><strong>{`${t('inputBatches')}:`}</strong> {item.mapInfo.input.join(', ')}</p>

                <p style={{ margin: 0 }}><strong>{`${t('originProductionUnitID')}:`}</strong> {item.originProductionUnitID}</p>
                <p style={{ margin: 0 }}><strong>{`${t('destinationProductionUnitID')}:`}</strong> {item.destinationProductionUnitID}</p>
                <p style={{ margin: 0 }}><strong>{`${t('transportationType')}:`}</strong> {item.transportationType}</p>
                <p style={{ margin: 0 }}><strong>{`${t('activityDate')}:`}</strong> {parseDate(item.activityDate)}</p>
            </Popup>
        );
    }

    function getTypeName(type: string): string {
        let name: string;
        switch (type) {
            case 'b':
                name = t('batch')
                break;
            case 'rg':
                name = t('registration')
                break;
            case 'rc':
                name = t('reception')
                break;
            case 'p':
                name = t('production')
                break;
            case 't':
                name = t('transportation')
                break;
            default:
                name = ''
        }
        return name
    }


};

function parseDate(date: string): string {
    const parsedDate = parseISO(date);
    return format(parsedDate, 'dd/MM/yyyy HH:mm');
}


