export default async function getAirport(ID) {
  const { FF_LOGIN, FF_API_PASSWORD } = process.env
  const res = await fetch(`https://qa.foreflight.com/airports/${ID}`, {
    headers: {
      "ff-coding-exercise": 1,
      "Authorization": `Basic ${btoa(`${FF_LOGIN}:${FF_API_PASSWORD}`)}`
    }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch airport data')
  }

  return res.json()
}
