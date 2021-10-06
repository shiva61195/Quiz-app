import  {useEffect, useState} from 'react'
import axios from 'axios'


const FetchData = (url) => {
  const[data, setData] = useState(null)
  const[loading, setLoading] = useState(false)
  const[error, setError] = useState(null)


//  useeffect component to rerender

  useEffect(() => {
    
    setLoading(true)

    axios.get(url)
    .then(res =>  setData(res.data[0]))
    .catch(error => setError(error.message))
    .finally(() => setLoading(false))   
  }, [url])


  const reFetch = () => {
    setLoading(true)

    axios.get(url)
    .then(res =>  setData(res.data[0]))
    .catch(error => setError(error.message))
    .finally(() => setLoading(false))
  }
   return {
     data,
     loading,
     error,
     reFetch,
   }
}

export default FetchData
