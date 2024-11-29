import { memo, useMemo, useState } from 'react';
import { User } from './users.slice';
import { useNavigate } from 'react-router-dom';
import { usersApi } from './api';

export function UsersList() {
    const [sortType, setSortType] = useState<'asc' | 'desc'>('asc');

    const { data: users, isLoading } = usersApi.useGetUsersQuery();

    const sortedUsers = useMemo(() => {
        return [...(users ?? [])].sort((a, b) => {
            if (sortType === 'asc') {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });
    }, [users, sortType]);

    if (isLoading) {
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
                        <UserListItem user={user} key={user.id} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

const UserListItem = memo(function UserListItem({ user }: { user: User }) {
    const navigate = useNavigate();

    const handleUserClick = () => {
        navigate(user.id, { relative: 'path' });
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
