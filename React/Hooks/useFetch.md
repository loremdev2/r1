
```js
import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosRequestConfig, CancelTokenSource } from 'axios';

/**
 * Interface defining the hook's return shape.
 *
 * @template T - The type of fetched data.
 */
export interface UseFetchResult<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  refetch: () => void;
}

/**
 * useFetch - A custom React hook for fetching data from an API using Axios.
 *
 * @template T - The type of the response data.
 * @param url - The URL to fetch data from.
 * @param config - Optional Axios request configuration (headers, params, etc.).
 * @returns A UseFetchResult<T> containing data, error, loading, and refetch.
 */
function useFetch<T = unknown>(
  url: string,
  config?: AxiosRequestConfig
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [trigger, setTrigger] = useState<number>(0);

  const refetch = useCallback(() => {
    setTrigger(prev => prev + 1);
  }, []);

  useEffect(() => {
    const cancelToken: CancelTokenSource = axios.CancelToken.source();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.request<T>({
          url,
          cancelToken: cancelToken.token,
          ...config
        });
        setData(response.data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(err as Error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => cancelToken.cancel('Request canceled by cleanup');
  }, [url, config, trigger]);

  return { data, error, loading, refetch };
}

export default useFetch;

```

