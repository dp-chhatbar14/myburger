import React from 'react';
import classes from './Input.module.css';   

const Input =(props)=>{

    let inputElement=null
    let classesArray = [classes.InputElement]

    if(props.invalid && props.shouldValid && props.touched){
        classesArray.push(classes.Invalid)
    }

    switch(props.elementType){

        case ('input'):
            inputElement=<input className={classesArray.join(' ')} onChange={props.changed} {...props.elementConfig} value={props.value}/>
            break
        case ('textarea'):
            inputElement=<textarea className={classesArray.join(' ')} onChange={props.changed} {...props.elementConfig} value={props.value}/>
            break
        case ('select'):
            inputElement=(
            <select className={classesArray.join(' ')} onChange={props.changed} value={props.value}>
                {props.elementConfig.options.map(option=>(
                    <option key={option.value} value={option.value}>{option.displayValue}</option>
                ))}
            </select>)
            break
        default:
            inputElement=<input className={classesArray.join(' ')} onChange={props.changed} {...props.elementConfig} value={props.value}/>
    }

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default Input;