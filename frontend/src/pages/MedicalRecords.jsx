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

function MedicalRecords() {
  const [records, setRecords] = useState([])
  const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([])
  const [appointments, setAppointments] = useState([])
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    patient: '',
    doctor: '',
    appointment: '',
    diagnosis: '',
    treatment: '',
    medications: '',
    follow_up_date: '',
  })

  useEffect(() => {
    fetchRecords()
    fetchPatients()
    fetchDoctors()
    fetchAppointments()
  }, [])

  const fetchRecords = async () => {
    try {
      const response = await axios.get(`${API_URL}/medical-records`)
      setRecords(response.data)
    } catch (error) {
      console.error('Error obteniendo historias médicas:', error)
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

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${API_URL}/appointments`)
      setAppointments(response.data)
    } catch (error) {
      console.error('Error obteniendo citas:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${API_URL}/medical-records`, formData)
      fetchRecords()
      setOpen(false)
      setFormData({
        patient: '',
        doctor: '',
        appointment: '',
        diagnosis: '',
        treatment: '',
        medications: '',
        follow_up_date: '',
      })
    } catch (error) {
      console.error('Error agregando historia médica:', error)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Historias Médicas
        </Typography>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Agregar Historia
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Paciente</TableCell>
            <TableCell>Doctor</TableCell>
            <TableCell>Diagnóstico</TableCell>
            <TableCell>Tratamiento</TableCell>
            <TableCell>Fecha</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{`${record.patient_name} ${record.patient_last_name}`}</TableCell>
              <TableCell>{`Dr. ${record.doctor_name} ${record.doctor_last_name}`}</TableCell>
              <TableCell>{record.diagnosis}</TableCell>
              <TableCell>{record.treatment}</TableCell>
              <TableCell>{new Date(record.created_at).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Agregar Historia Médica</DialogTitle>
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
                name="diagnosis"
                label="Diagnóstico"
                multiline
                rows={2}
                value={formData.diagnosis}
                onChange={handleChange}
                required
              />

              <TextField
                name="treatment"
                label="Tratamiento"
                multiline
                rows={2}
                value={formData.treatment}
                onChange={handleChange}
                required
              />

              <TextField
                name="medications"
                label="Medicamentos"
                multiline
                rows={2}
                value={formData.medications}
                onChange={handleChange}
              />

              <TextField
                name="follow_up_date"
                label="Fecha de Seguimiento"
                type="date"
                value={formData.follow_up_date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancelar</Button>
            <Button type="submit" variant="contained" color="primary">Agregar Historia</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  )
}

export default MedicalRecords
