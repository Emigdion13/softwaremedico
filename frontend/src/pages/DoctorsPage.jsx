import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function DoctorsPage() {
  const doctors = [
    { name: 'Dr. Carlos Ruiz', specialty: 'Cardiología', phone: '+1 (555) 111-2222' },
    { name: 'Dra. Maria Lopez', specialty: 'Pediatría', phone: '+1 (555) 333-4444' },
    { name: 'Dr. Jose Garcia', specialty: 'Neurología', phone: '+1 (555) 555-6666' },
    { name: 'Dra. Ana Martinez', specialty: 'Dermatología', phone: '+1 (555) 777-8888' },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h3" fontWeight={700}>
          Doctores
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          size="large"
          sx={{
            borderRadius: '12px',
            px: 3,
            background: 'linear-gradient(135deg, #E91E63 0%, #F44336 100%)',
          }}
        >
          Agregar Doctor
        </Button>
      </Box>

      <Grid container spacing={3}>
        {doctors.map((doctor, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: 'perspective(1000px) rotateX(0deg)',
              '&:hover': {
                transform: 'perspective(1000px) rotateX(5deg) translateY(-8px)',
                boxShadow: '0 20px 40px rgba(233, 30, 99, 0.2)',
              },
            }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Box sx={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #E91E63 0%, #F44336 100%)',
                  mx: 'auto',
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Typography variant="h3" fontWeight={700} color="white">
                    {doctor.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                  </Typography>
                </Box>

                <Typography variant="h5" fontWeight={600} gutterBottom>
                  {doctor.name}
                </Typography>

                <Chip
                  label={doctor.specialty}
                  sx={{
                    mx: 'auto',
                    mb: 2,
                    background: 'linear-gradient(135deg, #E0F7FA 0%, #B2EBF2 100%)',
                    color: '#0097A7',
                    fontWeight: 600,
                  }}
                />

                <Typography variant="body2" color="text.secondary">
                  {doctor.phone}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default DoctorsPage;
