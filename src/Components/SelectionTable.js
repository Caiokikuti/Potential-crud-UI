import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'nome', headerName: 'Nome', width: 130 },
  { field: 'dataNascimento', headerName: 'Last name', width: 130 },
  {
    field: 'cpf',
    headerName: 'CPF',
    width: 130,
  },
];



export default function DataTable({lista}) {
  return (
    <div style={{ height: 200, width: '100%' }}>
      <DataGrid rows={lista} columns={columns} pageSize={4} checkboxSelection />
    </div>
  );
}
