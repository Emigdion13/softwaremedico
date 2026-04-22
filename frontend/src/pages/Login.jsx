import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, Typography, TextField, Button, 
  Paper, Container, Alert, Link,
  InputAdornment, IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../utils/auth';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLogin = async () => {
    if (!formData.username || !formData.password) {
      setError('Por favor complete todos los campos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/accounts/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Credenciales inválidas');
      }

      const data = await response.json();
      
      // Store tokens
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Login successful
      await login(data.user);

      // Redirect to dashboard (or home page)
      navigate('/appointments');
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #673AB7 0%, #E91E63 50%, #00BCD4 100%)',
      py: { xs: 4, md: 8 }
    }}>
      <Container maxWidth="sm">
        <Paper 
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: '24px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            animation: 'fadeInUp 0.6s ease-out'
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography 
              variant="h2" 
              fontWeight={700} 
              sx={{ 
                fontSize: { xs: '2rem', sm: '2.5rem' },
                background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Bienvenido
            </Typography>
            <Typography variant="body1" sx={{ color: '#e0e0e0', mt: 1 }}>
              Inicie sesión en su cuenta médica
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Usuario o Email"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            variant="outlined"
            sx={{ mb: 3 }}
            size="medium"
            InputProps={{
              sx: { borderRadius: '12px' }
            }}
          />

          <TextField
            fullWidth
            label="Contraseña"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            variant="outlined"
            sx={{ mb: 3 }}
            size="medium"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: '#673AB7' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
              sx: { borderRadius: '12px' }
            }}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleLogin}
            disabled={loading}
            sx={{
              mt: 2,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 700,
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #673AB7 0%, #9C27B0 100%)',
              '&:hover': {
                boxShadow: '0 8px 24px rgba(103, 58, 183, 0.4)',
              },
            }}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="#e0e0e0">
              ¿Nuevo aquí?{' '}
              <Link 
                component="button" 
                onClick={() => navigate('/register')}
                sx={{ 
                  fontWeight: 600,
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Regístrese ahora
              </Link>
            </Typography>
          </Box>

          {/* Demo credentials info */}
          <Box sx={{
            mt: 4,
            p: 2,
            background: '#ffffff10',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <Typography variant="caption" color="#e0e0e0">
              Credenciales de demostración:
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, fontFamily: 'monospace' }}>
              admin / admin@example.com<br/>
              Contraseña: admin123
            </Typography>
          </Box>
        </Paper>
      </Container>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Box>
  );
}

export default Login;
