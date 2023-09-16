import { useDispatch, useSelector } from 'react-redux';
import { useServerRequest } from '../../../../../../hooks';
import { Icon } from '../../../../../../components';
import { checkAccess } from '../../../../../../utils';
import { selectUserRole } from '../../../../../../selectors';
import { CLOSE_MODAL, openModal, removeCommentAsync } from '../../../../../../actions';
import { ROLE } from '../../../../../../constants';
import styled from 'styled-components';

const CommentContainer = ({ className, postId, id, author, content, publishedAt }) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const userRole = useSelector(selectUserRole);

	const onCommentRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить комментарий?',
				onConfirm: () => {
					dispatch(removeCommentAsync(requestServer, postId, id));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const isAdminOrModerator = checkAccess([ROLE.ADMIN, ROLE.MODERATOR], userRole);

	return (
		<div className={className}>
			<div className='comment'>
				<div className='information-panel'>
					<div className='author'>
						<Icon
							id='fa-user-circle-o'
							margin='0 10px 0 0'
							size='18px'
							inactive={true}
						/>
						{author}
					</div>
					<div className='published-at'>
						<Icon
							id='fa-calendar-o'
							margin='0 10px 0 0'
							size='18px'
							inactive={true}
						/>
						{publishedAt}
					</div>
				</div>
				<div className='comment-text'>{content}</div>
			</div>
			{isAdminOrModerator &&
				<Icon
					id='fa-trash-o'
					margin='0 0 0 10px'
					size='21px'
					onClick={() => onCommentRemove(id)}
				/>}
		</div>
	);
};

export const Comment = styled(CommentContainer)`
	display: flex;
	margin-top: 10px;
	width: 100%;

	& .comment {
		width: 550px;
		padding: 5px 10px;
		border: 1px solid #000;
	}

	& .information-panel {
		display: flex;
		justify-content: space-between;
	}

	& .author {
		display: flex;
	}

	& .published-at {
		display: flex;
	}
`;
