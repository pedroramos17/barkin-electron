import React, { useMemo, useState } from 'react';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Checkbox,
  TablePagination,
  Paper,
  Box,
  Button,
} from '@mui/material';
import getComparator, { Order } from '../sorting';
import DriverTableToolbar from './tableToolbar';
import DriverTableHead from './tableHead';
import { DriverData } from '../../../interfaces/driver.interface';
import { AxiosResponse } from 'axios';
import { getDrivers } from '../../../api/services/driver.service';

function createData(
  id: string,
  name: string,
  rg: number,
  phone: number,
): DriverData {
  return {
    id,
    name,
    rg,
    phone,
  };
}

// transform the createData function into a json object for the table
async function createRows() {
  const response = await getDrivers();
  console.log(response);
}
console.log(createRows());

const rows = [
  createData('id-1', 'Pedro', 123456789, 11987654321),
  createData('id-2', 'Maria', 987654321, 11987654321),
  createData('id-3', 'João', 123456789, 11987654321),
  createData('id-4', 'Ana', 987654321, 11987654321),
  createData('id-5', 'Carlos', 123456789, 11987654321),
  createData('id-6', 'Julia', 987654321, 11987654321),
  createData('id-7', 'Bruna', 123456789, 11987654321),
  createData('id-8', 'Larissa', 987654321, 11987654321),
  createData('id-9', 'Gabriel', 123456789, 11987654321),
];
export default function DriverTable() {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof DriverData>('name');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof DriverData,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .sort(getComparator(order, orderBy)),
    [order, orderBy, page, rowsPerPage],
  );

  const handleAddCar = (event: React.MouseEvent<unknown>, id: string) => {
    console.log('add car');
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <DriverTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <caption>Tabela de cadastro de entradas e saídas</caption>
            <DriverTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `Driver-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        onClick={(event) => handleClick(event, row.id)}
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.rg}</TableCell>
                    <TableCell align="center">{row.phone}</TableCell>
                    <TableCell onClick={(event) => handleAddCar(event, row.id)}>
                      <Button variant="contained" color="info">
                        + Veículo
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="warning">
                        editar
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="error">
                        Excluir
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Itens por página"
        />
      </Paper>
    </Box>
  );
}
