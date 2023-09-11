"use client"

import calcNearestIntercardinalDirection from '../_lib/calcCardinalDirection'
import findGreatestClouldCoverage from '../_lib/cloudCoverage.js'
import calcBestRunway from '../_lib/bestRunway'
import calcDateOffset from '../_lib/calcDateOffset'

export default function AirportReport({ airportData, weatherData }) {
  const bestRunway = calcBestRunway(weatherData.report.conditions.wind.direction, airportData.runways)

  let forecasts = []

  if (weatherData) {
    for (let i = 1; i < 3; i++) {
      forecasts.push({
        timeOffset: calcDateOffset(weatherData.report.forecast.conditions[0].period.dateStart, weatherData.report.forecast.conditions[i].period.dateStart),
        windSpeed: (weatherData.report.forecast.conditions[i].wind.speedKts * 1.151).toFixed(1),
        degrees: weatherData.report.forecast.conditions[i].wind.direction,
      })
    }
  }

  return (
    <table>
      <thead>
        <tr>
          <th className='airport-name-header' colSpan="2">{`${airportData.name} (${airportData.faaCode})`}</th>
        </tr>
      </thead>

      <tbody>

        <tr>
          <td className='set-first-col-width'>Available Runways</td>
          <td><ul>
            {airportData.runways.map(runway => {
                if(runway.name === bestRunway) {
                  return <li className="best-runway" key={runway.ident}>{runway.name} - Recommended</li>
                } else {
                  return <li key={runway.ident}>{runway.name}</li>
                }
              })
            }
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
          <th colSpan="2">Weather</th>
        </tr>

        <tr>
          <td>Temperature</td>
          <td>
            {`${((weatherData.report.conditions.tempC * 9 / 5) + 32).toFixed(0)}\u00b0 F`}
          </td>
        </tr>

        <tr>
          <td>Relative Humidity</td>
          <td>{`${weatherData.report.conditions.relativeHumidity}%`}</td>
        </tr>

        <tr>
          <td>Cloud Coverage</td>
          <td>{findGreatestClouldCoverage(weatherData.report.conditions.cloudLayers)}</td>
        </tr>

        <tr>
          <td>Visibility</td>
          <td>{`${weatherData.report.conditions.visibility.distanceSm} Statute Miles`}</td>
        </tr>

        <tr>
          <td>Windspeed</td>
          <td>{`${(weatherData.report.conditions.wind.speedKts * 1.151).toFixed(1)} MPH`}</td>
        </tr>

        <tr>
          <td>Wind Direction</td>
          <td>{calcNearestIntercardinalDirection(weatherData.report.conditions.wind.direction)}</td>
        </tr>

        <tr>
          <th colSpan="2">Forecast</th>
        </tr>

        {forecasts.map((forecast, idx) => {
          return (
            <tr key={idx}>
              <td className='set-first-col-width'>{`In ${forecast.timeOffset}Z`}</td>
              <td>{`Wind from ${forecast.degrees}\u00b0 true at ${forecast.windSpeed} MPH`}</td>
            </tr>
          )
        })}

      </tbody>
    </table>
  )
}