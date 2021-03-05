# @buzuosheng/use-localstorage

Access Local Storage with React Hooks

## Installation

``` powershell
npm i @buzuosheng/use-localstorage
```

## Usage

```  javascript
const [item, setItem] = useLocal('name')
const [item, setItem] = useLocal('name', {age: '1d'})
const [item, setItem] = useLocal('name', {InitialValue:'initial value',
                                          prefix:'Prefix:',
                                          age: '1d'})
```

## Example

```react


const App = () => {
  const [item, setItem] = useLocal('name')
  return (
    < div className="use-localstorage" >
      <h1>For example: set the key of localstorage to 'name' </h1>
      <div>
        <label>
          name:{' '}
          <input
            type="text"
            placeholder="input localStorage.value"
            value={item}
            onChange={e => setItem(e.target.value)}
          />
        </label>
      </div>
    </ div>
  )
}
```

## Demo

[https://app-demo-git-main-buzuosheng.vercel.app/uselocalstorage](https://app-demo-git-main-buzuosheng.vercel.app/uselocalstorage)