import React, { useEffect, useState } from 'react'
import './style.css'
import Card from './Card';

const Weather = () => {
    const [searchValue,setSearchVslue] = useState([26.139699,85.8963273])
    const [tempInfo,setTempInfo] = useState({})
    const change = (e) =>{
        setSearchVslue([...searchValue,e.target.value])
    }
    let [lat,lon]   =searchValue
    // console.log(lat)
    // console.log(lon)

    const getWeatherInfoo = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=4e819bf5356a264e9da719a57b6056f5`;

            const res = await fetch(url);
            const data = await res.json();

            console.log(data)
            const {temp,humidity,pressure} = data.main
            const {main:mood} = data.weather[0]
            const {name} = data
            const {speed} = data.wind
            const {country,sunset} = data.sys

            const weathInfo = {
                temp,
                humidity,
                pressure,
                mood,
                name,
                speed,
                country,
                sunset,
            };
            setTempInfo(weathInfo)
           
            

        } catch (error){
            console.log(error)
        }

    }
    useEffect(() => {
        getWeatherInfoo();

    },[])
  
  return (
     <>
        <div className='wrap'>
            <div className='search'>
                <input type={"search"} placeholder = "search..." autoFocus id='search' className='searchTerm' value={searchValue} onChange = {change}/>
                <button className='searchButton' type='button' onClick={getWeatherInfoo} >Search</button>

            </div>
        </div>
        {/* our temp card */}
        <Card tempInfo = {tempInfo}/>
     </>
  )
}

export default Weather