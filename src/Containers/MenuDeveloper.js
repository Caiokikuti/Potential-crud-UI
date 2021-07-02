import {
  Box,
  Button,
  FormControl,
  Grid,
  TableBody,
  TableContainer,
  Typography,
} from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { Field, Form } from 'react-final-form'
import { useHistory, withRouter } from 'react-router-dom'
import TabelaEstudante from '../Components/TabelaEstudantes'
import TextField from '../Components/TextField'
import { maskCpf, maskTel, maskCEP, maskRa } from '../services/masks'
import MaskedInputField from '../Components/MaskedInputField'
import api from '../services/api'
import DatePickerField from '../Components/DatePickerField'
const SubmitButton = (props) => <button {...props} type='submit' />

const MenuDeveloper = () => {
  const history = useHistory()

  const [developers, setDevelopers] = useState([])

  useEffect(() => {
    api
      .getDesenvolvedores({})
      .then((developerResponse) => setDevelopers(developerResponse.data))
  }, [])

  const handleSubmit = (formValues) => {
    api
      .getDesenvolvedores(formValues)
      .then((r) => setDevelopers(r.data))
      .catch((err) => alert(err.message))
  }

  const validation = (formValues) => {
    const ra = formValues.ra || ''
    const nome = formValues.nome || ''
    const telefone = formValues.telefone || ''
    const cpf = formValues.cpf || ''
    let error = {}
    if (
      ra.length == 0 &&
      nome.length == 0 &&
      telefone.length == 0 &&
      cpf.length == 0
    ) {
      error.ra = 'Os 3 campos não podem ser vazios'
      error.telefone = 'Os 3 campos não podem ser vazios'
      error.nome = 'Os 3 campos não podem ser vazios'
      error.cpf = 'Os 3 campos não podem ser vazios'
    }
    return error
  }

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        // validate={validation}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3} justify='flex-end'>
              <Grid item xs={12}>
                <Typography variant='h5' component='h3'>
                  Desenvolvedor
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField name='sexo' label='Sexo' />
              </Grid>
              <Grid item xs={6}>
                <TextField name='nome' label='Nome' />
              </Grid>
              <Grid item xs={6}>
                <TextField name='hobby' label='Hobby' />
              </Grid>
              <Grid item xs={6}>
                <DatePickerField
                  name='dataNascimento'
                  label='Data de nascimento'
                />
              </Grid>
              <Grid item xs={12}></Grid>
              <Grid item xs={12}>
                <FormControl>
                  <Button
                    variant='contained'
                    color='primary'
                    component={SubmitButton}
                  >
                    Buscar
                  </Button>
                </FormControl>
              </Grid>
            </Grid>
          </form>
        )}
      />
      <Grid container spacing={10}>
        <Grid item xs={12}>
          <TabelaEstudante developers={developers} />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              history.push('/developer/new')
            }}
          >
            + Novo Aluno
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default withRouter(MenuDeveloper)
