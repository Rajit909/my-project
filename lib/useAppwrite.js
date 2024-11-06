import { useEffect, useState } from "react";
import { Alert } from "react-native";

const useAppwrite = (fn) => {


    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
  
      const fetchData = async () => {
        setLoading(true)
        try {
          const posts = await fn()
          setData(posts)
        } catch (error) {
          console.log(error)
          Alert.alert("Error", "Failed to fetch data")
        }finally {
          setLoading(false)
        }
      }

    useEffect(() => {
      fetchData()
    }, []);

    const refetch = () => fetchData();
  
    return {data, loading, refetch}
  

}


export default useAppwrite