# @buzuosheng/use-localstorage

Access Local Storage with React Hooks

![](https://badgen.net/npm/v/@buzuosheng/use-localstorage) ![](https://badgen.net/npm/node/@buzuosheng/use-localstorage) ![](https://badgen.net/npm/dw/@buzuosheng/use-localstorage) ![](https://badgen.net/bundlephobia/minzip/@buzuosheng/use-localstorage) ![](https://badgen.net/bundlephobia/tree-shaking/@buzuosheng/use-localstorage) ![](https://badgen.net/npm/types/@buzuosheng/use-localstorage) ![](https://img.shields.io/snyk/vulnerabilities/npm/@buzuosheng/use-localstorage)

## Demo

[https://app-demo-git-main-buzuosheng.vercel.app/uselocalstorage](https://app-demo-git-main-buzuosheng.vercel.app/uselocalstorage)

open `Chrome devtool` => `Application` => `Local Storage` to see localstorage.

## Installation

```powershell
npm i @buzuosheng/use-localstorage
```

## Usage

```js
const [item, setItem] = useLocalStorage(key, { initialValue, prefix, age });
```

`age` is **effective duration** of localstorage item, it will be deal with `ms`.

so use it like this:

```js
{age: '2 days'}  // 172800000
{age: '1d'}      // 86400000
{age: '10h'}     // 36000000
{age: '2.5 hrs'} // 9000000
{age: '2h'}      // 7200000
{age: '1m'}      // 60000
{age: '5s'}      // 5000
{age: '1y'}      // 31557600000
{age: '100'}     // 100
```

more information to see [ms](https://github.com/vercel/ms)

## Example

```react
import { useLocalStorage } from '@buzuosheng/use-localstorage'

const App = () => {
  const [item, setItem] = useLocalStorage('name')
  // const [item, setItem] = useLocalStorage('name', { age: '1d' })
  // const [item, setItem] = useLocalStorage('name', {
  //   initialValue: 'initial value',
  //   prefix: 'Prefix:',
  //   age: '1d'
  // })
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
