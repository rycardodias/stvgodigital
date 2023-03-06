import { List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import Link from 'next/link'
import { tableConfig } from './tableStructure';

export default function TableGridList() {
    let list = []

    for (const tableName in tableConfig) {
        const item = tableConfig[tableName]

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