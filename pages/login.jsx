import { loginValidate } from '@/lib/validate';
import styles from '@/styles/Form.module.css';
import { useFormik } from 'formik';
import { signIn } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { HiAtSymbol, HiFingerPrint } from 'react-icons/hi';
import Layout from '../layout/layout';

export default function Login() {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [apiError, setApiError] = useState(null);
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validate: loginValidate,
		onSubmit,
	});

	async function onSubmit(values) {
		const status = await signIn('credentials', {
			redirect: false,
			email: values.email,
			password: values.password,
			callbackUrl: '/',
		});

		if (status.ok) {
			router.push(status.url);
		}

		if (!status.ok) {
			setApiError(status.error);
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
				<title>Login</title>
			</Head>
			<section className="w-3/4 mx-auto flex flex-col gap-10">
				<div className="title">
					<h1 className="text-gray-800 text-4xl font-bold py-4">
						Explore
					</h1>
					<p className="w-3/4 mx-auto text-gray-500">
						Lorem ipsum dolor sit amet, consectetur adipisicing
						elit. Laboriosam tempora distinctio deserunt labore,
						culpa ut!
					</p>
				</div>
				{/* Form */}
				<form
					onSubmit={formik.handleSubmit}
					className="flex flex-col gap-5"
				>
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
							type={`${showPassword ? 'text' : 'password'}`}
							name="password"
							placeholder="Password"
							className={styles.input_text}
							{...formik.getFieldProps('password')}
						/>
						<span
							onClick={() => setShowPassword(!showPassword)}
							className="icon flex items-center px-4"
						>
							<HiFingerPrint size={25} />
						</span>
					</div>
					{formik.errors.password && formik.touched.password && (
						<span className="text-rose-500">
							{formik.errors.password}
						</span>
					)}

					{/* login buttons */}
					<div className="input-button">
						<button type="submit" className={styles.button}>
							Login
						</button>
					</div>
					{apiError && (
						<span className="text-rose-500">{apiError}</span>
					)}
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
				{/* Bottom */}
				<p className="text-center text-gray-400">
					Don't have an account yet?{' '}
					<Link href={'/register'} className="text-blue-700">
						Sign Up
					</Link>
				</p>
			</section>
		</Layout>
	);
}
