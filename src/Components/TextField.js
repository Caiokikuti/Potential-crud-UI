import React from 'react'
import { TextField as TextInput } from '@material-ui/core'
import {Field} from 'react-final-form'

function TextFieldInternal({ input, meta, label }) {
  let error = ""
  if (meta.touched) {
    error = meta.error
  }
  return (
    <>
      <TextInput
        {...input}
        fullWidth
        label={label}
        value={input.value}
        onChange={event=> input.onChange(event.target.value)}
      />
      {error}
    </>
  )
}

function TextField({name, label}){
  return <Field name={name} label={label} component={TextFieldInternal} />
}

export default TextField
