import React, { useState, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";

const SocialLoginButton = () => (
	<Fragment>
		<button className="bg-blue-600 text-white py-3 px-6 rounded w-full flex items-center justify-center mt-4">
			<FontAwesomeIcon icon={faFacebook} className=" mr-2 text-white" />
			<span className="text-center">Continue with Facebook</span>
		</button>
		<button className="bg-red-500 text-white py-3 px-6 rounded w-full flex items-center justify-center mt-4">
			<FontAwesomeIcon icon={faGoogle} className=" mr-2 text-white" />
			<span className="text-center">Continue with Google</span>
		</button>
	</Fragment>
);

const SignInForm = () => {
	const [validated, setValidated] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();

		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}

		setValidated(true);
	};

	return (
		<form noValidate validated={validated} onSubmit={handleSubmit}>
			<div className="mb-4">
				<label className="block mb-2 font-normal" htmlFor="email">
					Email Address
				</label>
				<input
					type="text"
					className="w-full bg-blue-50 dark:bg-slate-700 min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-blue-600"
					id="email"
					placeholder="Enter Email Address"
				/>
			</div>
			<div className="mb-4">
				<label className="block mb-2 font-normal" htmlFor="password">
					Password
				</label>
				<input
					type="password"
					className="w-full bg-blue-50 dark:bg-slate-700 min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-blue-600"
					id="password"
					placeholder="Enter Password"
				/>
			</div>
			<div className="mb-4">
				<input type="checkbox" className="mr-2" id="remember-me" checked />
				<label className="font-normal" htmlFor="remember-me">
					Remember me
				</label>
			</div>
			<button className="bg-indigo-900 text-white py-3 px-6 rounded w-full">
				Log In
			</button>
			<button className="hover:text-blue-600 py-2 px-4 rounded-lg w-full">
				Forget your password?
			</button>
			<div className="relative">
				<hr className="my-8 border-t border-gray-300" />
				<span className="px-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#0b1727]">
					Or
				</span>
			</div>
			<SocialLoginButton />
		</form>
	);
};

const SignIn = () => {
	return (
		<section className="ezy__signin6 light py-14 md:py-24 bg-white dark:bg-[#0b1727] text-indigo-900 dark:text-white">
			<div className="container px-4 mx-auto">
				<div className="grid grid-cols-12 gap-6 lg:gap-16 h-full">
					<div className="col-span-12 lg:col-span-5">
						<div
							className="bg-center bg-no-repeat bg-cover w-full min-h-[150px] rounded-[25px] hidden lg:block h-full"
							style={{
								backgroundImage:
									"url(https://cdn.easyfrontend.com/pictures/sign-in-up/sign1.jpg)",
							}}
						></div>
					</div>
					<div className="col-span-12 lg:col-span-5 py-12 lg:ml-20">
						<div className="flex items-center justify-center max-w-lg h-full">
							<div className="w-full mx-auto">
								<h2 className="text-indigo-900 dark:text-white text-2xl font-bold mb-3">
									Welcome to Easy Frontend
								</h2>
								<div className="flex items-center mb-6 md:mb-12">
									<p className="mb-0 mr-2 opacity-50">Don't have an account?</p>
									<a href="#!" className="">
										Create Account
									</a>
								</div>

								<SignInForm />
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};


export default SignIn