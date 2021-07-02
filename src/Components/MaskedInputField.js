import React from 'react'
import MaskedInput from 'react-text-mask'
import {TextField as TextInput } from '@material-ui/core'
import {Field} from 'react-final-form'

function MaskedInputInternal({label, input, meta, mask}){
    let error = ""
    if (meta.touched) {
      error = meta.error
    }
   return(
       <>
        <MaskedInput
            mask={mask}
            {...input}
            render = {(ref, props)=>{return <TextInput {...props} inputProps={{ref}} fullWidth/>}}
            placeholder={label}
            onBlur = {event=>input.onBlur()}
            onFocus = {event=>input.onFocus()}
            value = {input.value}
            onChange={event =>input.onChange(event.target.value)}
        />
        {error}
    </>
    );
}


function MaskedInputField({name, label, mask}){
    return <Field name={name} label={label} component={MaskedInputInternal} mask={mask} />
}

export default MaskedInputField;