import { Link } from 'react-router-dom';
import dateformat from 'dateformat';
import './profile.css';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useContext } from 'react';
import { UserContext } from '../context/user';

const Profile = () => {
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
						<ul>
						{user.posted_products?.map((posted_product) => (
										<li key={posted_product.id}>
											<p>
												<Link
													style={{ textDecoration: 'none', color: 'black' }}
													to={`/products/${posted_product.id}`}
													className='userShowInfoTitle'
												>
													{posted_product.name} 
													|| events ordered:{' '}
													{posted_product.ordered} 
													|| current selling price: $
													{posted_product.price} || total sale: $ {posted_product.total_sale}{' '}||
													<img
														style={{ width: '50px', height: '50px' }}
														src={posted_product.image_url.url} 
														alt={posted_product.name}
														/>{' '}
													|| last update: {dateformat(posted_product?.updated_at, 'dddd, mmmm dS yyyy')}
												</Link>
											</p>
										</li>
									))}
						</ul>
					</div>
				) : null}
			</div>
			<div className='user'>
				<div className='userShow'>
					<span className='userShowTitle'>
						Reviews History || Total Products Reviewed: {user?.total_products_reviewed}
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
			<div className='user'>
				{user?.role === 'guest' ? (
					<div className='userShow'>
						<span className='userShowTitle'>Hosted Events</span>
						<ul>
						{user.hosted_events?.map((hosted_event) => (
										<li key={hosted_event.id}>
											<p className='userShowInfoTitle'>{hosted_event.name} || 
											{hosted_event.address}
											|| total: ${hosted_event.event_total} || 
											Total Type of Products Ordered: <span>{hosted_event.total_products_ordered}</span>
											</p>
										</li>
									))}
						</ul>
					</div>
				) : null}
			</div>
			<div className='user'>
				{user?.role === 'guest' ? (
					<div className='userShow'>
						<span className='userShowTitle'>Products Ordered from Events</span>
						<ul>
						{user.hosted_events.map((event) => (
										<li key={event.id}>
											<p className='userShowInfoTitle'>{event.name} : 
											{event.products_ordered?.map((po) => (
											<li key={po.id}>
												{po}
											</li>
											))}
											</p> 
										</li>
									))}
						</ul>
					</div>
				) : null}
			</div>

		</>
	);
};
export default Profile;
