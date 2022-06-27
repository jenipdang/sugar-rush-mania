import { useContext, useState } from 'react';
import {
	BoldLink,
	BoxContainer,
	FormContainer,
	Input,
	MutedLink,
	SubmitButton,
} from './styles';
import { Marginer } from '../accountBox/marginer/marginer';
import { AccountContext } from './accountContext';

export function SignupForm(props, onLogin) {
	const { switchToSignin } = useContext(AccountContext);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	function handleSubmit(e) {
		e.preventDefault();
		setIsLoading(true);
		fetch('/api/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
				email,
				password,
				password_confirmation: passwordConfirmation,
			}),
		}).then((r) => {
			setIsLoading(false);
			if (r.ok) {
				r.json().then((user) => onLogin(user));
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
						type='text'
						placeholder='Username'
						onChange={(e) => setUsername(e.target.value)}
					/>
					<Input
						id='email'
						type='email'
						placeholder='Email'
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						id='password'
						type='password'
						placeholder='Password'
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Input
						id='password_confirmation'
						type='password'
						placeholder='Password Confirmation'
						onChange={(e) => setPasswordConfirmation(e.target.value)}
					/>
				</FormContainer>
				<Marginer direction='vertical' margin={10} />
				<SubmitButton type='submit'>
					{isLoading ? 'Loading' : 'Signup'}
				</SubmitButton>
				<Marginer direction='vertical' margin='1em' />
				<MutedLink>
					Already have an account?
					<BoldLink onClick={switchToSignin}>Signin</BoldLink>
				</MutedLink>
			</form>
		</BoxContainer>
	);
}
