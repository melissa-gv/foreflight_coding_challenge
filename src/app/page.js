import styles from './styles/page.module.css'
import getAirport from './backend/airport'
import getWeather from './backend/weather'
import calcNearestIntercardinalDirection from './_lib/cardinalDirectionCalc'
import findGreatestClouldCoverage from './_lib/cloudCoverage.js'
import calcDateOffset from './_lib/cloudCoverage'
import calcBestRunway from './_lib/bestRunway'

export default async function Home() {
  const airportData = await getAirport('DFW')
  const weatherData = await getWeather('DFW')
//  console.log("weatherData:", weatherData)
//  console.log('airportData:', airportData)

  return (
    <main className={styles.main}>
      <h1>FF - Airport and Weather Data</h1>
      <table>
        <tbody>
          <tr>
            <td>Airport Name</td>
            <td>{airportData.name} ({'DFW'})</td>
          </tr>

          <tr>
            <td>Available Runways</td>
            <td><ul>
              {airportData.runways.map(runway => {
                return <li key={runway.ident}>{runway.name}</li>
              })}
            </ul></td>
          </tr>

          <tr>
            <td>Latitude</td>
            <td>{airportData.latitude.toFixed(3)}</td>
          </tr>

          <tr>
            <td>Longitude</td>
            <td>{airportData.longitude.toFixed(3)}</td>
          </tr>

          <tr>
            <td>Temperature</td>
            <td>{((weatherData.report.conditions.tempC * 9 / 5) + 32).toFixed(0)}&deg; F</td>
          </tr>

          <tr>
            <td>Relative Humidity</td>
            <td>{weatherData.report.conditions.relativeHumidity}%</td>
          </tr>

          <tr>
            <td>Cloud Coverage</td>
            <td>{findGreatestClouldCoverage(weatherData.report.conditions.cloudLayers)}</td>
          </tr>

          <tr>
            <td>Visibility</td>
            <td>{weatherData.report.conditions.visibility.distanceSm} Statute Miles</td>
          </tr>

          <tr>
            <td>Windspeed</td>
            <td>{(weatherData.report.conditions.wind.speedKts * 1.151).toFixed(1)} MPH</td>
          </tr>

          <tr>
            <td>Wind Direction</td>
            <td>{calcNearestIntercardinalDirection(weatherData.report.conditions.wind.direction)}</td>
          </tr>

          <tr>
            <td>Best Runway</td>
            <td>{calcBestRunway(weatherData.report.conditions.wind.direction, airportData.runways)}</td>
          </tr>

        </tbody>

      </table>

      <table>
        <tbody>
          <tr>
            <td>Forecast 2 - Time Offset</td>
            <td>{calcDateOffset(weatherData.report.forecast.conditions[0].period.dateStart, weatherData.report.forecast.conditions[1].period.dateStart)}</td>
          </tr>

          <tr>
            <td>Forecast 2 - Wind Speed</td>
            <td>{(weatherData.report.forecast.conditions[1].wind.speedKts * 1.151).toFixed(1)} MPH</td>
          </tr>

          <tr>
            <td>Forecast 2 - Wind Direction</td>
            <td>{weatherData.report.forecast.conditions[1].wind.direction}&deg; true</td>
          </tr>

          <tr>
            <td>Forecast 3 - Time Offset</td>
            <td>{calcDateOffset(weatherData.report.forecast.conditions[0].period.dateStart, weatherData.report.forecast.conditions[2].period.dateStart)}</td>
          </tr>

          <tr>
            <td>Forecast 3 - Wind Speed</td>
            <td>{(weatherData.report.forecast.conditions[2].wind.speedKts * 1.151).toFixed(1)} MPH</td>
          </tr>

          <tr>
            <td>Forecast 3 - Wind Direction</td>
            <td>{weatherData.report.forecast.conditions[2].wind.direction}&deg; true</td>
          </tr>

        </tbody>
      </table>

    </main>
  )
}
