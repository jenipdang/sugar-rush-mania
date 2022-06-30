import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams, useLocation, useHistory, Link } from 'react-router-dom';
import { UserContext } from '../context/user';
import { MdOutlineVerified } from 'react-icons/md';
import EditReview from './EditReview';
import { AiFillEdit } from 'react-icons/ai'
import { MdDeleteForever } from 'react-icons/md'

const ReviewCard = ({ review }) => {
	const [reviewObj, setReviewObj] = useState([]);
	const { reviewId } = useParams;
	const history = useHistory();
	const location = useLocation();
	const [isEditing, setIsEditing] = useState(false);
	const { user } = useContext(UserContext);

	useEffect(() => {
		if (!review) {
			fetch(`/api/reviews/${reviewId}`)
				.then((r) => r.json())
				.then((review) => setReviewObj(review));
		}
	}, [review, reviewId]);

	const finalReview = review ? review : reviewObj;
	if (!finalReview) return 'Loading...';

	const handleDelete = () => {
		fetch(`/api/reviews/${reviewId}`, {
			method: 'DELETE',
		}).then(() => history.push('/products'));
	};

	const handleUpdate = (updatedReviewObj) => {
		setIsEditing(true);
		setReviewObj(updatedReviewObj);
	};

	return (
		<div className='container'>
			{!isEditing ? (
				<>
                <Link style={{
							textDecoration: 'none',
							color: 'red',
							// textTransform: 'uppercase',
						}}
						to={`/reviews/${finalReview.id}`}>
					<h5>
						{finalReview.title} - rating: {finalReview.rating} of 5
					</h5>
                </Link>
					<p>
						<em>{finalReview.content}</em>
					</p>
					<p>
						- {finalReview.post_by} <MdOutlineVerified /> -
					</p>
                {
                    (!isEditing && location.pathname.includes("/reviews")) && (user.username === finalReview.post_by || user?.role === "admin") ? (
                        <div className='actions'>
                            <button onClick={() => setIsEditing((isEditing) => !isEditing)} style={{border: "none", backgroundColor: "white"}}>
                                <span aria-label='edit'>
                                <AiFillEdit />
                                </span>
                            </button>
                            <button onClick={handleDelete} style={{border: "none", padding: "20px", backgroundColor: "white"}}>
                                <span aria-label='delete'>
                                <MdDeleteForever />
                                </span>
                            </button>
                        </div>
                        ) : null 
                }
				</>
			) : <EditReview handleUpdate={handleUpdate} reviewObj={finalReview} id={reviewId} />}
		</div>
	);
};

export default ReviewCard;
