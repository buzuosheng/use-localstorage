import * as React from 'react';
import * as ReactDOM from 'react-dom';
import useLocalStorage from '../src/use-loacalstorage';

const App = () => {
  const [item, setItem] = useLocalStorage('name', '', 10000);
  return (
    <div className="App">
      <h1>Set Name to store in Local Storage</h1>
      <div>
        <label>
          Name:{' '}
          <input
            type="text"
            placeholder="Enter your name"
            value={item}
            onChange={e => setItem(e.target.value)}
          />
        </label>
      </div>
    </div>
  );
};
export default App;
ReactDOM.render(<App />, document.getElementById('root'));
