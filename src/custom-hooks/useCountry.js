// This hook is used to fetch one specific country
import {useEffect, useState} from 'react'

export default function useCountry(name) {
    const [countryData, setCountryData] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async function () {
            try {
                const response = await fetch(`https://restcountries.com/v3.1/name/${name}`)
                let data = await response.json();
                setCountryData(data)
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false)
            }
        }
        fetchData();
    }, [name])
    return {countryData, error, loading}
}