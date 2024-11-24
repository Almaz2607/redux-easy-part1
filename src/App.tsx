import './App.css';
import { UsersList } from './modules/users/users-list';
import { Counters } from './modules/counters/counters';

function App() {
    return (
        <div id="root">
            <Counters />
            <UsersList />
        </div>
    );
}

export default App;

