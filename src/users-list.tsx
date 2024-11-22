import { memo, useState } from 'react';
import {
    AppState,
    createAppSelector,
    useAppDispatch,
    useAppSelector,
    UserId,
    UserRemoveSelectedAction,
    UserSelectedAction,
} from './store';

const selectSortedUsers = createAppSelector(
    (state: AppState) => state.users.ids,
    (state: AppState) => state.users.entities,
    (_: AppState, sort: 'asc' | 'desc') => sort,
    (ids, entities, sort) =>
        ids
            .map(id => entities[id])
            .sort((a, b) => {
                if (sort === 'asc') {
                    return a.name.localeCompare(b.name);
                } else {
                    return b.name.localeCompare(a.name);
                }
            }),
);

export function UsersList() {
    const [sortType, setSortType] = useState<'asc' | 'desc'>('asc');

    const sortedUsers = useAppSelector(state =>
        selectSortedUsers(state, sortType),
    );

    const selectedUserId = useAppSelector(state => state.users.selectedUserId);

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
