export default function getDateNDaysEarlier(n) {
  const currentDate = new Date() // Get the current date
  const earlierDate = new Date() // Create a new date object based on the current date
  earlierDate.setDate(currentDate.getDate() - n) // Subtract n days from the current date
  return earlierDate // Return the earlier date
}
