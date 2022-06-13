import React, { useEffect, useState } from 'react'
import './style.css'
import Card from './Card';

const Weather = () => {
    // const [searchValue,setSearchVslue] = useState([])
    // const[searchData,setSearchData] = useState([])
    const[data,setData] = useState([])
    const[savedata,setSaveData] = useState([])
    const [tempInfo,setTempInfo] = useState({})
    const [value,setValue] = useState(0)
    const[place,setPlace] = useState('Enter city name')
    // const change = (e) =>{
    //     setSearchVslue([e.target.value])
        
    // }
    const cord = (e) => {
        setData([e.target.value])
      

    }
    // let [lat,lon]   =searchData
    let lati;
    let loni;
    // console.log(lat)
    // console.log(lon)
    let [city,state,country] = savedata
    // console.log(city)
    // console.log(state)
    // console.log(country)
    // let a  = 0;
    lati = 26.1397;
    loni = 85.8963;
  
    

    const getCordinate = async () => {
        try{
            let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&appid=4e819bf5356a264e9da719a57b6056f5`;
            
            const res = await fetch(url)
            const data = await res.json();

            console.log(data)
            let[Data] =data
            let{lat,lon} =Data
            lati = lat;
            loni = lon;
            
        } catch (error){
            console.log(error)

        }
    }
    console.log(lati)
    console.log(loni)




    const getWeatherInfoo = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${loni}&units=metric&appid=4e819bf5356a264e9da719a57b6056f5`;

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
        // getCordinate();

    },[])
    // const func = () => {
    //     getWeatherInfoo()
    //     getCordinate()
    // }

  
  return (
     <>
        <div className='wrap'>
          <div className='search'>
            <input type={"text"} placeholder = {place} id='search' className='searchTerm' value={data} onChange = {cord}/>
                <button className='searchButton' type='button' onClick={() => {
                    setSaveData([...savedata,...data])
                    // console.log(savedata)
                    setData([])
                  setValue(value+1)
        // value === 1 ?   setPlace("Enter Country code (e.g- +91)")  : setPlace("Enter state code (e.g- BR,DL,MU)")
         if(value == 0){
            setPlace("Enter state code (e.g- BR,DL,MU)")
         }else if (value == 1){
            setPlace("Enter Country code (e.g- +91)")
         }else{
            setPlace("Now double click the search :)")
         }
         
      
             
                
                    
                  
                }} >+</button>
                <button className='searchButton' type='button' onClick={getCordinate} onDoubleClick = {getWeatherInfoo} >Search</button>
                

          </div>
            
        </div>
        {/* our temp card */}
        <Card tempInfo = {tempInfo}/>
     </>
  )
}

export default Weather