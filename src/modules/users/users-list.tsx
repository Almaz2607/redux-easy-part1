import { memo, useState } from 'react';
import { useAppSelector } from '../../store';
import { UserId, usersSlice } from './users.slice';
import { useNavigate } from 'react-router-dom';

export function UsersList() {
    const [sortType, setSortType] = useState<'asc' | 'desc'>('asc');

    const isPending = useAppSelector(
        usersSlice.selectors.selectIsFetchUsersPending,
    );

    const sortedUsers = useAppSelector(state =>
        usersSlice.selectors.selectSortedUsers(state, sortType),
    );

    if (isPending) {
        return <div>Loading...</div>;
    }

    return (
        <div className="users">
            <div>
                <div>
                    <button onClick={() => setSortType('asc')}>Asc</button>
                    <button onClick={() => setSortType('desc')}>Desc</button>
                </div>
                <ul>
                    {sortedUsers.map(user => (
                        <UserListItem userId={user.id} key={user.id} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

const UserListItem = memo(function UserListItem({
    userId,
}: {
    userId: UserId;
}) {
    const navigate = useNavigate();
    const user = useAppSelector(state => state.users.entities[userId]);

    const handleUserClick = () => {
        navigate(userId, { relative: 'path' });
    };

    if (!user) {
        return null;
    }

    return (
        <li key={user.id} className="py-2" onClick={handleUserClick}>
            <span>{user.name}</span>
        </li>
    );
});
