import style from './style.module.scss'
import { useSelector,useDispatch } from 'react-redux';
import { login } from '../../redux/reducers/loginSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate=useNavigate() 
  const [values,setValues]=useState({})
    const[errors,setErrors]=useState({})
    const users = useSelector((state) => state.users);
    const dispatch = useDispatch()
    const handleLogin = (e) => {
        console.log(errors)
        e.preventDefault()
    let totalErrors=0;
        for (let item in errors){
            if(errors[item].containsError){
                totalErrors++
            }   
        }
    console.log("total errors is ", totalErrors)
    
    //if no errors do this
    if(totalErrors===0){
      console.log(users)  
      const email=values.email;
        const password= values.password;
    const loggedUser =    users.find(item=>email===item.email && password===item.password)
          if(!loggedUser){
            setErrors({email:{containsError:true,message:"Incorrect details"}})
          return 0
          }
          dispatch(login(loggedUser))
          navigate("/")
    }


    }
    const handleChange=(e)=>{
        const { name, value } = e.target;
        setValues({...values,[name]:value})
        checkEmpty(name,value);
    }

    return (
      <div className={style.container}>
        <form onSubmit={handleLogin}>
          <h2>Login</h2>

          <div className={style.wrapper}>
            <label>Email: </label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              onChange={ handleChange }
            />
            {errors?.email?.containsError && <div>{errors.email.message}</div>}
          </div>

          <div className={style.wrapper}>
            <label>Password: </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
            />
            {errors?.password?.containsError && <div>{errors.password.message}</div>}
          </div>

          <div className={`${style.wrapper} ${style.inline}`}>
            <input type="submit" name="submit" value="Submit" />
            <input type="reset" name="reset" value="Reset" />
          </div>
        </form>
      </div>
    );
    function checkEmpty(name,value){

value.length<1 ? setErrors({...errors,[name]:{containsError:true,message:`${name} is required`}}) : setErrors({...errors,[name]:{containsError:false}})
    console.log("calling from checkEmpty",value);

}
}

export default Login