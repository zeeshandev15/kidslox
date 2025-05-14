import * as React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { paths } from '@/paths';
import { DynamicLogo } from '@/components/core/logo';

export interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <Box
      sx={{
        display: { xs: 'flex', lg: 'grid' },
        flexDirection: 'column',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '100%',
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flex: '1 1 auto',
          justifyContent: 'center',
          width: '100vw',
        }}
      >
        <Box
          sx={{
            maxWidth: '450px',
            width: '100%',
            p: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box component={RouterLink} href={paths.home} sx={{ fontSize: 0 }}>
              <DynamicLogo colorDark="light" colorLight="dark" />
            </Box>
          </Box>

          {children}
        </Box>
      </Box>
    </Box>
  );
}
