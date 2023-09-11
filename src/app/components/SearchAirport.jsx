"use client"

import React from 'react'
import getAirportDatas from '../_api/getAirportData'
import getWeatherDatas from '../_api/getWeatherData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default function SearchAirport({ airportIDs, setAirportIDs, setAirportDatas, setWeatherDatas }) {

  async function handleSubmit(e) {
    e.preventDefault()
    setAirportDatas(await getAirportDatas(airportIDs))
    setWeatherDatas(await getWeatherDatas(airportIDs))
  }

  return (
    <>
      <form onSubmit={handleSubmit}>

        <label>
          <input 
            type="text"
            name="airportIDinput"
            value={airportIDs}
            onChange={e => setAirportIDs(e.target.value)}
            placeholder='Enter airport identifier'
          />
        </label>

        <button type="submit" >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>

      </form>
    </>
  )
}
