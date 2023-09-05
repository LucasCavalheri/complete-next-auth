import connection from '@/database/conn';
import User from '@/model/UserSchema';
import { hash } from 'bcryptjs';

export default async function POST(req, res) {
	connection().catch((error) =>
		res.json({ error: 'Connection Failed', message: error }),
	);

	if (!req.body) {
		res.statusCode = 404;
		res.json({ message: 'Invalid Request' });
		return;
	}

	const { username, email, password } = req.body;

	const userExists = await User.findOne({ email });
	if (userExists) {
		res.statusCode = 400;
		res.json({ message: 'User already exists' });
		return;
	}

	const user = User.create({
		username,
		email,
		password: await hash(password, 8),
	});

	res.statusCode = 201;
	res.json({ message: 'User created', user: user });
}
