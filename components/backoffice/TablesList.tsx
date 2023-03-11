import { List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import Link from 'next/link'
import { tableConfig } from './tableStructure';

interface TableGridListProps {
    onChainRecords?: boolean;
}

export default function TableGridList({ onChainRecords = false }: TableGridListProps): JSX.Element {
    let list = []

    for (const tableName in tableConfig) {
        const item = tableConfig[tableName]
        console.log(onChainRecords, item.onChain)
        if (item.onChain === onChainRecords)
            list.push({ name: item.name, url: item.url })
    }


    return (
        <List>
            {list && list.map(item => {
                return (
                    <ListItem disablePadding key={item.name}>
                        <ListItemButton component={Link} href={item.url} >
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                )
            })}
        </List>
    );
}