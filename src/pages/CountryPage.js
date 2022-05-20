import React from 'react'
import useCountry from '../custom-hooks/useCountry'

export default function CountriesPage() {
    const {countryData, error, loading} = useCountry('https://restcountries.com/v3.1/all')

    if (error) return <div>Error!</div>
    if (loading) return <div>Loading...</div>
    return (
        <div>
            {countryData ? countryData.map(country => {
                return (
                    <div key={country.cca3}>
                        
                        <h1>{country.name.common}</h1>
                        <img src={country.flags.png} alt={country.name.common}/>
                        <p>{country.region}</p>
                        <p>{country.population}</p>
                        {country.languages && Object.keys(country.languages).map(
                            (key) => {
                                return (
                                <p key={country.cca3 + key}>
                                    {country.languages[key]}
                                </p>
                                )
                            }
                        )} 
                    </div>
                )
            }) : <></>}
        </div>
    )
}

