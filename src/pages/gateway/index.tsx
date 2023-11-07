import {
  TextField,
  Checkbox,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import './style.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface GatewayProps {
  name: string;
  car: string;
  plate: string;
  date: number;
  hour: number;
  type: string;
}
export default function Gateway() {
  return (
    <div className="w-screen h-screen mt-24 px-10 flex flex-col justify-start items-stretch space-y-12">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Portaria</h1>
        <TextField
          placeholder="Pesquisar"
          variant="standard"
          className="w-80"
        />
        <IconButton type="submit">
          <AddCircleIcon />
        </IconButton>
      </header>
      <main>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Carro</TableCell>
              <TableCell>Placa</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Hora</TableCell>
              <TableCell>Tipo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{car}</TableCell>
              <TableCell>{plate}</TableCell>
              <TableCell>{date}</TableCell>
              <TableCell>{hour}</TableCell>
              <TableCell>{type}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </main>
    </div>
  );
}
