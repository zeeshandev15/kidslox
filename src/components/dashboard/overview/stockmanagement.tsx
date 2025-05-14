'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import { alpha, useTheme } from '@mui/material/styles';
import type { SxProps } from '@mui/material/styles';
import { ArrowClockwise as ArrowClockwiseIcon } from '@phosphor-icons/react/dist/ssr/ArrowClockwise';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import type { ApexOptions } from 'apexcharts';

import { Chart } from '@/components/core/chart';

export interface SalesProps {
  chartSeries: { name: string; data: any[] }[];
  sx?: SxProps;
  type?: 'bar' | 'line' | 'area' | 'radar' | 'pie' | 'donut';
}

export function StockManagement({ chartSeries, sx, type = 'bar' }: SalesProps): React.JSX.Element {
  const chartOptions = useChartOptions(type);

  return (
    <Card sx={sx}>
      <CardHeader
        action={
          <Button color="inherit" size="small" startIcon={<ArrowClockwiseIcon fontSize="var(--icon-fontSize-md)" />}>
            Sync
          </Button>
        }
        title="Monthly Adult Search"
      />
      <CardContent>
        <Chart height={350} options={chartOptions} series={chartSeries} type={type} width="100%" />
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button color="inherit" endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />} size="small">
          Overview
        </Button>
      </CardActions>
    </Card>
  );
}

function useChartOptions(type: string): ApexOptions {
  const theme = useTheme();

  const shared: ApexOptions = {
    chart: { background: 'transparent', stacked: false, toolbar: { show: false } },
    colors: [theme.palette.primary.main, theme.palette.secondary.main],
    dataLabels: { enabled: false },
    theme: { mode: theme.palette.mode },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: { offsetY: 5, style: { colors: theme.palette.text.secondary } },
      axisBorder: { show: true, color: theme.palette.divider },
      axisTicks: { show: true, color: theme.palette.divider },
    },
    yaxis: {
      labels: {
        formatter: (value) => `${value}`,
        offsetX: -10,
        style: { colors: theme.palette.text.secondary },
      },
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
  };

  switch (type) {
    case 'area':
      return {
        ...shared,
        stroke: { curve: 'smooth', width: 2 },
        fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.2 } },
      };
    case 'line':
      return {
        ...shared,
        stroke: { width: 3, curve: 'smooth' },
        markers: { size: 5 },
      };
    case 'radar':
      return {
        ...shared,
        chart: { ...shared.chart, type: 'radar' },
        stroke: { width: 2 },
        fill: { opacity: 0.1 },
      };
    case 'bar':
    default:
      return {
        ...shared,
        plotOptions: { bar: { columnWidth: '40px' } },
        fill: { opacity: 1, type: 'solid' },
        stroke: { show: true, width: 2, colors: ['transparent'] },
      };
  }
}
