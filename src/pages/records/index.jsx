import React, { useEffect, useState } from 'react'
import LayoutAdmin from '../layouts/adminlayout'
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import { TableBar } from '@mui/icons-material'
import { supabase } from '@/supabase'
import Head from 'next/head'
import CustomHead from '@/components/head'

export default function Records() {
    const [records, setRecords] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    async function getRecords() {
        const { data } = await supabase.from('laundries_table').select().eq('status', 'done');

        setRecords(data)
    }

    useEffect(() => {

        getRecords(); 

    }, []); 
    const titleCell = ['Name', 'Type of Service', 'Phone', 'Price', 'Kg', 'Date'];

     

    return (
        <LayoutAdmin>
            <CustomHead title='Records' />
            <Grid container height='100%' width={{xs: '100vw', sm: 'calc(100vw - 250px)'}} position='relative' > 
                <Box marginX={{sm: 0, md: 3}} marginTop={3} marginBottom={5} width='inherit' >
                    <div style={{boxShadow: '0px 2px 8px #00667E30', borderRadius: 5, overflow: 'hidden', marginInline: 10  }}>
                        <TableContainer >
                            <Table stickyHeader  >
                                <TableHead >
                                    <TableRow >
                                        {titleCell.map((title) => (
                                            <TableCell key={title} sx={{bgcolor: '#00667E', color: '#FFFFFF'}}>
                                                {title}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        records.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage )
                                        .map(record => (
                                            <TableRow key={record.id}>
                                                <TableCell>{record.name}</TableCell>
                                                <TableCell>{record.service_type}</TableCell>
                                                <TableCell>{record.phone}</TableCell>
                                                <TableCell>{record.price}</TableCell>
                                                <TableCell>{record.kg ? record.kg : 'N/A'}</TableCell>
                                                <TableCell>{record.date}</TableCell>
                                            </TableRow>
                                        )) 
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPage={rowsPerPage} 
                            component="div"
                            count={records.length}
                            onPageChange={(e, newPage) => {
                                setPage(newPage)
                            }}
                            page={page}
                            rowsPerPageOptions={[10, 15, 25]}
                            onRowsPerPageChange={(e) => {
                                setRowsPerPage(e.target.value)
                                setPage(0);
                            }}
                            // rowsPerPage={}
                        />
                    </div>
                </Box>
            </Grid>
        </LayoutAdmin>
    )
}

