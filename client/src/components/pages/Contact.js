import { useContext, useRef } from 'react';
import emailjs from '@emailjs/browser';
import styled from 'styled-components';
import { Button, FormField, Input, Label, Textarea } from '../../styles';
import { MessageContext } from '../context/message';


const Contact = ({ loading }) => {
  const { setMessage } = useContext(MessageContext)
	const form = useRef();

	const sendEmail = (e) => {
		e.preventDefault();

		emailjs
			.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS1_TEMPLATE_ID, form.current, process.env.REACT_APP_EMAILJS_PUBLIC_KEY)
			.then(
				(result) => {
					console.log(result.text)
          setMessage({message: "Message successfully sent", color: "green"})
				},
				(error) => {
					console.log(error.text);
				}
			)
	};

	return (
		<Wrapper>
			<WrapperChild>
				<form ref={form} onSubmit={sendEmail}>
					<h2>Contact Sugar Rush Mania Team</h2>
					<FormField>
						<Label>Name</Label>
						<Input type='text' name='user_name' />
					</FormField>
					<FormField>
						<Label>Email</Label>
						<Input type='email' name='user_email' />
					</FormField>
					<FormField>
						<Label>Message</Label>
						<Textarea name='message' />
					</FormField>
					<Button type='submit' value='Send'>
						{loading ? 'Sending...' : 'Send Message'}
					</Button>
				</form>
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

export default Contact;
