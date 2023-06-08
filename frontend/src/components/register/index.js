import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { create, userSelector } from "../../redux/reducers/userSlice";
import style from "./style.module.scss";
import axios from "axios"
const regUrl = "http://localhost:5000/register"
const Register = () => {
    const dispatch = useDispatch();
    const users = useSelector(userSelector);
    const ref = useRef();
    const [values, setValues] = useState({
        email: "",
        password: "",
        confirm_password: "",
        phone_number: "",
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();


    const handleRegister = (e) => {
        e.preventDefault();
        //insert into database
        axios.post(regUrl, values).then(data => {
            console.log("sending data")
        }).catch(err => { console.log(err) })


        let derrors = {};
        // checking if form values are empty 
        for (let data in values) {
            derrors[data] = {
                validation: values[data].length < 1 ? true : false,
                message: `${data} required`,
            };

            if (data === "email") {
                let ourEmail = values[data];
                users.forEach((item) => {
                    if (item.email === ourEmail) {
                        derrors[data] = {
                            validation: true,
                            message: "Email already in use",
                        };
                    }
                });
            }

            if (data === "password") {
                !checkPassword(values[data])
                    ? (derrors[data] = { validation: true, message: "Invalid password" })
                    : (derrors[data] = { validation: false });
            }

            if (data === "confirm_password") {
                let password = values[data];
                let confirm_password = values.password;
                if (password !== confirm_password) {
                    derrors[data] = {
                        validation: true,
                        message: "Password doesnot match",
                    };
                }
            }

            if (data === "phone_number") {
                !checkNumber(values[data])
                    ? (derrors[data] = {
                        validation: true,
                        message: "Invalid Phone Number",
                    })
                    : (derrors[data] = { validation: false });
            }
        }
        setErrors(derrors);

        // Checking if any error consists
        for (let prop in derrors) {
            if (derrors[prop].validation) {
                return 0;
            }
        }

        dispatch(create(values));
        console.log("dispatched");
        navigate("/auth/login");
    };

    // Handling form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        isValidValue(name, value);
        setValues({ ...values, [name]: value });
    };

    const isValidValue = (name, value) => {
        if (value.length < 1)
            setErrors({
                ...errors,
                [name]: { validation: true, message: `Please enter ${name}` },
            });
        else {
            switch (name) {
                case "email":
                    let emailRegex = /.*\@.*[.].*/;
                    let isEmail = emailRegex.test(value);
                    !isEmail
                        ? setErrors({
                            ...errors,
                            [name]: { validation: true, message: "Invalid Email" },
                        })
                        : setErrors({ ...errors, [name]: { validation: false } });
                    //check duplicate email
                    let isAnotherUser = users.find((item) => item.email === value);
                    if (isAnotherUser) {
                        console.log("antoher user exist");
                        setErrors({
                            ...errors,
                            [name]: { validation: true, message: "Email is already in use" },
                        });
                    }
                    break;
                case "password":
                    let isPwValid = checkPassword(value);
                    console.log(isPwValid)
                    if (!isPwValid) {
                        setErrors({
                            ...errors,
                            [name]: { validation: true, message: "Password too weak" },
                        });
                    } else {
                        setErrors({
                            ...errors,
                            [name]: {
                                validation: false,
                            },
                        });
                    }
                    break;
                case "confirm_password":
                    console.log(values)
                    if (value !== values.password) {
                        setErrors({
                            ...errors,
                            [name]: { validation: true, message: "Passwords donot Match" },
                        });
                    }
                    break;
                default:
                    setErrors({ ...errors, [name]: { validation: false } });
            }
        }
    };

    const handleReset = (e) => {
        e.preventDefault();
        ref.current.reset();
        setValues({});
        setErrors({});
    };

    // Password Checker
    function checkPassword(str) {
        return str.length > 8 ? true : false;
    }

    function checkNumber(str) {
        let re = /^(97|98)\d{8}$/;
        return re.test(str);
    }
    return (
        <div className={style.container}>
            <form onSubmit={handleRegister} ref={ref}>
                <h2>Register</h2>
                <div className={style.wrapper}>
                    <label>Email: </label>
                    <input
                        className="form_control"
                        name="email"
                        type="email"
                        placeholder="email"
                        onChange={handleChange}
                    />
                    {errors?.email?.validation && (
                        <label className={style.error}>{errors.email.message}</label>
                    )}
                </div>

                <div className={style.wrapper}>
                    <label>Password: </label>
                    <input
                        className="form_control"
                        name="password"
                        type="password"
                        placeholder="password"
                        onChange={handleChange}
                    />
                    {errors?.password?.validation && (
                        <label className={style.error}>{errors.password.message}</label>
                    )}
                </div>

                <div className={style.wrapper}>
                    <label>Confirm Password: </label>
                    <input
                        className={`${errors?.confirm_password?.validation ? "input_error" : ""
                            }`}
                        name="confirm_password"
                        type="password"
                        placeholder="confirm pass"
                        onChange={handleChange}
                    />
                    {errors?.confirm_password?.validation && (
                        <label className={style.error}>
                            {errors.confirm_password.message}
                        </label>
                    )}
                </div>

                <div className={style.wrapper}>
                    <label>Phone Number: </label>
                    <input
                        className={`${errors?.phone_number?.validation ? "input_error" : ""
                            }`}
                        name="phone_number"
                        type="number"
                        placeholder="Phone Number"
                        onChange={handleChange}
                    />
                    {errors?.phone_number?.validation && (
                        <label className={style.error}>{errors.phone_number.message}</label>
                    )}
                </div>

                <div className={`${style.wrapper} ${style.inline}`}>
                    <button value="submit">Submit</button>
                    <button value="reset" onClick={handleReset}>
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;
