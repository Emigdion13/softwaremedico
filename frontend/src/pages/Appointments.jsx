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
import MenuItem from '@mui/material/MenuItem'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import axios from 'axios'

const API_URL = '/api'

function Appointments() {
  const [appointments, setAppointments] = useState([])
  const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([])
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    patient: '',
    doctor: '',
    appointment_date: '',
    status: 'SCHEDULED',
    reason: '',
    notes: '',
  })

  useEffect(() => {
    fetchAppointments()
    fetchPatients()
    fetchDoctors()
  }, [])

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${API_URL}/appointments`)
      setAppointments(response.data)
    } catch (error) {
      console.error('Error obteniendo citas:', error)
    }
  }

  const fetchPatients = async () => {
    try {
      const response = await axios.get(`${API_URL}/patients`)
      setPatients(response.data)
    } catch (error) {
      console.error('Error obteniendo pacientes:', error)
    }
  }

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
      await axios.post(`${API_URL}/appointments`, formData)
      fetchAppointments()
      setOpen(false)
      setFormData({
        patient: '',
        doctor: '',
        appointment_date: '',
        status: 'SCHEDULED',
        reason: '',
        notes: '',
      })
    } catch (error) {
      console.error('Error agregando cita:', error)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Citas
        </Typography>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Programar Cita
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Paciente</TableCell>
            <TableCell>Doctor</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Motivo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>{`${appointment.patient_name} ${appointment.patient_last_name}`}</TableCell>
              <TableCell>{`Dr. ${appointment.doctor_name} ${appointment.doctor_last_name}`}</TableCell>
              <TableCell>{new Date(appointment.appointment_date).toLocaleString()}</TableCell>
              <TableCell>{appointment.status}</TableCell>
              <TableCell>{appointment.reason || 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Programar Cita</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <FormControl fullWidth required>
                <InputLabel>Paciente</InputLabel>
                <Select
                  name="patient"
                  value={formData.patient}
                  onChange={handleChange}
                >
                  {patients.map((patient) => (
                    <MenuItem key={patient.id} value={patient.id}>
                      {`${patient.first_name} ${patient.last_name}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth required>
                <InputLabel>Doctor</InputLabel>
                <Select
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                >
                  {doctors.map((doctor) => (
                    <MenuItem key={doctor.id} value={doctor.id}>
                      {`Dr. ${doctor.first_name} ${doctor.last_name}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                name="appointment_date"
                label="Fecha de la Cita"
                type="datetime-local"
                value={formData.appointment_date}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                name="reason"
                label="Motivo de la Cita"
                multiline
                rows={2}
                value={formData.reason}
                onChange={handleChange}
              />

              <TextField
                name="notes"
                label="Notas"
                multiline
                rows={2}
                value={formData.notes}
                onChange={handleChange}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancelar</Button>
            <Button type="submit" variant="contained" color="primary">Programar</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  )
}

export default Appointments
