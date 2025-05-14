'use client';

import * as React from 'react';
import AppsIcon from '@mui/icons-material/Apps';
import GoogleIcon from '@mui/icons-material/Google';
import SearchIcon from '@mui/icons-material/Search';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Grid from '@mui/material/Unstable_Grid2';
import dayjs from 'dayjs';

import { users } from '@/lib/data/user';
import { StockCheckout } from '@/components/dashboard/overview/budget';
import { LatestOrders } from '@/components/dashboard/overview/latest-stocks';
import { StockManagement } from '@/components/dashboard/overview/stockmanagement';
import { Traffic } from '@/components/dashboard/overview/traffic';

export default function Page(): React.JSX.Element {
  const stockOut = users.filter((prod) => prod.status === 'delivered');
  const stockIn = users.filter((prod) => prod.status === 'pending');

  // ✅ Monthly chart logic (current year)
  const stockInData = Array(12).fill(0);
  const stockOutData = Array(12).fill(0);
  const currentYear = new Date().getFullYear();

  users.forEach((item) => {
    const date = dayjs(item.createdAt);
    if (date.year() === currentYear) {
      const monthIndex = date.month();

      if (item.status === 'pending') {
        stockInData[monthIndex] += 1;
      }

      if (item.status === 'delivered') {
        stockOutData[monthIndex] += 1;
      }
    }
  });

  const chartSeries = [
    { name: 'This Year', data: stockInData },
    { name: 'Last Year', data: stockOutData },
  ];

  return (
    <Grid container spacing={3}>
      <Grid lg={3} sm={6} xs={12}>
        <StockCheckout
          diff={12}
          trend="up"
          sx={{ height: '100%' }}
          value={`${users.length}`}
          title="Total Search History"
          icon={<SearchIcon fontSize="large" />}
        />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <StockCheckout
          diff={12}
          trend="up"
          sx={{ height: '100%' }}
          value={`${stockIn.length}`}
          title="YouTube History"
          icon={<YouTubeIcon fontSize="large" style={{ color: 'white' }} />}
        />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <StockCheckout
          diff={12}
          trend="up"
          sx={{ height: '100%' }}
          value={`${stockOut.length}`}
          title="Google History"
          icon={<GoogleIcon fontSize="large" style={{ color: 'white' }} />}
        />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <StockCheckout
          diff={12}
          trend="up"
          sx={{ height: '100%' }}
          value="$24k"
          title="Installed Apps"
          icon={<AppsIcon fontSize="large" />}
        />
      </Grid>
      <Grid lg={8} xs={12}>
        <StockManagement chartSeries={chartSeries} sx={{ height: '100%' }} type="line" />
      </Grid>
      <Grid lg={4} md={6} xs={12}>
        <Traffic
          chartSeries={[stockIn.length, stockOut.length]}
          labels={['Laptop', 'Mobile']}
          sx={{ height: '100%' }}
          type="radialBar"
        />
      </Grid>

      <Grid lg={12} md={12} xs={12}>
        <LatestOrders sx={{ height: '100%' }} />
      </Grid>
    </Grid>
  );
}
