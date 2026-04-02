import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {  CheckCircleIcon, MapPin, ShoppingCartIcon, XIcon } from 'lucide-react'
import React from 'react'

const AppointmentStatus = ({ data }: { data: any }) => {
    return (
        <Card >
            <CardHeader>
                <CardTitle>Appointment Status</CardTitle>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col items-center justify-between gap-2'>
                    
                    <div className='w-full p-3 flex items-center justify-between bg-gray-100 rounded-md'>
                        <div>
                            <p className='text-sm text-gray-500'>Purchased</p>
                            <p className='text-lg font-semibold'>{data?.purchased || "0"}</p>
                        </div>
                        <div className='flex items-center justify-between p-2 bg-green-100 rounded-full'>
                            <ShoppingCartIcon size={20} className='text-green-500' />
                        </div>
                    </div>
                    <div className='w-full p-3 flex items-center justify-between bg-gray-100 rounded-md'>
                        <div>
                            <p className='text-sm text-gray-500'>Visited</p>
                            <p className='text-lg font-semibold'>{data?.visited || "0"}</p>
                        </div>
                        <div className='flex items-center justify-between p-2 bg-yellow-100 rounded-full'>
                            <MapPin size={20} className='text-yellow-500' />
                        </div>
                    </div>
                    <div className='w-full p-3 flex items-center justify-between bg-gray-100 rounded-md'>
                        <div>
                            <p className='text-sm text-gray-500'>Confirmed</p>
                            <p className='text-lg font-semibold'>{data?.confirmed || "0"}</p>
                        </div>
                        <div className='flex items-center justify-between p-2 bg-blue-100 rounded-full'>
                            <CheckCircleIcon size={20} className='text-blue-500' />
                        </div>
                    </div>
                    <div className='w-full p-3 flex items-center justify-between bg-gray-100 rounded-md'>
                        <div>
                            <p className='text-sm text-gray-500'>Not Visited</p>
                            <p className='text-lg font-semibold'>{data?.notVisited || "0"}</p>
                        </div>
                        <div className='flex items-center justify-between p-2 bg-red-100 rounded-full'>
                            <XIcon size={20} className='text-red-500' />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default AppointmentStatus