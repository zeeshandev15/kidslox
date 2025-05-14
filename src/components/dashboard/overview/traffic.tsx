'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { Desktop as DesktopIcon } from '@phosphor-icons/react/dist/ssr/Desktop';
import { DeviceTablet as DeviceTabletIcon } from '@phosphor-icons/react/dist/ssr/DeviceTablet';
import { Phone as PhoneIcon } from '@phosphor-icons/react/dist/ssr/Phone';
import type { ApexOptions } from 'apexcharts';

import { Chart } from '@/components/core/chart';

const iconMapping = { Desktop: DesktopIcon, Tablet: DeviceTabletIcon, Phone: PhoneIcon } as Record<string, Icon>;

export interface TrafficProps {
  chartSeries: number[];
  labels: string[];
  sx?: SxProps;
  type?: 'donut' | 'pie' | 'radialBar'; // Extendable for more ApexChart types
}

export function Traffic({ chartSeries, labels, sx, type = 'donut' }: TrafficProps): React.JSX.Element {
  const chartOptions = useChartOptions(labels, type);

  return (
    <Card sx={sx}>
      <CardHeader title="Traffic source" />
      <CardContent>
        <Stack spacing={2}>
          <Chart height={300} options={chartOptions} series={chartSeries} type={type} width="100%" />
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'center' }}>
            {chartSeries.map((item, index) => {
              const label = labels[index];
              const Icon = iconMapping[label];
              return (
                <Stack key={label} spacing={1} sx={{ alignItems: 'center' }}>
                  {Icon ? <Icon fontSize="var(--icon-fontSize-lg)" /> : null}
                  <Typography variant="h6">{label}</Typography>
                  <Typography color="text.secondary" variant="subtitle2">
                    {item}%
                  </Typography>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

function useChartOptions(labels: string[], type: string): ApexOptions {
  const theme = useTheme();

  const baseOptions: ApexOptions = {
    chart: { background: 'transparent' },
    colors: [theme.palette.primary.main, theme.palette.success.main, theme.palette.warning.main],
    labels,
    dataLabels: { enabled: false },
    legend: { show: false },
    theme: { mode: theme.palette.mode },
    tooltip: { fillSeriesColor: false },
    stroke: { width: 0 },
    states: {
      active: { filter: { type: 'none' } },
      hover: { filter: { type: 'none' } },
    },
  };

  if (type === 'radialBar') {
    return {
      ...baseOptions,
      plotOptions: {
        radialBar: {
          hollow: { size: '50%' },
          dataLabels: { name: { show: true }, value: { show: true } },
        },
      },
    };
  }

  if (type === 'pie') {
    return {
      ...baseOptions,
      plotOptions: { pie: { expandOnClick: true } },
      stroke: { width: 1, colors: [theme.palette.background.paper] },
    };
  }

  // Default to donut
  return {
    ...baseOptions,
    plotOptions: { pie: { expandOnClick: false, donut: { size: '60%' } } },
  };
}
