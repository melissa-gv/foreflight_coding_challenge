"use server"

const { FF_LOGIN, FF_API_PASSWORD } = process.env
import processAirportIDs from "../_lib/processAirportIDs"

async function getAirportData(ID) {
  try {
    const res = await fetch(`https://qa.foreflight.com/airports/${ID}`, {
      headers: {
        "ff-coding-exercise": 1,
        "Authorization": `Basic ${btoa(`${FF_LOGIN}:${FF_API_PASSWORD}`)}`
      }
    })

    if (!res.ok) {
      return `Failed to fetch airport data for airport identifier '${ID}'`
    }

    return res.json()

  } catch (error) {
    console.log(error)
  }
}

export default async function getAirportDatas(IDs) {
  const processedIDs = processAirportIDs(IDs)

  const promises = processedIDs.map(async (ID) => {
    const res = await getAirportData(ID)
    return res
  })

  const resolved = await Promise.allSettled(promises)
  return resolved
}
