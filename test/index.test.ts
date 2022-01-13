import { act, renderHook } from '@testing-library/react-hooks';
import { useLocalStorage } from '../src/use-localstorage';
// import { sleep } from './testingHelpers';

interface Opts<T> {
  age?: string;
  initialValue?: T;
  prefix?: string;
}

const setUp = <T>(value: string, options: Opts<T>) =>
  renderHook(() => useLocalStorage(value, options));

describe('useLocalStorage', () => {
  it('should be defined', () => {
    expect(useLocalStorage).toBeDefined();
  });

  it('set initialvalue', async () => {
    const { result } = setUp('initValue', { initialValue: true });
    expect(result.current[0]).toEqual(true);
  });

  it('defalut value', async () => {
    const { result } = setUp('dltValue', {});
    const setter = result.current[1];
    console.log(result.current[0])
    await act(async () => {
      setter('defalut value');
    });
    expect(result.current[0]).toEqual('defalut value');
    await act(async () => {
      setTimeout(() => {
        expect(result.current[0]).toBeFalsy();
      }, 5000);
    });
  });

  it('test 10s expiration Time', async () => {
    const { result } = setUp('10sValue', { age: '10s' });
    const setter = result.current[1];
    await act(async () => {
      setter('expire 10s later');
    });
    expect(result.current[0]).toEqual('expire 10s later');
    await act(async () => {
      setTimeout(() => {
        expect(result.current[0]).toBeFalsy();
      }, 10000);
    });
  });

  it('test prefix', async () => {
    const { result } = setUp('prefix', { age: '3s', prefix: 'last:' });
    const setter = result.current[1];
    await act(async () => {
      setter('last:prefix');
    });

    expect(
      JSON.parse(localStorage.getItem('last:prefix') as string).value
    ).toEqual('last:prefix');
  });

  it('expire time', async () => {
    const { result } = setUp('expireTime', { prefix: 'prefix:' });
    const setter = result.current[1];
    await act(async () => {
      setter('expireTime');
    });
    expect(
      JSON.parse(localStorage.getItem('prefix:expireTime') as string).expireAt
    ).toBeGreaterThan(Date.now());
    await act(async () => {
      setTimeout(() => {
        expect(
          JSON.parse(localStorage.getItem('prefix:expireTime') as string)
            .expireAt
        ).toBeLessThan(Date.now());
      }, 5000);
    });
  });
});
