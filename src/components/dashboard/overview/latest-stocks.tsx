'use client';

import * as React from 'react';
import Link from 'next/link';
import { fetchInventory } from '@/redux/api/stocksApi';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import type { SxProps } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import dayjs from 'dayjs';

import { users } from '@/lib/data/user';

export interface LatestOrdersProps {
  sx?: SxProps;
  autoset?: SxProps;
}

export function LatestOrders({ sx, autoset }: LatestOrdersProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardHeader title="Latest History" />
      <Divider />
      <Box sx={autoset}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Keywords</TableCell>
              <TableCell sortDirection="desc">Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((inventory: any, i: number) => {
              const isOnline = i % 2 === 0;

              return (
                <TableRow hover key={i}>
                  <TableCell>User-00{1 + i}</TableCell>
                  <TableCell>{inventory.name}</TableCell>
                  <TableCell>{dayjs(inventory.joinedDate).format('MMM D, YYYY')}</TableCell>
                  <TableCell>
                    <Chip
                      label={isOnline ? 'Online' : 'Offline'}
                      color={isOnline ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
    </Card>
  );
}
