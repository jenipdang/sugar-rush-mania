import { Link } from 'react-router-dom';
import dateformat from 'dateformat';
import './profile.css';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/user';

const Profile = () => {
	const [sort, setSort] = useState(false);
	const { user } = useContext(UserContext);

	return (
		<>
			<div className='user'>
				<div className='userTitleContainer'>
					<h1 className='userTitle'>User Profile</h1>
				</div>
				<div className='userContainer'>
					<div className='userShow'>
						<div className='userShowBottom'>
							<span className='userShowTitle'>Account Details</span>
							<div className='userShowInfo'>
								<PermIdentityIcon className='userShowIcon' />
								<span className='userShowInfoTitle'>{user?.username}</span>
							</div>
							<span className='userShowTitle'>Active Since</span>
							<div className='userShowInfo'>
								<CalendarTodayIcon className='userShowIcon' />
								<span className='userShowInfoTitle'>
									{user?.created_at
										? dateformat(user?.created_at, 'dddd, mmmm dS yyyy')
										: ''}
								</span>
							</div>
							<span className='userShowTitle'>Contact Details</span>
							<div className='userShowInfo'>
								<MailOutlineIcon className='userShowIcon' />
								<span className='userShowInfoTitle'>{user?.email}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='user'>
				{user?.role === 'admin' ? (
					<div className='userShow'>
						<span className='userShowTitle'>Posted Products</span>
						<button
							className='btn btn-outline-secondary d-grid'
							onClick={() => setSort((bool) => !bool)}
						>
							{!sort ? 'Sort A-Z' : 'Unsort'}
						</button>
						<ul>
							{!sort ? (
								<>
									{' '}
									{user.posted_products?.map((posted_product) => (
										<li key={posted_product.id}>
											<p>
												<Link
													style={{ textDecoration: 'none', color: 'black' }}
													to={`/products/${posted_product.id}`}
													className='userShowInfoTitle'
												>
													{posted_product.name} || ordered:{' '}
													{posted_product.ordered} || current selling price: $
													{posted_product.price} || total sale of ${posted_product.total_sale}{' '}||{' '}
													<img
														style={{ width: '50px', height: '50px' }}
														src={posted_product.image_url} 
														/>{' '}
													|| last update: {dateformat(posted_product?.updated_at, 'dddd, mmmm dS yyyy')}
												</Link>
											</p>
										</li>
									))}
								</>
							) : (
								<>
									{user.sort_products?.map((product_sorted) => (
										<li key={product_sorted.id}>
											<p>
												<Link
													style={{ textDecoration: 'none', color: 'black' }}
													to={`/events/${product_sorted.id}`}
													className='userShowInfoTitle'
												>
													{product_sorted.name}
												</Link>
											</p>
										</li>
									))}
								</>
							)}
						</ul>
					</div>
				) : null}
			</div>
			<div className='user'>
				{user?.role === 'admin' ? (
					<div className='userShow'>
						<span className='userShowTitle'>Past Orders</span>
						<button
							className='btn btn-outline-secondary d-flex'
							onClick={() => setSort((bool) => !bool)}
						>
							{!sort ? 'Sort A-Z' : 'Unsort'}
						</button>
						<ul>
							{!sort ? (
								<>
									{user.created_orders?.map((created_order) => (
										<li key={created_order.id}>
											<p className='userShowInfoTitle'>{created_order.name}</p>
										</li>
									))}
								</>
							) : (
								<>
									{user.sort_events?.map((order_sort) => (
										<li key={order_sort.id}>
											<p className='userShowInfoTitle'>{order_sort.name}</p>
										</li>
									))}
								</>
							)}
						</ul>
					</div>
				) : null}
			</div>
			<div className='user'>
				{user?.role === 'admin' ? (
					<div className='userShow'>
						<span className='userShowTitle'>Hosted Events</span>
						<button
							className='btn btn-outline-secondary d-flex'
							onClick={() => setSort((bool) => !bool)}
						>
							{!sort ? 'Sort A-Z' : 'Unsort'}
						</button>
						<ul>
							{!sort ? (
								<>
									{user.created_events?.map((created_event) => (
										<li key={created_event.id}>
											<p className='userShowInfoTitle'>{created_event.name}</p>
										</li>
									))}
								</>
							) : (
								<>
									{user.sort_events?.map((event_sort) => (
										<li key={event_sort.id}>
											<p className='userShowInfoTitle'>{event_sort.name}</p>
										</li>
									))}
								</>
							)}
						</ul>
					</div>
				) : null}
			</div>
			<div className='user'>
				<div className='userShow'>
					<span className='userShowTitle'>
						Reviews History || Total Products Reviewed{' '}
						{/* {user.total_commented_products} */}
					</span>
					<ul>
						{user?.reviews.map((review) => (
							<li key={review.id}>
								<Link
									style={{ textDecoration: 'none', color: 'black' }}
									to={`/reviews/${review.id}`}
									className='userShowInfoTitle'
								>
									{review.content} || {review.product_name} ||{' '}
									{review.created_at
										? dateformat(user?.created_at, 'dddd, mmmm dS yyyy')
										: ''}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};
export default Profile;
