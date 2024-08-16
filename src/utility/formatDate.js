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
  const dayName = date.toLocaleDateString("en-US", { weekday: "short" })
  const day = date.getUTCDate()
  const month = months[date.getUTCMonth()]
  const year = date.getUTCFullYear()

  // Format the date as "25 July, 2024"
  return `${dayName} ${day} ${month}, ${year}`
}
export default formatDate
export function getFormattedDate() {
  const today = new Date()

  const day = String(today.getDate()).padStart(2, "0")
  const month = String(today.getMonth() + 1).padStart(2, "0") // Months are zero-based
  const year = String(today.getFullYear()).slice(-2) // Get the last two digits of the year

  return `${day}/${month}/${year}`
}
export function convertUTCtoIST(utcDateString) {
  // Create a Date object from the UTC date string
  const utcDate = new Date(utcDateString)

  // Calculate the IST offset (5 hours 30 minutes ahead of UTC)
  const istOffset = 5.5 * 60 * 60 * 1000 // 5.5 hours in milliseconds

  // Convert the UTC time to IST by adding the offset
  const istDate = new Date(utcDate.getTime() + istOffset)

  return istDate
}
export function calculateDaysBetween(startDate, endDate) {
  // Convert both dates to Date objects
  const start = new Date(startDate)
  const end = new Date(endDate)

  // Calculate the difference in time (milliseconds)
  const differenceInTime = end.getTime() - start.getTime()

  // Convert the difference from milliseconds to days
  const differenceInDays = differenceInTime / (1000 * 3600 * 24)

  return differenceInDays + 1
}
export function getDateRange(startDate, endDate) {
  // Convert the dates to Date objects if they aren't already
  let start = new Date(startDate)
  let end = new Date(endDate)

  // List to store dates
  let dateList = []

  // Loop from start date to end date
  while (start <= end) {
    // Format the date to yyyy-mm-dd
    let formattedDate = start.toISOString().split("T")[0]
    dateList.push(formattedDate)

    // Increment the date by 1 day
    start.setDate(start.getDate() + 1)
  }

  return dateList
}
