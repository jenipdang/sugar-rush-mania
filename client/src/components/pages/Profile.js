import { Link } from 'react-router-dom';
import dateformat from 'dateformat';
import './profile.css';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useState } from 'react';

const Profile = ({ user }) => {
	const [sortEvent, setSortEvent] = useState(false);
	const [sortVenue, setSortVenue] = useState(false);

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
								<span className='userShowInfoTitle'>{user.username}</span>
							</div>
							<span className='userShowTitle'>Active Since</span>
							<div className='userShowInfo'>
								<CalendarTodayIcon className='userShowIcon' />
								<span className='userShowInfoTitle'>
									{user.created_at
										? dateformat(user.created_at, 'dddd, mmmm dS yyyy')
										: ''}
								</span>
							</div>
							<span className='userShowTitle'>Contact Details</span>
							<div className='userShowInfo'>
								<MailOutlineIcon className='userShowIcon' />
								<span className='userShowInfoTitle'>{user.email}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='user'>
				{user.role === 'admin' ? (
					<div className='userShow'>
						<span className='userShowTitle'>Posted Events</span>
						<button
							className='btn btn-outline-secondary d-grid'
							onClick={() => setSortEvent((bool) => !bool)}
						>
							{!sortEvent ? 'Sort A-Z' : 'Unsort'}
						</button>
						<ul>
							{!sortEvent ? (
								<>
									{' '}
									{user.created_events?.map((created_event) => (
										<li key={created_event.id}>
											<p>
												<Link
													style={{ textDecoration: 'none', color: 'black' }}
													to={`/events/${created_event.id}`}
													className='userShowInfoTitle'
												>
													{created_event.name}
												</Link>
											</p>
										</li>
									))}
								</>
							) : (
								<>
									{user.sort_event?.map((event_sorted) => (
										<li key={event_sorted.id}>
											<p>
												<Link
													style={{ textDecoration: 'none', color: 'black' }}
													to={`/events/${event_sorted.id}`}
													className='userShowInfoTitle'
												>
													{event_sorted.name}
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
				{user.role === 'admin' ? (
					<div className='userShow'>
						<span className='userShowTitle'>Posted Venues</span>
						<button
							className='btn btn-outline-secondary d-grid'
							onClick={() => setSortVenue((bool) => !bool)}
						>
							{!sortVenue ? 'Sort A-Z' : 'Unsort'}
						</button>
						<ul>
							{!sortVenue ? (
								<>
									{user.created_venues?.map((created_venue) => (
										<li key={created_venue.id}>
											<p className='userShowInfoTitle'>{created_venue.name}</p>
										</li>
									))}
								</>
							) : (
								<>
									{user.sort_venue?.map((venue_sort) => (
										<li key={venue_sort.id}>
											<p className='userShowInfoTitle'>{venue_sort.name}</p>
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
						Comments History || Total Commented Events:{' '}
						{user.total_commented_events}
					</span>
					<ul>
						{user.comments?.map((comment) => (
							<li key={comment.id}>
								<Link
									style={{ textDecoration: 'none', color: 'black' }}
									to={`/comments/${comment.id}`}
									className='userShowInfoTitle'
								>
									{comment.content} || {comment.event_name} ||{' '}
									{comment.created_at
										? dateformat(user.created_at, 'dddd, mmmm dS yyyy')
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