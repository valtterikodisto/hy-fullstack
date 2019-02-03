import React, {useState, useEffect} from 'react';
import axios from 'axios'

const Filter = ({value, handler}) => {
  return (
    <>
      Find countries: <input value={value} onChange={handler} />
    </>
  )
}

const BasicInfo = ({country}) => {
  return (
    <div>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
    </div>
  )
}

const Languages = ({country}) => {
  const languages = country.languages.map(language => <li key={language.name}>{language.name}</li>)

  return (
    <ul>{languages}</ul>
  )
}

const Flag = ({country}) => <div><img src={country.flag} alt={`The flag of ${country.name}`} width="200px" /></div>

const Weather = ({country}) => {

  const placeholder = {
    current: {
      temp_c: 999,
      condition: {
      icon: "//cdn.apixu.com/weather/64x64/night/296.png",
      },
    }}

  const [weather, setWeather] = useState(placeholder)

  useEffect(() => {
    axios
      .get(`http://api.apixu.com/v1/current.json?key=ce6806b8423e4d1a963194615190202&q=${country.capital}`)
      .then(response => {
        setWeather(response.data)
      })
  }, [])

  return (
    <>
      <h2>Weather in {country.capital}</h2>
      <p><strong>temperature: </strong>{weather.current.temp_c} Celcius</p>
      <img src={weather.current.condition.icon} alt={`Weather icon of ${country.capital}`} />
      <p><strong>wind: </strong>{weather.current.wind_kph} kph direction {weather.current.wind_dir}</p>
    </>
  )
}


const Country = ({country, all, handler}) => {

  if (all) {
    return (
      <>
        <h1>{country.name}</h1>
        <BasicInfo country={country} />
        <h2>Languages</h2>
        <Languages country={country} />
        <Flag country={country} />
        <Weather country={country} />
      </>
    )
  } else {
    return (
      <>  
        <p>{country.name} <button value={country.name} onClick={() => handler(country.name)}>show</button></p>
      </>
    )
  }
}

const Result = ({countries, filter, handler}) => {
  const result = countries
    .filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
    .map(country => <Country key={country.numericCode} country={country} all={false} handler={handler} />)

  if (result.length > 10) {
    return <div>Too many matches, specify another filter</div>

  } else if (result.length > 1) {
    return <div>{result}</div>

  } else if (result.length === 1) {
    const country = countries
    .filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
    .map(country => <Country key={country.numericCode} country={country} all={true} />)[0]

    return <div>{country}</div>

  } else {
    return <div><p>No results</p></div>
  }
}

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleShowButtonClick = (name) => {
    setFilter(name)
  }

  return (
    <div>
      <Filter value={filter} handler={handleFilterChange} />
      <Result countries={countries} filter={filter} handler={handleShowButtonClick} />
    </div>
  )
}

export default App;
