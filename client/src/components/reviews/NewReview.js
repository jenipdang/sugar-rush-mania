import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { FormField, Input, Button, Error } from '../../styles';
import { MessageContext } from '../context/message';
import ReviewCard from './ReviewCard';


const NewReview = ({productId}) => {
    const [review, setReview] = useState({
      title: "",
      content: "",
      rating: "",
      event_id: "",
      image_url: ""
    })
    const { setMessage } = useContext(MessageContext)
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const history = useHistory()
    const [image, setImage] = useState()

    const handleChange = (e) => {
      setReview({
        ...review,
        [e.target.name]: e.target.value,
      })
    }

    const onImageChange = (e) => {
      setImage({
        ...image, 
        [e.target.name]: e.target.files[0]
      })
    }

    const handleSubmit = (e) => {
      e.preventDefault()

      fetch (`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
      })
      .then(r => {
        setIsLoading(false);
        if (r.status === 201) {
          r.json()
          .then(review => {
            setReview({title: review.title, content: review.content, rating: review.rating, event_id: review.event_id, image_url: review.image})
            setMessage({message: "Review successfully added", color: "green"})
            history.push('/products')
          })
        } else {
					r.json().then((err) => setErrors(err.errors));
				}
			})
			.catch((err) => setErrors(err.message));
    }
    

    return (
      <>
        <div style={{justifyContent: "center"}}>
          <h5>Add a review</h5>
          <form>
            <FormField>
              <Input
                type='text'
                name='title'
                value={review.title}
                onChange={handleChange}
                placeholder="Title"
              />
            </FormField>
            <FormField>
              <Input
                type='text'
                name='content'
                value={review.content}
                onChange={handleChange}
                placeholder='Review'
              />
            </FormField>
            <FormField>
              <Input
                type='text'
                name='rating'
                value={review.rating}
                onChange={handleChange}
                placeholder='Rating from 1 to 5 (5 is the higest)'
              />
              </FormField>
            <FormField>
              <Input
                type='text'
                name='event_id'
                value={review.event_id}
                onChange={handleChange}
                placeholder='Enter your event order #'
              />
            </FormField>
            <FormField>
						  <Input type='file' name='image' id='image' value={review.image} onChange={onImageChange}/>
					  </FormField>
            <FormField>
              <Button onClick={handleSubmit} color='primary' type='submit'>
                {isLoading ? 'Loading...' : 'Submit'}
              </Button>
            </FormField>
            <FormField>
              {errors?.map((err) => (
                <Error key={err}>{err}</Error>
              ))}
            </FormField>
          </form>
        </div>
        </>
    );
}

export default NewReview