import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FormField, Input, Label, Textarea } from '../../styles';

const NewProduct = ({ user }) => {
	const [product, setProduct] = useState();
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		const formData = new FormData();

		formData.append('product[name]', e.target.name.value);
		formData.append('product[image]', e.target.image.files[0]);
		formData.append('product[price]', e.target.price.value);
		formData.append('product[description]', e.target.description.value);
		formData.append('product[category]', e.target.category.value);
		formData.append('user[id]', user.id)
		submitToAPI(formData);
	};
	const submitToAPI = (formData) => {
		fetch('/api/products', {
			method: 'POST',
			body: formData,
		})
			.then((r) => r.json())
			.then((data) => {
				setProduct(orgData => orgData.concat(data));
				history.push('/products');
			})
			.catch((err) => alert(err.errors));
	};

	return (
		<Wrapper>
			<WrapperChild>
				<h1>Create A New Product</h1>
				<form onSubmit={handleSubmit}>
					<FormField>
						<Label htmlFor='name'>Name</Label>
						<Input type='text' name='name' id='name' />
					</FormField>
					<FormField>
						<Label htmlFor='price'>Price $</Label>
						<Input type='text' name='price' id='price' />
					</FormField>
					<FormField>
						<Label htmlFor='category'>Category</Label>
						<Input type='text' name='category' id='category' />
					</FormField>
					<FormField>
						<Label htmlFor='description'>Description</Label>
						<Textarea type='text' name='description' id='description' />
					</FormField>
					<FormField>
						<Label htmlFor='image'>Image</Label>
						<Input type='file' name='image' id='image' />
					</FormField>
					<FormField>
						<button type='submit'>{loading ? "Loading..." : "Create"}</button>
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

export default NewProduct;
