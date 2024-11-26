import { memo, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector, useAppStore } from '../../store';
import { UserId, usersSlice } from './users.slice';
import { useDispatch } from 'react-redux';
import { fetchUsers } from './model/fetch-users';

export function UsersList() {
    const [sortType, setSortType] = useState<'asc' | 'desc'>('asc');
    const dispatch = useDispatch();
    const appStore = useAppStore();

    const isPending = useAppSelector(
        usersSlice.selectors.selectIsFetchUsersPending,
    );

    useEffect(() => {
        fetchUsers(appStore.dispatch, appStore.getState);
    }, [dispatch, appStore]);

    const sortedUsers = useAppSelector(state =>
        usersSlice.selectors.selectSortedUsers(state, sortType),
    );

    const selectedUserId = useAppSelector(
        usersSlice.selectors.selectSelectedUserId,
    );

    if (isPending) {
        return <div>Loading...</div>;
    }

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
        dispatch(usersSlice.actions.selected({ userId }));
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
        dispatch(usersSlice.actions.selectRemove());
    };

    return (
        <div>
            <button onClick={handleBackButtonClick}>Back</button>
            <h2 className="text-3xl">{user.name}</h2>
            <p className="text-xl">{user.description}</p>
        </div>
    );
}
