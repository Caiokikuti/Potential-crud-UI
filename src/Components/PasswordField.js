import React from 'react'
import { TextField as TextInput } from '@material-ui/core'
import {Field} from 'react-final-form'

function PasswordFieldInternal({ input, meta, label }) {
  let error = ""
  if (meta.touched) {
    error = meta.error
  }
  return (
    <>
    <TextInput
        {...input}
        label={label}
        type="password"
        value={input.value}
        onChange={event=> input.onChange(event.target.value)}
      />
      {error}
    </>
  )
}

function PasswordField({name, label}){
  return <Field name={name} label={label} component={PasswordFieldInternal} />
}

export default PasswordField;
