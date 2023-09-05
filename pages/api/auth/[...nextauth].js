import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import connection from '@/database/conn';
import User from '@/model/UserSchema';
import { compare } from 'bcryptjs';

export default NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		}),
		CredentialsProvider({
			name: 'Credentials',
			async authorize(credentials, req) {
				connection().catch(error => { error: 'Connection Failed' });

				const result = await User.findOne({ email: credentials.email });

				if (!result) {
					throw new Error('Invalid Credentials');
				}

				const checkPassword = await compare(credentials.password, result.password);

				if (!checkPassword) {
					throw new Error('Invalid Credentials');
				}

				return result;
			},
		}),
	],
	secret: process.env.API_SECRET,
});
