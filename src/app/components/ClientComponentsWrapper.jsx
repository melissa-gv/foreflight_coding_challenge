"use client"

import React, { useState } from 'react'
import SearchAirport from './SearchAirport'
import AirportReport from './AirportReport'

export default function ClientComponentsWrapper() {
  const [airportIDs, setAirportIDs] = useState('')
  const [airportDatas, setAirportDatas] = useState(null)
  const [weatherDatas, setWeatherDatas] = useState(null)
  
  return (
    <>
      <SearchAirport
        airportIDs={airportIDs}
        setAirportIDs={setAirportIDs}
        setAirportDatas={setAirportDatas}
        setWeatherDatas={setWeatherDatas}
      />
      {
        (!airportDatas || !weatherDatas) ? null : (
          <>
          {console.log('airportDatas:', airportDatas)}
          {console.log('weatherDatas:', weatherDatas)}
            {
              airportDatas.map((airportData, idx) => {
                if (airportDatas.length !== weatherDatas.length) {
                  return <p key={idx} className='error-fetching-data'>{`Unable to fetch data. Please try again.`}</p>
                }

                if (airportData.status === 'fulfilled' && typeof airportData.value === 'string' && airportData.value.includes('Failed')) {
                  return <p key={idx} className='error-fetching-data'>{`${airportData.value}. Please try again and check if this is a valid airport identifier.`}</p>
                }

                if (airportData.status === 'fulfilled' && weatherDatas[idx].status === 'fulfilled') {
                  return <AirportReport key={idx} airportData={airportData.value} weatherData={weatherDatas[idx].value}/>
                }
              })
            }
          </>
        )
      }
    </>
  )
}
