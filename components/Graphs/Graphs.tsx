
import { MapNodeType, MapArcType } from 'interfaces/MapsCoordinates';
import { Fragment, useState, useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation'
import { parseISO, format } from 'date-fns';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

// @ts-ignore
import { Graph } from "react-d3-graph";
type MapProps = {
    markers: Array<MapNodeType>
    arcs: Array<MapArcType>,
    searchBatchClick: any
}

const Map = ({ markers, arcs, searchBatchClick }: MapProps) => {
    const size = useWindowSize();
    const { t, lang } = useTranslation('common')

    const [inputValue, setInputValue] = useState('');

    function useWindowSize() {
        // Initialize state with undefined width/height so server and client renders match
        // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
        const [windowSize, setWindowSize] = useState<{ width: any, height: any }>({
            width: undefined,
            height: undefined,
        });

        useEffect(() => {
            // only execute all the code below in client side
            // Handler to call on window resize
            function handleResize() {
                // Set window width/height to state
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }

            // Add event listener
            window.addEventListener("resize", handleResize);

            // Call handler right away so state gets updated with initial window size
            handleResize();

            // Remove event listener on cleanup
            return () => window.removeEventListener("resize", handleResize);
        }, []); // Empty array ensures that effect is only run on mount
        return windowSize;
    }

    // const [showBatches, setshowBatches]: Array<any> = useState([])
    const [selectedItem, setSelectedItem]: any = useState({ ID: '' })

    const [data, setData] = useState({ nodes: [], links: [] })


    function calculateSvg(docType: string): string {
        let svg = '';
        switch (docType) {
            case 'b':
                svg = '/batch.png'
                break;
            case 'rg':
                svg = "/registration.png"
                break;
            case 'rc':
                svg = "/reception.png"
                break;
            case 'p':
                svg = "/production.png"
                break;
            case 't':
                svg = "/transport.png"
                break;
            default:
                svg = ''
        }

        return svg
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

    useEffect(() => {
        if (markers.length) {
            const newNodes = markers.map((marker) => ({
                id: marker.ID,
                svg: calculateSvg(marker.docType)
            }));

            setData((prevData: any) => ({
                ...prevData,
                nodes: [...newNodes],
            }));
        }

    }, [markers])

    useEffect(() => {
        if (markers.length) {
            const newArcs = arcs
                // .filter(item => item.activityConnection === false)
                .map((arc) => ({
                    source: arc.initialNode,
                    target: arc.finalNode,
                    label: arc.ID,

                }));

            setData((prevData: any) => ({
                ...prevData,
                links: [...newArcs],
            }));
        }

    }, [arcs])

    const handleSearchClick = () => {
        searchBatchClick(inputValue)
    }


    // the graph configuration, just override the ones you need
    const myConfig = {
        width: size.width,
        height: size.height * 0.895,
        directed: true,
        nodeHighlightBehavior: true,
        node: {
            color: "lightgreen",
            size: 150,
            highlightStrokeColor: "blue",
        },
        link: {
            highlightColor: "lightblue",
        },
    };

    const onClickNode = function (nodeId: any) {
        if (selectedItem && nodeId === selectedItem.ID) {
            setSelectedItem(undefined);
        } else {
            const nodeObject = markers.find(node => node.ID === nodeId)
            setSelectedItem(nodeObject)
        }
    };

    return (
        <>
            {data.nodes.length === 0 ? <p>Loading...</p> :
                <Graph
                    id="graph-id"
                    data={data}
                    config={myConfig}
                    onClickNode={onClickNode}
                />
            }

            <div
                style={{
                    position: 'absolute',
                    top: '15vh',
                    right: '2vw',
                    display: 'flex',
                    alignItems: 'flex-end',
                    flexDirection: 'row',
                    zIndex: 10000,

                }}
            >
                <TextField
                    id="search-batch-tf"
                    label={t('batch')}
                    variant="standard"
                    style={{
                        width: '5rem', // Adjust the width as per your requirement
                        marginBottom: '0.5rem',
                        fontSize: '0.5rem',
                        marginRight: '1rem', // Increase the margin value for more spacing
                    }}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <Button
                    variant="outlined"
                    style={{
                        minWidth: '2rem',
                        height: '2.5rem',
                        fontSize: '0.8rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',

                    }}
                    onClick={() => searchBatchClick(inputValue)}
                >
                    {t('search')}
                </Button>
            </div>

            {selectedItem && selectedItem.ID &&
                <div
                    style={{
                        position: 'absolute',
                        top: '15vh',
                        left: '2vw',
                        padding: '10px',
                        backgroundColor: 'white',
                        border: '1px solid gray',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <h3><strong>{getTypeName(selectedItem.docType) + ': ' + selectedItem.ID}</strong></h3>

                    {selectedItem.mapInfo.input.length > 0 && <p style={{ margin: 0 }}><strong>{`${t('inputBatches')}:`}</strong> {selectedItem.mapInfo.input.join(', ')}</p>}
                    {selectedItem.mapInfo.output.length > 0 && <p style={{ margin: 0 }}><strong>{`${t('outputBatches')}:`}</strong> {selectedItem.mapInfo.output.join(', ')}</p>}

                    {selectedItem.activityDate && <p style={{ margin: 0 }}><strong>{`${t('activityDate')}:`}</strong> {parseDate(selectedItem.activityDate)}</p>}
                    {selectedItem.productionUnitID && <p style={{ margin: 0 }}><strong>{`${t('productionUnitID')}:`}</strong> {selectedItem.productionUnitID}</p>}

                    {selectedItem.distance && <p style={{ margin: 0 }}><strong>{`${t('distance')}:`}</strong> {selectedItem.distance}</p>}
                    {selectedItem.transportScore && <p style={{ margin: 0 }}><strong>{`${t('transportScore')}:`}</strong> {selectedItem.transportScore}</p>}
                    {selectedItem.ses && <p style={{ margin: 0 }}><strong>{`${t('ses')}:`}</strong> {selectedItem.ses}</p>}

                    {selectedItem.activityStartDate && <p style={{ margin: 0 }}><strong>{`${t('activityStartDate')}:`}</strong> {parseDate(selectedItem.activityStartDate)}</p>}
                    {selectedItem.activityEndDate && <p style={{ margin: 0 }}><strong>{`${t('activityEndDate')}:`}</strong> {parseDate(selectedItem.activityEndDate)}</p>}
                    {selectedItem.productionType && <p style={{ margin: 0 }}><strong>{`${t('productionType')}:`}</strong> {selectedItem.productionType}</p>}
                    {selectedItem.productionScore && <p style={{ margin: 0 }}><strong>{`${t('productionScore')}:`}</strong> {selectedItem.productionScore}</p>}

                    {selectedItem.originProductionUnitID && <p style={{ margin: 0 }}><strong>{`${t('originProductionUnitID')}:`}</strong> {selectedItem.originProductionUnitID}</p>}
                    {selectedItem.destinationProductionUnitID && <p style={{ margin: 0 }}><strong>{`${t('destinationProductionUnitID')}:`}</strong> {selectedItem.destinationProductionUnitID}</p>}
                    {selectedItem.transportationType && <p style={{ margin: 0 }}><strong>{`${t('transportationType')}:`}</strong> {selectedItem.transportationType}</p>}

                    {selectedItem.batchInternalID && <p style={{ margin: 0 }}><strong>{`${t('batchInternalID')}:`}</strong> {selectedItem.batchInternalID}</p>}
                    {selectedItem.batchType && <p style={{ margin: 0 }}><strong>{`${t('batchType')}:`}</strong> {selectedItem.batchType}</p>}
                    {selectedItem.finalScore && <p style={{ margin: 0 }}><strong>{`${t('finalScore')}:`}</strong> {selectedItem.finalScore}</p>}
                    {selectedItem.isInTransit && <p style={{ margin: 0 }}><strong>{`${t('isInTransit')}:`}</strong> {selectedItem.isInTransit}</p>}
                    {selectedItem.latestOwner && <p style={{ margin: 0 }}><strong>{`${t('latestOwner')}:`}</strong> {selectedItem.latestOwner}</p>}
                    {selectedItem.quantity && <p style={{ margin: 0 }}><strong>{`${t('quantity')}:`}</strong> {selectedItem.quantity}</p>}
                    {selectedItem.supplierID && <p style={{ margin: 0 }}><strong>{`${t('supplierID')}:`}</strong> {selectedItem.supplierID}</p>}
                    {selectedItem.batchComposition && <p style={{ margin: 0 }}><strong>{`${t('batchComposition')}:`}</strong> {JSON.stringify(selectedItem.batchComposition)}</p>}

                </div>
            }
        </>
    )
}

function parseDate(date: string): string {
    const parsedDate = parseISO(date);
    return format(parsedDate, 'dd/MM/yyyy HH:mm');
}

export default Map
