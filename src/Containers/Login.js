import { Button, FormControl, Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Form } from 'react-final-form'
import { useHistory, withRouter, useParams } from 'react-router-dom'
import TextField from '../Components/TextField'
import PasswordField from '../Components/PasswordField'
import api from '../services/api'

const SubmitButton = (props) => <button {...props} type='submit' />

const Login = ({ setLogado }) => {
  const history = useHistory()

  useEffect(() => {
    if (api.getToken()) setLogado(false)
  }, [])

  const handleSubmit = (formValues) => {
    api
      .login(formValues)
      .then((r) => setLogado(true))
      .catch((err) => alert(err.message))
  }

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant='h5' component='h3'>
                  Login
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField name='email' label='Email' />
              </Grid>
              <Grid item xs={6}>
                <PasswordField name='password' label='Senha' />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <FormControl>
                  <Button
                    variant='contained'
                    color='primary'
                    component={SubmitButton}
                  >
                    Login
                  </Button>
                </FormControl>
              </Grid>
            </Grid>
          </form>
        )}
      />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Button
            variant='contained'
            color='secondary'
            component={SubmitButton}
            onClick={() => history.push('/cadastroUser')}
          >
            Cadastro
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default withRouter(Login)
