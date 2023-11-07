import { Link } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import logo from '../../../assets/logo.png';
import './style.css';

export default function Signup() {
  return (
    <section>
      <img src={logo} alt="logo" />
      <form action="/" method="post">
        <TextField
          type="text"
          name="name"
          id="name"
          label="Seu nome"
          required
        />
        <TextField
          type="text"
          name="email"
          id="email"
          label="Seu email"
          required
        />
        <TextField
          type="password"
          name="pwd"
          id="pwd"
          label="Sua senha"
          required
        />
        <div className="flex justify-center">
          <div className="w-44 space-y-8">
            <Button type="submit" variant="contained">
              Cadastrar
            </Button>
            <div>
              Já tem uma conta? <Link to="/">Clique aqui para entrar</Link>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
