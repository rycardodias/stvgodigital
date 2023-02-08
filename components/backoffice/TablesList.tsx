import { List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import Link from 'next/link'

export default function TableGridList() {
    let list = [
        { name: "Companies", url: "/backoffice/companies" },
    ]

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