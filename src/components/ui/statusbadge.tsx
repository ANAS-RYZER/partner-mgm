import React from 'react'

const StatusBadge = ({status}: {status: string}) => {
    const statusStyles: Record<string, string> = {
        ISPURCHASED: "bg-green-100 text-green-700 border border-green-300",
        ISVISITED: "bg-yellow-100 text-yellow-700 border border-yellow-300",
        ISCONFIRMED: "bg-blue-100 text-blue-700 border border-blue-300",
        NOTVISITED: "bg-red-100 text-red-700 border border-red-300",
    }
    const statusText: Record<string, string> = {
        ISPURCHASED: "Purchased",
        ISVISITED: "Visited",
        ISCONFIRMED: "Confirmed",
        NOTVISITED: "Not Visited",
    }
  return (
    <div className={`text-center py-1 rounded-md text-xs font-medium ${
      statusStyles[status]
    }`}>
      {statusText[status]}
    </div>
  )
}

export default StatusBadge