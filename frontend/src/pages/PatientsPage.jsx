import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Grid, Card, CardContent, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import BackButton from '../components/BackButton';

function PatientsPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <BackButton label="Volver al Inicio" />
        </Box>
        <Typography variant="h3" fontWeight={700}>
          Pacientes
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          size="large"
          sx={{
            borderRadius: '12px',
            px: 3,
            background: 'linear-gradient(135deg, #673AB7 0%, #9C27B0 100%)',
          }}
        >
          Agregar Paciente
        </Button>
      </Box>

      <Paper sx={{
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
      }}>
        <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0', display: 'flex', gap: 2, alignItems: 'center' }}>
          <SearchIcon sx={{ color: '#673AB7' }} />
          <input 
            type="text" 
            placeholder="Buscar pacientes..." 
            style={{
              border: 'none',
              outline: 'none',
              flex: 1,
              fontSize: '1.1rem',
            }}
          />
        </Box>
        
        <Box sx={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f5f7fa' }}>
                <th style={{ p: 2, fontWeight: 600 }}>Nombre</th>
                <th style={{ p: 2, fontWeight: 600 }}>Email</th>
                <th style={{ p: 2, fontWeight: 600 }}>Teléfono</th>
                <th style={{ p: 2, fontWeight: 600 }}>Fecha Nacimiento</th>
                <th style={{ p: 2, fontWeight: 600 }}>Edad</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((i) => (
                <tr 
                  key={i} 
                  onClick={() => navigate('/patients/1')}
                  style={{ cursor: 'pointer', transition: 'background 0.2s' }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f0f4ff'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <td style={{ p: 2 }}>
                    <Typography fontWeight={600}>Juan Pérez</Typography>
                  </td>
                  <td style={{ p: 2 }}>juan.perez@example.com</td>
                  <td style={{ p: 2 }}>+1 (555) 123-4567</td>
                  <td style={{ p: 2 }}>1985-03-15</td>
                  <td style={{ p: 2 }}>39 años</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Paper>
    </Box>
  );
}

export default PatientsPage;
