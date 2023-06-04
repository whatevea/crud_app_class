import { useDispatch, useSelector } from "react-redux";
import style from "./style.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logout } from "../../../redux/reducers/loginSlice";
const Header = ({ page }) => {
	let dispatcher = useDispatch();
	const [showDD, setShowDD] = useState(false);
	const navigator = useNavigate();
	let crumb = "";
	let userData = useSelector((state) => state.login);
	if (page === "home") crumb = <a href="/">Home</a>;
	if (page === "form")
		crumb = (
			<>
				<a href="/">Home</a> {" > "}
				<a href="/form">Form</a>{" "}
			</>
		);
	function editProfile() {
		navigator("/auth/edit");
	}
	function handleClick() {
		setShowDD(true);
	}
	function logOut() {
		dispatcher(logout());
	}
	return (
		<div className={style.container}>
			<nav>
				<div className={style.crumb}>{crumb}</div>
				<div>
					<ul>
						<li className={page === "home" ? style.active : ""}>
							<Link to="/">Home</Link>
						</li>
						<li className={page === "form" ? style.active : ""}>
							<Link to="/form">Add New Record</Link>
						</li>
					</ul>
				</div>
				<div className={style.outsideUserLoggedIn}>
					{userData.isLoggedIn ? (
						<div className={style.userLoggedIn}>
							<div className={style.onlineDot}></div>
							<span type="button" onClick={handleClick}>
								Hi, {userData.loggedUser.fname || userData.loggedUser.email.split("@")[0]}
							</span>
							{showDD && (
								<div className={style.dropdown}>
									<ul className={style.list}>
										<li onClick={editProfile}>Edit Profile</li>
										<li>Change Password</li>
										<li onClick={logOut}>Logout</li>
									</ul>
								</div>
							)}
						</div>
					) : (
						<>
							<Link to="/auth/login">Login</Link>&nbsp;|&nbsp;
							<Link to="/auth/register">Register</Link>{" "}
						</>
					)}
				</div>
			</nav>
		</div>
	);
};

export default Header;

{
	/* <div class="dropdown">
	<button class="dropdown-btn">Hover me</button>
	<div class="dropdown-content">
	  <a href="#">Item 1</a>
	  <a href="#">Item 2</a>
	  <a href="#">Item 3</a>
	</div>
  </div>; */
}
