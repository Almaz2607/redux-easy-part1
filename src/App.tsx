import './App.css';
import { UsersList } from './modules/users/users-list';
import { Counters } from './modules/counters/counters';

function App() {
    return (
        <>
            <Counters />
            <UsersList />
        </>
    );
}

export default App;

