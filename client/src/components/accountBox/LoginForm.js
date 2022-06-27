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

export function LoginForm(props, onLogin) {
	const { switchToSignup } = useContext(AccountContext);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const history = useHistory();

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
			if (r.ok) {
				r.json().then((user) => {
					onLogin(user);
					history.push('/products');
				});
			} else {
				r.json().then((err) => alert(err.errors));
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

