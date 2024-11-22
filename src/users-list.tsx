import { useMemo, useState } from 'react';
import {
    useAppDispatch,
    useAppSelector,
    User,
    UserRemoveSelectedAction,
    UserSelectedAction,
} from './store';

export function UsersList() {
    const [sortType, setSortType] = useState<'asc' | 'desc'>('asc');

    const ids = useAppSelector(state => state.users.ids);
    const entities = useAppSelector(state => state.users.entities);
    const selectedUserId = useAppSelector(state => state.users.selectedUserId);
    const selectedUser = selectedUserId ? entities[selectedUserId] : undefined;

    const sortedUsers = useMemo(
        () =>
            ids
                .map(id => entities[id])
                .sort((a, b) => {
                    if (sortType === 'asc') {
                        return a.name.localeCompare(b.name);
                    } else {
                        return b.name.localeCompare(a.name);
                    }
                }),
        [ids, entities, sortType],
    );

    return (
        <div className="wrapper">
            {!selectedUser ? (
                <div>
                    <div>
                        <button onClick={() => setSortType('asc')}>Asc</button>
                        <button onClick={() => setSortType('desc')}>
                            Desc
                        </button>
                    </div>
                    <ul>
                        {sortedUsers.map(user => (
                            <UserListItem user={user} key={user.id} />
                        ))}
                    </ul>
                </div>
            ) : (
                <SelectedUser user={selectedUser} />
            )}
        </div>
    );
}

function UserListItem({ user }: { user: User }) {
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
}

function SelectedUser({ user }: { user: User }) {
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
