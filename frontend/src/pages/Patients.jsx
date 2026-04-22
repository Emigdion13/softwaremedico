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

function Patients() {
  const [patients, setPatients] = useState([])
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    gender: 'M',
    date_of_birth: '',
    address: '',
    medical_history: '',
  })

  useEffect(() => {
    fetchPatients()
  }, [])

  const fetchPatients = async () => {
    try {
      const response = await axios.get(`${API_URL}/patients`)
      setPatients(response.data)
    } catch (error) {
      console.error('Error obteniendo pacientes:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${API_URL}/patients`, formData)
      fetchPatients()
      setOpen(false)
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        gender: 'M',
        date_of_birth: '',
        address: '',
        medical_history: '',
      })
    } catch (error) {
      console.error('Error agregando paciente:', error)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Pacientes
        </Typography>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Agregar Paciente
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell>Género</TableCell>
            <TableCell>Fecha de Nacimiento</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>{`${patient.first_name} ${patient.last_name}`}</TableCell>
              <TableCell>{patient.email}</TableCell>
              <TableCell>{patient.phone}</TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.date_of_birth}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Agregar Nuevo Paciente</DialogTitle>
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
                name="gender"
                label="Género"
                select
                value={formData.gender}
                onChange={handleChange}
              >
                <MenuItem value="M">Masculino</MenuItem>
                <MenuItem value="F">Femenino</MenuItem>
                <MenuItem value="O">Otro</MenuItem>
              </TextField>
              <TextField
                name="date_of_birth"
                label="Fecha de Nacimiento"
                type="date"
                value={formData.date_of_birth}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                name="address"
                label="Dirección"
                multiline
                rows={3}
                value={formData.address}
                onChange={handleChange}
              />
              <TextField
                name="medical_history"
                label="Historial Médico"
                multiline
                rows={3}
                value={formData.medical_history}
                onChange={handleChange}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancelar</Button>
            <Button type="submit" variant="contained" color="primary">Agregar Paciente</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  )
}

export default Patients
