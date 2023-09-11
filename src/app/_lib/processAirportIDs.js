export default function processAirportIDs(input) {
  if (input === '') return new Error('Enter one or more valid aiport identifiers. Input can not be an empty string.')
  
  const airportIDs = []

  let currentAirportID = ''
  for (let char of input) {
    if (/[a-zA-Z]/.test(char)) {
      currentAirportID += char
    } else {
      if (currentAirportID !== '') {
        airportIDs.push(currentAirportID)
        currentAirportID = ''
      }
    }
  }

  // Check if there's a remaining airport code at the end of the input
  if (currentAirportID !== '') {
    airportIDs.push(currentAirportID)
  }

  return airportIDs
}
