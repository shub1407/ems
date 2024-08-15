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
export function getFormattedDate() {
  const today = new Date()

  const day = String(today.getDate()).padStart(2, "0")
  const month = String(today.getMonth() + 1).padStart(2, "0") // Months are zero-based
  const year = String(today.getFullYear()).slice(-2) // Get the last two digits of the year

  return `${day}/${month}/${year}`
}
