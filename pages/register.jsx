import { registerValidate } from '@/lib/validate';
import { useFormik } from 'formik';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from 'react-icons/hi';
import Layout from '../layout/layout';
import styles from '../styles/Form.module.css';
import Image from 'next/image';

export default function Register() {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState({
		password: false,
		cpassword: false,
	});
	const formik = useFormik({
		initialValues: {
			username: '',
			email: '',
			password: '',
			cpassword: '',
		},
		validate: registerValidate,
		onSubmit,
	});

	async function onSubmit(values) {
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(values),
		};

		const response = await fetch(
			'http://localhost:3000/api/auth/signup',
			options,
		);
		const data = await response.json();
		if (data) {
			router.push('/');
		}
	}

	function handleGoogleSignIn() {
		// Redireciona o usuário para a página HOME
		signIn('google', { callbackUrl: 'http://localhost:3000' });
	}

	function handleGithubSignIn() {
		// Redireciona o usuário para a página HOME
		signIn('github', { callbackUrl: 'http://localhost:3000' });
	}

	return (
		<Layout>
			<Head>
				<title>Register</title>
			</Head>

			<section className="w-3/4 mx-auto flex flex-col gap-10">
				<div className="title">
					<h1 className="text-gray-800 text-4xl font-bold py-4">
						Register
					</h1>
					<p className="w-3/4 mx-auto text-gray-400">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Dolores, officia?
					</p>
				</div>

				{/* form */}
				<form
					onSubmit={formik.handleSubmit}
					className="flex flex-col gap-5"
				>
					<div className={styles.input_group}>
						<input
							type="text"
							name="username"
							placeholder="Username"
							className={styles.input_text}
							{...formik.getFieldProps('username')}
						/>
						<span className="icon flex items-center px-4">
							<HiOutlineUser size={25} />
						</span>
					</div>
					{formik.errors.username && formik.touched.username && (
						<span className="text-rose-500">
							{formik.errors.username}
						</span>
					)}
					<div className={styles.input_group}>
						<input
							type="email"
							name="email"
							placeholder="Email"
							className={styles.input_text}
							{...formik.getFieldProps('email')}
						/>
						<span className="icon flex items-center px-4">
							<HiAtSymbol size={25} />
						</span>
					</div>
					{formik.errors.email && formik.touched.email && (
						<span className="text-rose-500">
							{formik.errors.email}
						</span>
					)}
					<div className={styles.input_group}>
						<input
							type={`${
								showPassword.password ? 'text' : 'password'
							}`}
							name="password"
							placeholder="Password"
							className={styles.input_text}
							{...formik.getFieldProps('password')}
						/>
						<span
							className="icon flex items-center px-4"
							onClick={() =>
								setShowPassword({
									...showPassword,
									password: !showPassword.password,
								})
							}
						>
							<HiFingerPrint size={25} />
						</span>
					</div>
					{formik.errors.password && formik.touched.password && (
						<span className="text-rose-500">
							{formik.errors.password}
						</span>
					)}
					<div className={styles.input_group}>
						<input
							type={`${
								showPassword.cpassword ? 'text' : 'password'
							}`}
							name="cpassword"
							placeholder="Confirm Password"
							className={styles.input_text}
							{...formik.getFieldProps('cpassword')}
						/>
						<span
							className="icon flex items-center px-4"
							onClick={() =>
								setShowPassword({
									...showPassword,
									cpassword: !showPassword.cpassword,
								})
							}
						>
							<HiFingerPrint size={25} />
						</span>
					</div>
					{formik.errors.cpassword && formik.touched.cpassword && (
						<span className="text-rose-500">
							{formik.errors.cpassword}
						</span>
					)}
					{/* regiser buttons */}
					<div className="input-button">
						<button type="submit" className={styles.button}>
							Sign Up
						</button>
					</div>
					<div className="input-button">
						<button
							onClick={handleGoogleSignIn}
							type="button"
							className={styles.button_custom}
						>
							Sign In with Google{' '}
							<Image
								src={'/assets/google.svg'}
								width="20"
								height={20}
							></Image>
						</button>
					</div>
					<div className="input-button">
						<button
							onClick={handleGithubSignIn}
							type="button"
							className={styles.button_custom}
						>
							Sign In with Github{' '}
							<Image
								src={'/assets/github.svg'}
								width={25}
								height={25}
							></Image>
						</button>
					</div>
				</form>

				{/* bottom */}
				<p className="text-center text-gray-400 ">
					Have an account?{' '}
					<Link href={'/login'} className="text-blue-700">
						Sign In
					</Link>
				</p>
			</section>
		</Layout>
	);
}
