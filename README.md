# use-localstorage

A lightweight React Hook for elegant localStorage management with support for data expiration and namespace functionality.

[![NPM Version](https://img.shields.io/npm/v/@buzuosheng/use-localstorage.svg)](https://www.npmjs.com/package/@buzuosheng/use-localstorage)
[![NPM Downloads](https://img.shields.io/npm/dm/@buzuosheng/use-localstorage.svg)](https://www.npmjs.com/package/@buzuosheng/use-localstorage)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## ✨ Features

- 🚀 Data expiration support
- 🔖 Namespace (prefix) support
- 💪 Full TypeScript support
- 🎯 Automatic serialization and deserialization
- 🔄 Cross-tab synchronization
- 🛡️ Type-safe implementation

## 📦 Installation

```bash
# Using npm
npm install @buzuosheng/use-localstorage

# Using yarn
yarn add @buzuosheng/use-localstorage

# Using pnpm
pnpm add @buzuosheng/use-localstorage
```

## 🔨 Usage

```typescript
import { useLocalStorage } from '@buzuosheng/use-localstorage';

// Basic usage
const [value, setValue] = useLocalStorage('key');

// With expiration time and prefix
const [value, setValue] = useLocalStorage('key', {
  age: '7d',        // Supports: 's'(seconds), 'm'(minutes), 'h'(hours), 'd'(days)
  prefix: 'app:',   // Custom prefix
  initialValue: 'default' // Initial value
});
```

## 📝 API

### useLocalStorage(key, options?)

#### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| key | string | Yes | - | localStorage key name |
| options | object | No | - | Configuration options |

#### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| age | string | '7d' | Data expiration time |
| prefix | string | 'Prefix:' | Key prefix |
| initialValue | any | undefined | Initial value |

#### Return Value

```typescript
[storedValue, setValue]: [T | undefined, (value: T) => void]
```

## 🌰 Examples

### Basic Usage

```typescript
import { useLocalStorage } from '@buzuosheng/use-localstorage';

function App() {
  const [name, setName] = useLocalStorage('name', {
    age: '1d',
    initialValue: 'John'
  });

  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}
```

### Storing Objects

```typescript
interface User {
  name: string;
  age: number;
}

function App() {
  const [user, setUser] = useLocalStorage<User>('user', {
    initialValue: { name: 'John', age: 25 }
  });

  return (
    <div>
      <input
        value={user?.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
    </div>
  );
}
```

## 📄 License

MIT © [buzuosheng](https://github.com/buzuosheng)
