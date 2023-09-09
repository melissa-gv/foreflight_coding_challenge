export default function calcBestRunway(windDirection, runways) {
  let bestRunwayIdx = 0
  let smallestDifference = Infinity
  for (let idx = 0; idx < runways.length; idx++) {
    let currentDifference = Math.min(Math.abs(runways[idx].trueHeading - windDirection), Math.abs(runways[idx].recipTrueHeading - windDirection))
    if (currentDifference < smallestDifference) {
      smallestDifference = currentDifference
      bestRunwayIdx = idx
    }
  }
  return runways[bestRunwayIdx].name
}
