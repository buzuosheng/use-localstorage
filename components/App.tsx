import React, { ChangeEvent } from 'react';
import { useLocalStorage } from '../src/use-localstorage';

interface AppProps {
  value?: string;
  options?: {
    age?: string;
    prefix?: string;
  };
}

const App: React.FC<AppProps> = ({ value = 'name', options = { age: '3s' } }) => {
  const [item, setItem] = useLocalStorage<string | Record<string, never>>(value, options);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItem(e.target.value);
  };

  const handleSetObject = () => {
    setItem({});
  };

  return (
    <div className="m-8 p-16 border rounded-xl bg-gray-50">
      <p className="text-center text-2xl">
        For example: set the key of localstorage to{' '}
        <span className="text-green-400 font-medium">name</span>
      </p>

      <p className="mt-4 text-center text-2xl">
        default age in this case:{' '}
        <span className="text-green-400 font-medium">{options.age || '3s'}</span>
      </p>

      <p className="mt-4 text-center text-2xl">
        default prefix:{' '}
        <span className="text-green-400 font-medium">Prefix:</span>
      </p>

      <div className="mt-8 text-center text-2xl flex items-center justify-center gap-4">
        <label htmlFor="nameInput">name:</label>
        <input
          id="nameInput"
          className="py-2 px-4 outline-none border rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
          placeholder="Enter your name"
          value={typeof item === 'string' ? item : ''}
          onChange={handleInputChange}
        />
      </div>

      <div className="mt-8 text-center text-2xl flex items-center justify-center gap-4">
        <span>set the value to an object</span>
        <button
          className="px-6 py-2 border rounded-lg focus:outline-none bg-green-400 hover:bg-green-500 text-white transition-colors duration-200"
          onClick={handleSetObject}
          type="button"
        >
          Click
        </button>
      </div>
    </div>
  );
};

export default App; 