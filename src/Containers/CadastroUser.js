import { Button, FormControl, Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Form } from 'react-final-form'
import { useHistory, withRouter, useParams } from 'react-router-dom'
import TextField from '../Components/TextField'
import PasswordField from '../Components/PasswordField'
import api from '../services/api'

const SubmitButton = (props) => <button {...props} type='submit' />

const CadastroUser = () => {
  const history = useHistory()

  const handleSubmit = (formValues) => {
    api
      .cadastroUser(formValues)
      .then(() => {
        setTimeout(() => {
          history.push('/developer')
        }, 1000)
      })
      .catch((err) => {
        alert(err.message)
      })
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
                    cadastrar
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

export default withRouter(CadastroUser)
