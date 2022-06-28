import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FormField, Input, Label, Textarea } from '../../styles';

const NewProduct = ({ user }) => {
	const [product, setProduct] = useState();
	// const [name, setName ] = useState("")
	// const [price, setPrice ] = useState("")
	// const [description, setDescription ] = useState("")
	// const [category, setCategory ] = useState("")
	const [loading, setLoading] = useState(false);
	// const [image, setImage ] = useState("")
	// const [seasonal, setSeasonal ] = useState("")
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		const formData = new FormData();
		// const formData = new FormData(e.target)
		// formData.append("name", name)
		// formData.append("price", price)
		// formData.append("category", category)
		// formData.append("description", description)
		// formData.append("seasonal", seasonal)
		// formData.append("image", image)

		formData.append('product[name]', e.target.name.value);
		formData.append('product[image]', e.target.image.files[0]);
		formData.append('product[price]', e.target.price.value);
		formData.append('product[description]', e.target.description.value);
		formData.append('product[seasonal]', e.target.seasonal.value);
		formData.append('product[category]', e.target.category.value);
		submitToAPI(formData);
	};
	const submitToAPI = (formData) => {
		fetch('/api/products', {
			method: 'POST',
			body: formData,
		})
			.then((r) => r.json())
			.then((data) => {
				setProduct(data);
				history.push('/products');
			})
			.catch((error) => console.error(error));
	};

	return (
		<Wrapper>
			<WrapperChild>
				<h1>Create A New Product</h1>
				<form onSubmit={(e) => handleSubmit(e)}>
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
						<Label htmlFor='seasonal'>Seasonal</Label>
						<Input type='text' name='seasonal' id='seasonal' placeholder='true/false'/>
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
