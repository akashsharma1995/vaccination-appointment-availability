import {useState, useCallback} from 'react';

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const sendRequest = useCallback(async (requestConfig, apply) => {
    setLoading(true);
    try{
      const response = await fetch(
        requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : "GET",
          headers: requestConfig.headers ? requestConfig.headers : {}
        }
      )
      if(!response.ok){
        throw new Error("Something went wrong!")
      }
      const data = await response.json();
      apply(data);
      setLoading(false);
    }catch(err){
      console.log(err)
      setLoading(false);
      setError(err);
    }
  }, []);

  return {loading, error, sendRequest};
}

export default useHttp;