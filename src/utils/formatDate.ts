export default function formatDate(createdAt:number){
    const date = new Date(createdAt)
    const formattedDate = `${date.getDate()} ${date.toLocaleString('en-US', { month: 'short' })}`
    return formattedDate
}