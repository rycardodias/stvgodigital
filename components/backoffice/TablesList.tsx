import { List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import Link from 'next/link'
import { useState } from 'react';
import { tableConfig } from './tableStructure';
import useTranslation from 'next-translate/useTranslation';

interface TableGridListProps {
    onChainRecords?: boolean;
}

export default function TableGridList({ onChainRecords = false }: TableGridListProps): JSX.Element {
    const { t } = useTranslation('common')
    let list = []

    for (const tableName in tableConfig) {
        const item = tableConfig[tableName]
        if (item.onChain === onChainRecords)
            list.push({ name: item.name, url: item.url })
    }


    return (
        <List>
            {list && list.map(item => {
                return (
                    <ListItem disablePadding key={item.name}>
                        <ListItemButton component={Link} href={item.url} selected={item.url === window.location.pathname}>
                            <ListItemText primary={t(item.name)} />
                        </ListItemButton>
                    </ListItem>
                )
            })}
        </List >
    );
}