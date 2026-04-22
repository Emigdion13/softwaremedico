import React, { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import MenuItem from '@mui/material/MenuItem'
import axios from 'axios'

const API_URL = '/api'

function Doctors() {
  const [doctors, setDoctors] = useState([])
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    specialization: 'GP',
    license_number: '',
  })

  useEffect(() => {
    fetchDoctors()
  }, [])

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${API_URL}/doctors`)
      setDoctors(response.data)
    } catch (error) {
      console.error('Error obteniendo doctores:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${API_URL}/doctors`, formData)
      fetchDoctors()
      setOpen(false)
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        specialization: 'GP',
        license_number: '',
      })
    } catch (error) {
      console.error('Error agregando doctor:', error)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Doctores
        </Typography>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Agregar Doctor
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell>Especialización</TableCell>
            <TableCell>Número de Licencia</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {doctors.map((doctor) => (
            <TableRow key={doctor.id}>
              <TableCell>{`Dr. ${doctor.first_name} ${doctor.last_name}`}</TableCell>
              <TableCell>{doctor.email}</TableCell>
              <TableCell>{doctor.phone}</TableCell>
              <TableCell>{doctor.specialization}</TableCell>
              <TableCell>{doctor.license_number}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Agregar Nuevo Doctor</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <TextField
                name="first_name"
                label="Nombre"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
              <TextField
                name="last_name"
                label="Apellido"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
              <TextField
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <TextField
                name="phone"
                label="Teléfono"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <TextField
                name="specialization"
                label="Especialización"
                select
                value={formData.specialization}
                onChange={handleChange}
                required
              >
                <MenuItem value="GP">Medicina General</MenuItem>
                <MenuItem value="CARDIOLOGY">Cardiología</MenuItem>
                <MenuItem value="NEUROLOGY">Neurología</MenuItem>
                <MenuItem value="PEDIATRICS">Pediatría</MenuItem>
                <MenuItem value="DERMATOLOGY">Dermatología</MenuItem>
                <MenuItem value="ORTHOPEDICS">Ortopedia</MenuItem>
                <MenuItem value="OTHER">Otro</MenuItem>
              </TextField>
              <TextField
                name="license_number"
                label="Número de Licencia"
                value={formData.license_number}
                onChange={handleChange}
                required
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancelar</Button>
            <Button type="submit" variant="contained" color="primary">Agregar Doctor</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  )
}

export default Doctors
