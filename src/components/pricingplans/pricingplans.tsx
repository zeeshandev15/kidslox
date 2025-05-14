import React from 'react';
import Image from 'next/image';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Card, CardContent, Chip, Grid, List, ListItemText, Typography } from '@mui/material';

type Feature = {
  label: string;
  family: boolean | string;
  basic: boolean | string;
  isText?: boolean;
};

const features: Feature[] = [
  { label: 'Devices amount', family: '10', basic: '1', isText: true },
  { label: 'Web filtering', family: true, basic: true },
  { label: 'Listening to surroundings', family: true, basic: true },
  { label: 'Anti-tampering', family: true, basic: true },
  { label: 'Location tracking', family: true, basic: true },
];

type PlanCardProps = {
  title: string;
  price: string;
  billed: string;
  color: string;
  bestValue?: boolean;
};

const PlanCard: React.FC<PlanCardProps> = ({ title, price, billed, color, bestValue }) => (
  <Card sx={{ backgroundColor: color, color: color === '#f1f1f1' ? 'black' : 'white', borderRadius: 2, p: 2 }}>
    <CardContent>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h4" fontWeight="bold">
        {price}
      </Typography>
      <Typography variant="body2" sx={{ opacity: 0.8 }}>
        {billed}
      </Typography>
      {bestValue && <Chip label="Best Value" color="error" size="small" sx={{ mt: 1 }} />}
    </CardContent>
  </Card>
);

const PricingPlans: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box textAlign="center" mb={4}>
        <Image src="/assets/protectchild.jpg" alt="Protect child" width={180} height={180} />
        <Typography variant="h5" fontWeight="bold" mt={2}>
          Protect your child
        </Typography>
        <Typography variant="h6" color="text.secondary">
          from addiction!
        </Typography>
      </Box>

      <Grid container spacing={2} mb={4}>
        <Grid item xs={12} sm={6}>
          <PlanCard
            title="FAMILY / per month"
            price="Rs 1241.69"
            billed="Rs 14900.0 Billed Annually"
            color="#1abc9c"
            bestValue
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <PlanCard title="BASIC / per month" price="Rs 824.99" billed="Rs 9900.0 Billed Annually" color="#f1f1f1" />
        </Grid>
      </Grid>

      <Grid container sx={{ fontWeight: 'bold', mb: 1 }}>
        <Grid item xs={6} textAlign="left">
          Premium plans:
        </Grid>
        <Grid item xs={3} textAlign="center">
          Family
        </Grid>
        <Grid item xs={3} textAlign="center">
          Basic
        </Grid>
      </Grid>

      <List disablePadding>
        {features.map((feature, index) => (
          <React.Fragment key={index}>
            <Grid container alignItems="center">
              <Grid item xs={6}>
                <ListItemText primary={feature.label} />
              </Grid>
              <Grid item xs={3} textAlign="center" sx={{ bgcolor: '#e8f5e9', py: 1.5 }}>
                {feature.isText ? <Typography>{feature.family}</Typography> : <CheckCircleIcon color="success" />}
              </Grid>
              <Grid item xs={3} textAlign="center">
                {feature.isText ? <Typography>{feature.basic}</Typography> : <CheckCircleIcon color="success" />}
              </Grid>
            </Grid>
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default PricingPlans;
