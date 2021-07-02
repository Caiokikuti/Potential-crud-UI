import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { Field } from 'react-final-form'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}))

function DatePickersInternal({ label, input, meta }) {
  const classes = useStyles()
  let error = ''
  if (meta.touched) {
    error = meta.error
  }
  return (
    <>
      <TextField
        label={label}
        type='date'
        defaultValue='2017-05-24'
        className={classes.textField}
        onChange={(event) => input.onChange(event.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      {error}
    </>
  )
}

function DatePickerField({ name, label }) {
  return <Field name={name} label={label} component={DatePickersInternal} />
}

export default DatePickerField
