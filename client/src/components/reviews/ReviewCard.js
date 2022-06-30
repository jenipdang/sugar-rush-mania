import { useContext } from 'react'
import { useEffect } from 'react'
import {useState} from 'react'
import { useParams, useLocation, useHistory } from 'react-router-dom'
import { UserContext } from '../context/user'

const ReviewCard = ({review}) => {
    const [reviewObj, setReviewObj] = useState([])
    const { reviewId } = useParams
    const history = useHistory()
    const location = useLocation()
    const [isEditing, setIsEditing] = useState(false)
    const { user } = useContext(UserContext)

    useEffect(() => {
        if (!review) {
            fetch(`/api/reviews/${reviewId}`)
            .then((r) => r.json())
            .then((review) => setReviewObj(review))
        }
    }, [review, reviewId])

    const finalReview = review ? review : reviewObj
    if (!finalReview) return "Loading..."

    const handleDelete = () => {
        fetch(`/api/reviews/${reviewId}`, {
            method: "DELETE"
        }).then(() => history.push("/products"))
    }

    const handleUpdate = (updatedReviewObj) => {
        setIsEditing(true)
        setReviewObj(updatedReviewObj)
    }

  return (
    <div className='container'>
        <h5>{finalReview.title} || rating: {finalReview.rating} of 5</h5>
        <p><em>{finalReview.content}</em></p>
        <p>{finalReview.post_by}</p>
    </div>
  )
}

export default ReviewCard