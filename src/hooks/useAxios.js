import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const useAxios = (url, options = {}, body = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let response;
        if (body) {
          response = await axiosInstance(url, {
            ...options,
            data: body,
          });
        } else {
          response = await axiosInstance(url, options);
        }
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options, body]);

  return { data, loading, error };
};

export default useAxios;
