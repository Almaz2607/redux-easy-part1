import { memo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import {
    selectSelectedUserId,
    selectSortedUsers,
    UserId,
    UserRemoveSelectedAction,
    UserSelectedAction,
} from './users.slice';

export function UsersList() {
    const [sortType, setSortType] = useState<'asc' | 'desc'>('asc');

    const sortedUsers = useAppSelector(state =>
        selectSortedUsers(state, sortType),
    );

    const selectedUserId = useAppSelector(selectSelectedUserId);

    return (
        <div className="wrapper">
            {!selectedUserId ? (
                <div>
                    <div>
                        <button onClick={() => setSortType('asc')}>Asc</button>
                        <button onClick={() => setSortType('desc')}>
                            Desc
                        </button>
                    </div>
                    <ul>
                        {sortedUsers.map(user => (
                            <UserListItem userId={user.id} key={user.id} />
                        ))}
                    </ul>
                </div>
            ) : (
                <SelectedUser userId={selectedUserId} />
            )}
        </div>
    );
}

const UserListItem = memo(function UserListItem({
    userId,
}: {
    userId: UserId;
}) {
    const user = useAppSelector(state => state.users.entities[userId]);
    const dispatch = useAppDispatch();

    const handleUserClick = () => {
        dispatch({
            type: 'userSelected',
            payload: { userId: user.id },
        } satisfies UserSelectedAction);
    };

    return (
        <li key={user.id} className="py-2" onClick={handleUserClick}>
            <span>{user.name}</span>
        </li>
    );
});

function SelectedUser({ userId }: { userId: UserId }) {
    const user = useAppSelector(state => state.users.entities[userId]);
    const dispatch = useAppDispatch();

    const handleBackButtonClick = () => {
        dispatch({
            type: 'userRemoveSelected',
        } satisfies UserRemoveSelectedAction);
    };

    return (
        <div>
            <button onClick={handleBackButtonClick}>Back</button>
            <h2 className="text-3xl">{user.name}</h2>
            <p className="text-xl">{user.description}</p>
        </div>
    );
}
