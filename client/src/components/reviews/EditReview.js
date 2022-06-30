import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components';
import { FormField, Input, Label, Textarea, Button, Error } from '../../styles';
import { MessageContext } from '../context/message';

const EditReview = ({reviewObj, handleUpdate}) => {
    const [review, setReview] = useState({
      title: reviewObj.title,
      content: reviewObj.content,
      rating: reviewObj.rating
    })
    const { setMessage } = useContext(MessageContext)
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const history = useHistory()

    const handleChange = (e) => {
      setReview({
        ...review,
        [e.target.name]: e.target.value
      })
    }

    const updatedReview = {
        title: review.title,
        content: review.content,
        rating: review.rating
    }
    const handleSubmit = (e) => {
      e.preventDefault()
 
      fetch (`/api/reviews/${reviewObj.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedReview)
      })
      .then((r) => {
        setIsLoading(false);
        if (r.ok) {
          r.json()
          .then((data) => {
            setMessage({message: "Review was successfully modifed", color: "green"})
            handleUpdate(data)})
          history.push('/products')
        } else {
					r.json().then((err) => setErrors(err.errors));
				}
			})
			.catch((err) => setErrors(err.errors));
    }
    

    return (
      <Wrapper>
			<WrapperChild>
				<h1>Edit A Product</h1>
				<form onSubmit={handleSubmit}>
					<FormField>
						<Label htmlFor='title'>Title</Label>
						<Input type='text' name='title' id='title' value={review.title} onChange={handleChange}/>
					</FormField>
					<FormField>
						<Label htmlFor='category'>Content</Label>
						<Input type='text' name='content' id='content' value={review.content} onChange={handleChange}/>
					</FormField>
					<FormField>
						<Label htmlFor='Rating'>Rating</Label>
						<Textarea type='text' name='rating' id='rating' value={review.rating} onChange={handleChange}/>
					</FormField>
          <FormField>
              {errors?.map((err) => (
                <Error key={err}>{err}</Error>
              ))}
            </FormField>
					<FormField>
						<Button type='submit'>{isLoading ? "Loading..." : "Update"}</Button>
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

export default EditReview