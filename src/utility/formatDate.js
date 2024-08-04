function formatDate(dateString) {
  // Create a new Date object from the input date string
  const date = new Date(dateString)

  // Define an array of month names
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // Extract day, month, and year from the Date object
  const day = date.getUTCDate()
  const month = months[date.getUTCMonth()]
  const year = date.getUTCFullYear()

  // Format the date as "25 July, 2024"
  return `${day} ${month}, ${year}`
}
export default formatDate
