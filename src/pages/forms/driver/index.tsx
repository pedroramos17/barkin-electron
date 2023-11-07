import { TextField, Button } from '@mui/material';

export default function DriverForm() {
  return (
    <div className="h-screen w-screen py-8 px-10 flex flex-col justify-between items-stretch">
      <h1 className="text-2xl font-bold">Cadastrar Motorista</h1>
      <TextField label="Nome" variant="standard" />
      <TextField label="RG" variant="standard" />
      <TextField label="Telefone" variant="standard" />
      <h2 className="text-xl font-semibold">Adicionar Veículo</h2>
      <TextField label="Modelo" variant="standard" />
      <TextField label="Cor" variant="standard" />
      <TextField label="Placa" variant="standard" />
      <div>
        <Button variant="contained" color="info">
          +1 Veículo
        </Button>
      </div>
      <div className="flex justify-between">
        <Button variant="outlined">Voltar</Button>
        <Button variant="contained">Salvar</Button>
      </div>
    </div>
  );
}
