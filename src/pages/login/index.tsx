import { Link } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';
import logo from '../../../assets/logo.png';
import './style.css';

export default function Login() {
  return (
    <section>
      <img src={logo} alt="logo" />
      <form action="/" method="post">
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
              Entrar
            </Button>
            <div>
              <Typography variant="body1">
                Não tem conta ainda? <Link to="/signup">Cadastre-se</Link>
              </Typography>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
