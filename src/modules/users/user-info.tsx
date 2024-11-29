import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../shared/redux';
import { UserId, usersSlice } from './users.slice';
import { deleteUser } from './model/delete-user';

export function UserInfo() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id = '' } = useParams<{ id: UserId }>();
    const isPending = useAppSelector(
        usersSlice.selectors.selectIsFetchUserPending,
    );
    const isDeletePending = useAppSelector(
        usersSlice.selectors.selectIsDeleteUserPending,
    );
    const user = useAppSelector(state =>
        usersSlice.selectors.selectUserById(state, id),
    );

    const handleBackButtonClick = () => {
        navigate('..', { relative: 'path' });
    };

    const handlDeleteButtonClick = () => {
        dispatch(deleteUser(id)).then(() =>
            navigate('..', { relative: 'path' }),
        );
    };

    if (isPending || !user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <button onClick={handleBackButtonClick}>Back</button>
            <h2 className="text-3xl">{user.name}</h2>
            <p className="text-xl">{user.description}</p>
            <button
                className="delete-button"
                onClick={handlDeleteButtonClick}
                disabled={isDeletePending}
            >
                Delete
            </button>
        </div>
    );
}
