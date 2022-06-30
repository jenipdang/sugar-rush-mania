import {useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReviewCard from './ReviewCard'

const ReviewsList = ({ reviews }) => {
  const { productId } = useParams()
  const [reviewsList, setReviewsList] = useState(null)

  useEffect(() => {
    if (!reviews) {
      fetch(`/api/products/${productId}/reviews`)
      .then((r) => {
        if (r.status === 200) {
          r.json()
          .then((reviews) => setReviewsList(reviews))
        } else {
          r.json()
          .then((err) => alert(err.errors))
        }
      })
      .catch((err) => alert(err.errors))
    }
  }, [reviews, productId])

  const finalReviewsList = reviews ? reviews : reviewsList

  const displayReviews = finalReviewsList?.map(review => 
  <ReviewCard key={review.id} review={review} />)

  return (
    <div>{displayReviews}</div>
  )
}

export default ReviewsList