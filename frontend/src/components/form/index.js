import { useState, useRef, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useParams, useNavigate } from 'react-router-dom';
import { create, crudSelector, update } from '../../redux/reducers/crudSlice'
import style from './style.module.scss';

const Form = () => {
  const dispatch = useDispatch();
  const crud = useSelector(crudSelector)
  const ref = useRef();
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})

  const {id} = useParams();
  const navigate = useNavigate();

  useEffect (()=> {
    getInitValue()
}, [id])

const getInitValue = () => {
    const edit = crud.find((item) => +item.id === +id)
    setValues(edit)
}

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
    isValidDateValue(e.target.name, e.target.value)
  }

  const isValidDateValue = (name, value) => {
    if(value.length < 1)
      setErrors({...errors,[name]: {validation: true}})
    else 
      setErrors({...errors, [name]: {validation: false}})
  }

  const handleClick = (e) => {
    e.preventDefault();
    let data = new FormData(e.target);
    let formObject = Object.fromEntries(data.entries());
    console.log(formObject)
    let derrors = {}
    for (let prop in formObject){
      derrors[prop] = {validation: formObject[prop].length < 1 ? true : false}
    }
    setErrors(derrors);

    for(let prop in derrors){
      if(derrors[prop].validation){
        return 0
      }
    }
    

    if(id){
      formObject.id = id
      dispatch(update(formObject))
    }
    else {
      formObject.id = crud.length + 1;
      dispatch(create(formObject))
    }
    navigate('/') 
  }

  const handleReset = (e) => {
    e.preventDefault();
    ref.current.reset();
    setValues({})
  }

  return (
    <div className={style.container}>
    <form ref={ref} onSubmit={handleClick}>
      <div className={style.form_container}>
        <div className={style.form_wrapper}>
          <label>First Name: </label>
          <input value={values?.fname || ''} className={`${style.form_control} ${errors?.fname?.validation ? 'error' : ''}`} onChange={handleChange} type="text" name="fname" />
          {
            errors?.fname?.validation && (
              <label className='error' style={{color: 'red'}}>First Name is Required!</label>
            )
          }
        </div>
        
        <div className={style.form_wrapper}>
          <label>Last Name: </label>
          <input value={values?.lname || ''} className={`${style.form_control} ${errors?.lname?.validation ? 'error' : ''}`} onChange={handleChange} type="text" name="lname" />
          {
            errors?.lname?.validation && (
              <label className={style.error} style={{color: 'red'}}>Last Name is Required!</label>
            )
          }
        </div>
      </div>
      <div className={`${style.form_wrapper} gender`}>
        <label>Gender: </label>
        <input type="radio" checked={values?.gender === 'Male'}  className={errors?.gender?.validation ? style.error : ''} onChange={handleChange}  name="gender" value="Male" /> Male
        <input type="radio" checked={values?.gender === 'Female'} className={errors?.gender?.validation ? style.error : ''} onChange={handleChange}  name="gender" value="Female" /> Female
        <br/>
        {
          errors?.gender?.validation && (
            <label className={style.error} style={{color: 'red'}}>Gender is Required!</label>
          )
        }
      </div>
      
      <div className={style.form_wrapper}> 
        <label> Email: </label>
        <input value={values?.email || ''} className={`${style.form_control} ${errors?.email?.validation ? style.error : ''}`} onChange={handleChange} type="email" name="email" />
        {
          errors?.email?.validation && (
            <label className={style.error} style={{color: 'red'}}>Email is Required!</label>
          )
        }
      </div>
      <div className={style.form_wrapper}> 
        <label>Country: </label>
          <select value={values?.country || ''} name='country' onChange={handleChange} className={`${style.form_control} ${errors?.country?.validation ? 'error' : ''}`}>
            <option value="">select</option>
            <option value="Nepal">Nepal</option>
            <option value="India">India</option>
          </select>
          {
            errors?.country?.validation && (
              <label className={style.error} style={{color: 'red'}}>Country Name is Required!</label>
            )
          }
      </div>
      <div className={style.form_wrapper}> 
        <label> Select DOB: </label>
        <input value={values?.dob || ''} className={`${style.form_control} ${errors?.dob?.validation ? 'error' : ''}`} onChange={handleChange}  type="date" name="dob" />
        {
            errors?.dob?.validation && (
              <label className={style.error} style={{color: 'red'}}>Dob is Required!</label>
            )
          }
      </div>

      <div className={`${style.form_wrapper} ${style.flex_space_between}`}> 
        <button value="submit">Submit</button>
        <button className={style.reset} onClick={handleReset} value="reset">Reset</button>
        <button className={style.gohome} onClick={() => navigate('/')}>Go to Home</button>
      </div>
    </form>
    </div>
  );
}

export default Form;