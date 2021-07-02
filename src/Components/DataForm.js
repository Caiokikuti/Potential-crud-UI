import React from 'react';
import {Field} from 'react-final-form';
import DatePickers from '@material-ui/pickers'



function InternalDatePicker({input, meta, label}){
    let error = "";
    if (meta.touched){
        error = meta.error;
    }
    return (
        <>
            <DatePickers
            {...input}
            label = {label}
            value={input.value}
            onChange={event=> input.onChange(event.target.value)}/>
            {error}
        </>
    )
}





function InputData({name, label}){
    return <Field name = {name} label={label} component = {InternalDatePicker}/>
}

export default InputData;