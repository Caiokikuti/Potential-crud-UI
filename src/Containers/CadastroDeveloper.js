import { Button, FormControl, Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Form, FormSpy } from 'react-final-form'
import { useHistory, withRouter, useParams } from 'react-router-dom'
import DatePickerField from '../Components/DatePickerField'

import TextField from '../Components/TextField'
import api from '../services/api'

const SubmitButton = (props) => <button {...props} type='submit' />
const CadastroDeveloper = () => {
  const history = useHistory()
  const params = useParams()
  const [formValues, setFormValues] = useState({})
  const [dev, setdev] = useState({})

  const validation = (formValues) => {
    function isNumber(n) {
      return !isNaN(parseInt(n)) && isFinite(n)
    }

    let error = {}
    const nome = formValues.nome || ''
    const hobby = formValues.hobby || ''
    const dataNascimento = formValues.dataNascimento || ''
    const sexo = formValues.sexo || ''
    const idade = formValues.idade || ''

    if (idade.length == 0) error.nome = 'O campo idade não pode ser vazio'
    if (!isNumber(idade)) error.idade = 'Idade deve ser um numero'
    if (nome.length == 0) error.nome = 'O campo nome não pode ser vazio'
    if (hobby.length == 0) error.hobby = 'O campo CPF não pode ser vazio'
    if (dataNascimento.length == 0)
      error.dataNascimento = 'O campo data de nascimento não pode ser vazio'
    if (sexo.length == 0) error.sexo = 'O campo sexo não pode ser vazio'
    if (sexo != 'M' && sexo != 'F')
      error.sexo = 'Sexo deve ser informado no formato M ou F'

    console.log(error)

    return error
  }

  useEffect(() => {
    if (params.id === 'new') {
      setdev({})
    } else {
      api
        .getDesenvolvedor(params.id)
        .then((r) => setdev(r))
        .catch(() => setdev({}))
    }
  }, [])

  const handleSubmit = (formValues) => {
    formValues.idade = parseInt(formValues.idade)
    if (dev.id) {
      api
        .updateDesenvolvedor(formValues)
        .then(() => {
          alert('mudado com sucesso!')
        })
        .catch((err) => {
          alert(err.message)
        })
    } else {
      api
        .createDesenvolvedor(formValues)
        .then(() => {
          alert('Cadastrado com sucesso!')
        })
        .catch((err) => {
          alert(err.message)
        })
    }
  }

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        validate={validation}
        initialValues={dev}
        render={({ handleSubmit, form }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant='h5' component='h3'>
                  Formulario Developer
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField name='nome' label='Nome Completo' />
              </Grid>
              <Grid item xs={6}>
                {/* <TextField name="dataNascimento" label="Data de Nascimento"/> */}
                <DatePickerField
                  name='dataNascimento'
                  label='Data de nascimento'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField name='hobby' label='Hobby' />
              </Grid>
              <Grid item xs={3}>
                <TextField name='sexo' label='Sexo' />
              </Grid>
              <Grid item xs={3}>
                <TextField name='idade' label='Idade' />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={() => {
                    history.push('/developer')
                  }}
                >
                  Voltar
                </Button>
              </Grid>
              <Grid item xs>
                {' '}
              </Grid>
              <Grid item>
                <FormControl>
                  <Button
                    variant='contained'
                    color='primary'
                    component={SubmitButton}
                  >
                    Salvar
                  </Button>
                </FormControl>
              </Grid>
            </Grid>
          </form>
        )}
      />
    </>
  )
}

export default withRouter(CadastroDeveloper)
