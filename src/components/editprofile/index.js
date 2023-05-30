import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./style.module.scss";
import { update } from "../../redux/reducers/userSlice";
import { login } from "../../redux/reducers/loginSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const Edit = () => {
	const navigator = useNavigate()
	const allUsers = useSelector((state) => state.users);
	const loggedUser = useSelector((state) => state.login.loggedUser);
	const userItem = allUsers.find((item) => item.id === loggedUser.id);
	const [values, setValues] = useState(userItem);
	const ref = useRef()
	const dispatcher = useDispatch()
	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });

	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatcher(update(values))
		dispatcher(login(values))
		Swal.fire({
			position: "top",
			icon: "success",
			title: "User data has been updated successfully",
			showConfirmButton: false,
			timer: 1300,
			width: "400px"
		})
		navigator("/")
	}

	const handleReset = (e) => {
		e.preventDefault();
		setValues({})
		ref.current.reset()
		// setErrors({})
	}
	return (
		<form ref={ref} onSubmit={handleSubmit}>
			<div className={style.container}>
				<div className="item">
					<label>Email:</label>
					<input name="email" value={values?.email} onChange={handleChange} />
				</div>

				<div className="item">
					<label>FirstName:</label>
					<input name="fname" value={values?.fname} onChange={handleChange} />

				</div>

				<div className="item">
					<label>LastName:</label>
					<input name="lname" value={values?.lname} onChange={handleChange} />

				</div>
				<div className="item">
					<label>Phone:</label>
					<input name="phone" value={values?.phone} onChange={handleChange} />
				</div>
				<div className={style.buttons}>
					<input className="btn btn-primary" type="submit" />
					<input className="btn btn-primary" type="reset" onClick={handleReset} />
				</div>
			</div>
		</form>
	);
};
export default Edit;
