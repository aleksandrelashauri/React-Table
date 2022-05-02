import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import DataTable from './table/DataTable';
import ResponsiveAppBar from '../header/ResponsiveAppBar';

export default function MainItems() {
  return (
    <>
      <CssBaseline />
      <ResponsiveAppBar />
      <Container fixed>
        <Box sx={{ height: '3vh' }} />
        <DataTable />
      </Container>
    </>
  );
}
