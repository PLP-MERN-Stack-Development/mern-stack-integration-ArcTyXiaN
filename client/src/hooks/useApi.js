import { useState, useCallback } from 'react';
import api from '../services/api';

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (method, url, data = null, config = {}) => {
    setLoading(true);
    setError(null);

    try {
      let response;
      
      if (method === 'GET') {
        response = await api.get(url, config);
      } else if (method === 'POST') {
        response = await api.post(url, data, config);
      } else if (method === 'PUT') {
        response = await api.put(url, data, config);
      } else if (method === 'DELETE') {
        response = await api.delete(url, config);
      }

      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      throw err;
    }
  }, []);

  const get = useCallback((url, config) => request('GET', url, null, config), [request]);
  const post = useCallback((url, data, config) => request('POST', url, data, config), [request]);
  const put = useCallback((url, data, config) => request('PUT', url, data, config), [request]);
  const del = useCallback((url, config) => request('DELETE', url, null, config), [request]);

  return {
    loading,
    error,
    get,
    post,
    put,
    del,
  };
};

export default useApi;