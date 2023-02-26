import './App.css';
import React, { useState, useEffect } from 'react';
import Footer from './components/Footer';
//axios
import axios from 'axios';
//iconos
import { IoMdSunny, IoMdRainy, IoMdCloudy, IoMdSnow, IoMdThunderstorm, IoMdSearch } from 'react-icons/io'
import { BsCloudHaze2Fill, BsCloudDrizzleFill, BsEye, BsWater, BsThermometer, BsWind, BsCloudDrizzle } from 'react-icons/bs'
import { TbTemperatureCelsius } from 'react-icons/tb'
import { ImSpinner8 } from 'react-icons/im'

//api key
const APIKey = 'af7f4abe995e28dee7ea38351c83b7b8';

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('Bernal, AR');
  const [inputValue, setInputValue] = useState('');
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInput = (e) => {
    setInputValue(e.target.value);
  }

  const handleSubmit = (e) => {
    console.log(inputValue);
    //si input no esta vacio
    if (inputValue !== '') {
      //setear location
      setLocation(inputValue);
    }
    //seleccionar input
    const input = document.querySelector('input');
    //si input esta vacio
    if (inputValue === '') {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }
    //borrar input
    input.value = '';
    e.preventDefault();
  }


  //recibir los datos
  useEffect(() => {
    setLoading(true);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIKey}&lang=sp`;

    axios.get(url).then((res) => {
      setTimeout(() => {
        setData(res.data);
        setLoading(false);
      }, 1000);
    }).catch(err => {
      setLoading(false);
      setErrorMsg(err);
    })
  }, [location]);

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg('');
    }, 1500)
    return () => clearTimeout(timer);
  }, [errorMsg])


  //si data es false mostrar el loader
  if (!data) {
    return <div className='w-full h-screen bg-[#424eff] flex flex-col justify-center items-center'>
      <div>
        <ImSpinner8 className='text-5xl animate-spin text-white' />
      </div>
    </div>
  }

  //setear el icono acorde al clima
  let icon;

  switch (data.weather[0].main) {
    case 'Clouds':
      icon = <IoMdCloudy />
      break
    case 'Haze':
      icon = <BsCloudHaze2Fill />
      break
    case 'Rain':
      icon = <IoMdRainy />
      break
    case 'Clear':
      icon = <IoMdSunny />
      break
    case 'Drizzle':
      icon = <BsCloudDrizzleFill />
      break
    case 'Snow':
      icon = <IoMdSnow />
      break
    case 'Thunderstorm':
      icon = <IoMdThunderstorm />
      break
  }
  

  //date object
  const date = new Date();

  return (
    <div className='w-full h-screen bg-[#424eff] flex flex-col items-center justify-center px-4 lg:px-0'>
      {errorMsg && (
        <div className='w-full max-w-[90vw] text-[18px] lg:max-w-[400px] bg-[#6b0505] text-white absolute top-2 lg:text-[15px] lg:top-5 p-[2px] lg:p-[2px] uppercase text-center rounded-md'>{`${errorMsg.response.data.message}`}</div>
      )}
      {/* Formulario */}
      <form className={`${animate ? 'animate-shake' : 'animate-none'
        } h-16 bg-black/30 w-full max-w-[450px]
      rounded-full backdrop-blur-[32px] mb-8 lg:mb-4 lg:max-h-[40px]`}>
        <div className='h-full relative flex items-center justify-between p-2'>
          <input
            onChange={(e) => handleInput(e)}
            className='flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 h-full'
            type='text'
            placeholder='Buscar por ciudad o país' />
          <button
            onClick={(e) => handleSubmit(e)}
            className='bg-[#028eec] hover:bg-[#0370b8] w-20 h-12 rounded-full flex justify-center items-center transition lg:max-h-[30px]'><IoMdSearch className='text-white text-2xl' /></button>
        </div>
      </form>
      <div className='w-full max-w-[450px]: bg-black/20 min-h-[584px] lg:min-h-[400px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-2 lg:max-w-[400px] lg:max-h-[400px] lg:p-4'>
      {loading ? (
          <div className='w-full h-full flex justify-center items-center'>
            <ImSpinner8 className='text-white text-5xl animate-spin' />
          </div>
        ) : (
          <div>
            {/* card top */}
            <div className='flex items-center gap-x-5'>
              {/* icono */}
              <div className='text-[87px] lg:text-[57px]'>{icon}</div>
              <div>
                {/* ciudad/pais */}
                <div className='text-2xl font-semibold'>
                  {data.name}, {data.sys.country}
                </div>
                {/* fecha */}
                <div>
                  {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                  {date.getUTCFullYear()}
                </div>
              </div>
            </div>
            {/* card body */}
            <div className='my-20 lg:my-10'>
              <div className='flex justify-center items-center'>
                {/* temperatura */}
                <div className='text-[144px] lg:text-[100px] leading-none font-light'>
                  {parseInt(data.main.temp)}
                </div>
                {/* icono celsius */}
                <div className='text-4xl'>
                  <TbTemperatureCelsius />
                </div>
              </div>
              {/* descripción del clima */}
              <div className='capitalize text-center'>
                {data.weather[0].description}
              </div>
            </div>
            {/* card bottom */}
            <div className='max-w-[378px] mx-auto flex flex-col gap-y-6 lg:pt-6'>
              <div className='flex justify-between'>
                <div className='flex items-center gap-x-2'>
                  {/* icon */}
                  <div className='text-[20px]'>
                    <BsEye />
                  </div>
                  <div>
                    Visibilidad{' '}
                    <span className='ml-2'>{data.visibility / 1000} km</span>
                  </div>
                </div>
                <div className='flex items-center gap-x-2'>
                  {/* icono temp */}
                  <div className='text-[20px]'>
                    <BsThermometer />
                  </div>
                  <div className='flex'>
                    Térmica
                    <div className='flex ml-2'>
                      {parseInt(data.main.feels_like)}
                      <TbTemperatureCelsius />
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex justify-between'>
                <div className='flex items-center gap-x-2'>
                  {/* icono humedad */}
                  <div className='text-[20px]'>
                    <BsWater />
                  </div>
                  <div>
                    Humedad
                    <span className='ml-2'>{data.main.humidity} %</span>
                  </div>
                </div>
                <div className='flex items-center gap-x-2'>
                  {/* icono viento */}
                  <div className='text-[20px]'>
                    <BsWind />
                  </div>
                  <div>
                    Viento<span className='ml-2'>{parseInt(data.wind.speed)} km/h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
    
  );
}

export default App;
