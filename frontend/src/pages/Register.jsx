import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, TextField, Button,
  Paper, Container, Alert,
  InputAdornment, IconButton, Link
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleRegister = async () => {
    // Validation
    if (!formData.username || !formData.email || !formData.password) {
      setError('Por favor complete todos los campos obligatorios');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/accounts/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          password_confirm: formData.confirmPassword
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const errorMsg = data.error || data.message || data.detail || data.username?.[0] || data.email?.[0] || 'Error al crear la cuenta';
        throw new Error(errorMsg);
      }

      // Registration successful
      setSuccess('¡Registro exitoso! Redirigiendo a login...');
      
      // Wait briefly then redirect
      setTimeout(() => {
        navigate('/login', { state: { registered: true } });
      }, 1500);
    } catch (err) {
      setError(err.message || 'Error al registrar. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRegister();
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
              Crear Cuenta
            </Typography>
            <Typography variant="body1" sx={{ color: '#e0e0e0', mt: 1 }}>
              Regístrese para acceder al sistema médico
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 3, borderRadius: '12px' }}>
              {success}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Nombre de usuario"
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
            label="Correo electrónico"
            name="email"
            type="email"
            value={formData.email}
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

          <TextField
            fullWidth
            label="Confirmar contraseña"
            name="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            variant="outlined"
            sx={{ mb: 3 }}
            size="medium"
            InputProps={{
              sx: { borderRadius: '12px' }
            }}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleRegister}
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
            {loading ? 'Creando cuenta...' : 'Registrar'}
          </Button>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="#e0e0e0">
              ¿Ya tiene cuenta?{' '}
              <Link 
                component="button" 
                onClick={() => navigate('/login')}
                sx={{ 
                  fontWeight: 600,
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Inicie sesión
              </Link>
            </Typography>
          </Box>

          {/* Info */}
          <Box sx={{
            mt: 4,
            p: 2,
            background: '#ffffff10',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <Typography variant="caption" color="#e0e0e0">
              Demo credentials (for testing):
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, fontFamily: 'monospace' }}>
              admin / admin@example.com<br/>
              Password: admin123
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

export default Register;
