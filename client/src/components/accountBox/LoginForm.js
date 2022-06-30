import { useContext, useState } from 'react';
import {
	BoldLink,
	BoxContainer,
	FormContainer,
	Input,
	MutedLink,
	SubmitButton,
} from './styles';
import { Marginer } from './marginer/marginer';
import { AccountContext } from './accountContext';
import { useHistory } from 'react-router-dom';
import { MessageContext } from '../context/message';
import { UserContext } from '../context/user';

export function LoginForm() {
	const { switchToSignup } = useContext(AccountContext);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const history = useHistory();
	const { setMessage } = useContext(MessageContext)
	const { onLogin } = useContext(UserContext)

	function handleSubmit(e) {
		e.preventDefault();
		setIsLoading(true);
		fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
		}).then((r) => {
			setIsLoading(false);
			if (r.status === 200) {
				r.json().then((user) => {
					onLogin(user);
					setMessage({message: "User successfully logged in.", color: "green"})
					history.push('/products');
				});
			} else {
				r.json().then((err) => alert(err.errors))
				// r.json().then((err) => setMessage({message: err.errors, color: "red"}));
			}
		});
	}

	return (
		<BoxContainer>
			<form onSubmit={handleSubmit}>
			<FormContainer>
				<Input
					id='username'
					value={username}
					type='username'
					placeholder='Username'
					onChange={(e) => setUsername(e.target.value)}
				/>
				<Input
					id='password'
					value={password}
					type='password'
					placeholder='Password'
					onChange={(e) => setPassword(e.target.value)}
				/>
			</FormContainer>
			<Marginer direction='vertical' margin={10} />
			<Marginer direction='vertical' margin='1.6em' />
			<SubmitButton type='submit'>
				{isLoading ? 'Loading' : 'Signin'}
			</SubmitButton>
			<Marginer direction='vertical' margin='1em' />
			<MutedLink >
				Don't have an accoun?{' '}
				<BoldLink onClick={switchToSignup}>
					Signup
				</BoldLink>
			</MutedLink>
			</form>
		</BoxContainer>
	);
}

