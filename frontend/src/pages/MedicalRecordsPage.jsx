import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function MedicalRecordsPage() {
  const records = [
    { patient: 'Juan Pérez', diagnosis: 'Hipertensión', treatment: 'Medicación y dieta', date: '2024-04-15' },
    { patient: 'María González', diagnosis: 'Infección respiratoria', treatment: 'Antibióticos', date: '2024-04-18' },
    { patient: 'Carlos Rodríguez', diagnosis: 'Dolor lumbar', treatment: 'Fisioterapia', date: '2024-04-20' },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h3" fontWeight={700}>
          Historias Médicas
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          size="large"
          sx={{
            borderRadius: '12px',
            px: 3,
            background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
          }}
        >
          Nueva Historia
        </Button>
      </Box>

      <Grid container spacing={3}>
        {records.map((record, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: '0 20px 40px rgba(76, 175, 80, 0.2)',
              },
            }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Box sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
                  mx: 'auto',
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <span style={{ fontSize: '30px' }}>📄</span>
                </Box>

                <Typography variant="h5" fontWeight={600} gutterBottom>
                  {record.patient}
                </Typography>

                <Box sx={{
                  textAlign: 'left',
                  mt: 2,
                  p: 2,
                  background: '#f5f7fa',
                  borderRadius: '12px',
                }}>
                  <Typography variant="caption" fontWeight={600} color="text.secondary">
                    DIAGNÓSTICO
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    {record.diagnosis}
                  </Typography>

                  <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                    TRATAMIENTO
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    {record.treatment}
                  </Typography>
                </Box>

                <Typography variant="caption" color="text.secondary" mt={2} display="block">
                  {new Date(record.date).toLocaleDateString('es-ES')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default MedicalRecordsPage;
