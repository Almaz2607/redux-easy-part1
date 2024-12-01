import { useNavigate, useParams } from 'react-router-dom';
import { UserId } from './users.slice';
import { usersApi } from './api';
import { skipToken } from '@reduxjs/toolkit/query';

export function UserInfo() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: UserId }>();

    const { data: user, isLoading: isLoadingUser } = usersApi.useGetUserQuery(
        id ?? skipToken,
    );

    const [deleteUser, { isLoading: isLoadingDelete }] =
        usersApi.useDeleteUserMutation();

    const handleBackButtonClick = () => {
        navigate('..', { relative: 'path' });
    };

    const handlDeleteButtonClick = async () => {
        if (!id) {
            return;
        }
        await deleteUser(id);
        navigate('..', { relative: 'path' });
    };

    if (isLoadingUser || !user) {
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
                disabled={isLoadingDelete}
            >
                Delete
            </button>
        </div>
    );
}
