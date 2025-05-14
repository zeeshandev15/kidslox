'use client';

import React, { useCallback, useState } from 'react';
import dayjs from 'dayjs';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { deleteInventory, fetchInventory } from '@/redux/api/stocksApi';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { AllCommunityModule, ColDef, ICellRendererParams, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { toast } from 'react-toastify';

import { User, users } from '@/lib/data/user';

ModuleRegistry.registerModules([AllCommunityModule]);

interface Inventory {
  _id: string;
  id: string;
  name: string;
  image: string;
  location: string;
  joinedDate: string;
}

const ActionsCellRenderer: React.FC<any> = (props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick} size="small">
        <MoreVertIcon sx={{ color: 'white' }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{ sx: { backgroundColor: '#1e1e1e', color: 'white' } }}
      >
        <MenuItem onClick={() => console.log('del function')}>Delete</MenuItem>
      </Menu>
    </>
  );
};

const InventoryTable = () => {
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);

  const columnDefs: ColDef<User>[] = [
    {
      headerName: 'ID',
      field: 'id',
      sortable: true,
      headerClass: 'smoke-white-header',
      flex: 4,
    },
    {
      headerName: 'Name',
      field: 'name',
      sortable: true,
      headerClass: 'smoke-white-header',
      flex: 4,
    },
    {
      headerName: 'keywords',
      field: 'keywords',
      sortable: true,
      headerClass: 'smoke-white-header',
      flex: 4,
    },
    {
      headerName: 'Joined Date',
      field: 'joinedDate',
      sortable: true,
      valueFormatter: (params) => dayjs(params.value).format('MMM D, YYYY'),
      headerClass: 'smoke-white-header',
      flex: 2,
    },
    {
      headerName: '',
      width: 80,
      cellRenderer: (params: ICellRendererParams) => <ActionsCellRenderer {...params} />,
      menuTabs: [],
      sortable: false,
      headerClass: 'smoke-white-header',
      flex: 2,
    },
  ];

  const getRowHeight = useCallback((params: any) => {
    return params.data?.rowHeight || 70;
  }, []);

  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ['ID', 'Name', 'Keywords', 'Joined Date'];
    const tableRows: string[][] = [];

    const filteredData = users.filter((inv) => {
      const joined = dayjs(inv.joinedDate);
      if (startDate && joined.isBefore(startDate, 'day')) return false;
      if (endDate && joined.isAfter(endDate, 'day')) return false;
      return true;
    });

    filteredData.forEach((inv) => {
      const row: string[] = [inv.id, inv.name, inv.keywords, dayjs(inv.joinedDate).format('MMM D, YYYY')];
      tableRows.push(row);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
    });

    doc.save('inventory-report.pdf');
  };

  return (
    <>
      <Stack direction="row" spacing={3} sx={{ marginBottom: 4 }}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Search History</Typography>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Start Date" value={startDate} onChange={setStartDate} />
              <DatePicker label="End Date" value={endDate} onChange={setEndDate} />
            </LocalizationProvider>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />} onClick={exportPDF}>
              Export
            </Button>
          </Stack>
        </Stack>
      </Stack>

      <div className="p-6 bg-gray-900 text-white rounded-lg shadow-xl">
        <div className="ag-theme-alpine-dark rounded-lg shadow-lg">
          <AgGridReact
            rowData={users}
            columnDefs={columnDefs}
            defaultColDef={{
              flex: 1,
              filter: true,
              sortable: true,
            }}
            getRowHeight={getRowHeight}
            pagination={true}
            paginationPageSize={5}
            paginationPageSizeSelector={[100, 200, 400]}
            rowSelection="multiple"
          />
        </div>
      </div>
    </>
  );
};

export default InventoryTable;
