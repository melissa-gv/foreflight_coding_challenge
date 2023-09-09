export default function calcDateOffset(firstDateISO, secondDateISO) {
  const firstDate = new Date(firstDateISO)
  const secondDate = new Date(secondDateISO)

  const timeDifferenceMs = secondDate - firstDate
  const hours = Math.floor(timeDifferenceMs / 3600000); // 1 hour = 3600000 milliseconds
  const minutes = Math.floor((timeDifferenceMs % 3600000) / 60000); // 1 minute = 60000 milliseconds
  
  return `${hours}:${minutes}`
}
