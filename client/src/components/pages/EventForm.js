import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { Button, Error, FormField, Input, Label } from '../../styles';
import { MessageContext } from '../context/message';
import { UserContext } from '../context/user';

const EventForm = () => {
	const [event, setEvent] = useState({
		name: '',
		datetime: '',
		location: '',
		address: '',
	});

	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState([]);
	const history = useHistory();
	const { user, setUser } = useContext(UserContext);
	const { setMessage } = useContext(MessageContext);

	const handleChange = (e) => {
		setEvent({
			...event,
			[e.target.name]: e.target.value,
		});
	};

	const newEvent = {
		name: event.name,
		datetime: event.datetime,
		location: event.location,
		address: event.address,
		user_id: user.id,
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			[event.name, event.datetime, event.location, event.address].some(
				(val) => val.trim() === ''
			)
		) {
			alert('All information must be fill out.');
		}

		setIsLoading(true);

		fetch(`/api/users/${user.id}/events`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newEvent),
		})
			.then((r) => {
				setIsLoading(false);
				if (r.ok) {
					r.json().then((data) => {
						setMessage({
							message: 'Successfully add a new event',
							color: 'green',
						});
						setEvent(data);
						setUser((user) => ({
							...user,
							hosted_events: [...user.hosted_events, data],
						}));
					});
					history.push('/cart');
				} else {
					r.json().then((err) => setErrors(err.errors));
				}
			})
			.catch((err) => setErrors(err.errors));
	};

	return (
		<Wrapper>
			<WrapperChild>
				<h2>Create a New Event Details</h2>
				<form onSubmit={handleSubmit}>
					<FormField>
						<Label htmlFor='name'>Event Name</Label>
						<Input
							type='text'
							name='name'
							value={event.name}
							onChange={handleChange}
						/>
					</FormField>
					<FormField>
						<Label htmlFor='date'>Event Date</Label>
						<Input
							type='datetime'
							name='datetime'
							placeholder='MM/DD/YY'
							value={event.datetime}
							onChange={handleChange}
						/>
					</FormField>
					<FormField>
						<Label htmlFor='address'>Address</Label>
						<Input
							type='text'
							name='address'
							value={event.address}
							onChange={handleChange}
						/>
					</FormField>
					<FormField>
						<Label htmlFor='location'>Location</Label>
						<Input
							type='text'
							name='location'
							value={event.location}
							onChange={handleChange}
						/>
					</FormField>
					<FormField>
						<Button color='primary' type='submit'>
							{isLoading ? 'Loading...' : 'Submit Event'}
						</Button>
					</FormField>
					<FormField>
						{errors?.map((err) => (
							<Error key={err}>{err}</Error>
						))}
					</FormField>
				</form>
			</WrapperChild>
			<WrapperChild>
				<h1>{event.name}</h1>
				<h4>{event.datetime}</h4>
				<p>
					{event.location} || {event.address}
				</p>
			</WrapperChild>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	max-width: 1000px;
	margin: 40px auto;
	padding: 16px;
	display: flex;
	gap: 24px;
`;

const WrapperChild = styled.div`
	flex: 1;
`;

export default EventForm;
