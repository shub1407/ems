export default function getISTTime() {
  const now = new Date()
  const utcOffset = now.getTimezoneOffset() * 60000 // Get the UTC offset in milliseconds
  const localTime = now.getTime() + utcOffset // Convert local time to UTC
  const istOffset = 5.5 * 60 * 60000 // IST offset in milliseconds
  const istTime = new Date(localTime + istOffset) // Add IST offset to UTC time

  // Format to ISO string format without milliseconds
  const year = istTime.getFullYear()
  const month = String(istTime.getMonth() + 1).padStart(2, "0")
  const day = String(istTime.getDate()).padStart(2, "0")
  const hours = String(istTime.getHours()).padStart(2, "0")
  const minutes = String(istTime.getMinutes()).padStart(2, "0")
  const seconds = String(istTime.getSeconds()).padStart(2, "0")

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}+05:30`
}
