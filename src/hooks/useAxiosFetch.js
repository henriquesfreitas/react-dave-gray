import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxiosFetch = (dataUrl) => {
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const source = axios.CancelToken.source();

        const fetchData = async (url) => {
            setIsLoading(true);
            try {
                const result = await axios.get(url, {
                    cancelToken: source.token
                });
                if (isMounted) {
                    setData(result.data);
                    setFetchError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setData([]);
                    setFetchError(err.message);
                }
            } finally {
                isMounted && setIsLoading(false);
            }
        };

        fetchData(dataUrl);

        return () => {
            isMounted = false;
            source.cancel();
        };
    }, [dataUrl]);

    return { data, fetchError, isLoading };
};

export default useAxiosFetch;