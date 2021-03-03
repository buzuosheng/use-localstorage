# @buzuosheng/use-localstorage

## How to use

```js
const App = () => {
  const [item, setItem] = useLocal('name', {
    initalData: ,
    prefix: 'thistest',
    // age: '1m',
  });
  // console.log(typeof (ms('1d')));
  return (
    <div className="use-localstorage">
      <h1>For example: set the key of localstorage to 'name' </h1>
      <div>
        <label>
          name:{' '}
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
```

## Demo
