export default async function getWeather(ID) {
  const res = await fetch(`https://qa.foreflight.com/weather/report/${ID}`, {
    headers: {
      "ff-coding-exercise": 1
    }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch weather data')
  }

  return res.json()
}
