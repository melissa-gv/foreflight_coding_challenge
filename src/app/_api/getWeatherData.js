"use server"

import processAirportIDs from "../_lib/processAirportIDs"

async function getWeatherData(ID) {
  try {
    const res = await fetch(`https://qa.foreflight.com/weather/report/${ID}`, {
      headers: {
        "ff-coding-exercise": 1
      }
    })

    if (!res.ok) {
      return `Failed to fetch weather data for airport identifier '${ID}'`
    }

    return res.json()

  } catch (error) {
    console.log(error)
  }
}

export default async function getWeatherDatas(IDs) {
  const processedIDs = processAirportIDs(IDs)

  const promises = processedIDs.map(async (ID) => {
    const res = await getWeatherData(ID)
    return res
  })

  const resolved = await Promise.allSettled(promises)
  return resolved
}
