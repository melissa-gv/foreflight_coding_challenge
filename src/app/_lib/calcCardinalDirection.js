export default function calcNearestIntercardinalDirection(inputDegree) {
  const directions = {
    0: "N",
    22.5: "NNE",
    45: "NE",
    67.5: "ENE",
    90: "E",
    112.5: "ESE",
    135: "SE",
    157.5: "SSE",
    180: "S",
    202.5: "SSW",
    225: "SW",
    247.5: "WSW",
    270: "W",
    292.5: "WNW",
    315: "NW",
    337.5: "NNW"
  }

  let closestDegree = 0
  let smallestDifference = Math.abs(inputDegree - closestDegree)
  for (let degree in directions) {
    const currentDifference = Math.abs(inputDegree - degree)
    if (currentDifference < smallestDifference) {
      smallestDifference = currentDifference
      closestDegree = degree
    }
  }
  return directions[closestDegree]
}
