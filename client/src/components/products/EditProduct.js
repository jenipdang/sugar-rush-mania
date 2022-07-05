import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FormField, Input, Label, Textarea, Button, Error } from '../../styles';
import { MessageContext } from '../context/message';

const EditProduct = ({ productObj, handleUpdate }) => {
	const [product, setProduct] = useState({
		name: productObj.name,
		price: productObj.price,
		description: productObj.description,
		category: productObj.category,
	});

	const [isLoading, setIsLoading] = useState(false);
	const history = useHistory();
	const { setMessage } = useContext(MessageContext);
	const [errors, setErrors] = useState([])

	const handleChange = (e) => {
		setProduct({
			...product,
			[e.target.name]: e.target.value,
		});
	};

	const updatedProduct = {
		name: product.name,
		price: product.price,
		description: product.description,
		category: product.category,
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// if (
		// 	[product.name, product.price, product.description, product.category].some(
		// 		(val) => val.trim() === ''
		// 	)
		// ) {
		// 	alert('All information mmust be fill out.');
		// }

		setIsLoading(true);

		fetch(`/api/products/${productObj.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatedProduct),
		})
			.then((r) => {
				setIsLoading(false);
				if (r.ok) {
					r.json().then((data) => {
						setMessage({
							message: 'Successfully update the product information',
							color: 'green',
						});
						handleUpdate(data);
					});
					history.push('/products');
				} else {
					r.json().then((err) => setErrors(err.errors));
				}
			})
			.catch((err) => setErrors(err.errors));
	};

	return (
		<Wrapper>
			<WrapperChild>
				<h1>Edit A Product</h1>
				<form onSubmit={handleSubmit}>
					<FormField>
						<Label htmlFor='name'>Name</Label>
						<Input
							type='text'
							name='name'
							id='name'
							value={product.name}
							onChange={handleChange}
						/>
					</FormField>
					<FormField>
						<Label htmlFor='price'>Price $</Label>
						<Input
							type='text'
							name='price'
							id='price'
							value={product.price}
							onChange={handleChange}
						/>
					</FormField>
					<FormField>
						<Label htmlFor='category'>Category</Label>
						<Input
							type='text'
							name='category'
							id='category'
							value={product.category}
							onChange={handleChange}
						/>
					</FormField>
					<FormField>
						<Label htmlFor='description'>Description</Label>
						<Textarea
							type='text'
							name='description'
							id='description'
							value={product.description}
							onChange={handleChange}
						/>
					</FormField>
					<FormField>
						{errors?.map((err) => (
							<Error key={err}>{err}</Error>
						))}
					</FormField>
					<FormField>
						<Button type='submit'>{isLoading ? 'Loading...' : 'Update'}</Button>
					</FormField>
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

export default EditProduct;
