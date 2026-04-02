import DashboardCard from '@/components/DashboardCard'
import { AlertCircleIcon, CalendarCheck2Icon, CheckCircleIcon, DollarSignIcon, LoaderCircle, UsersIcon } from 'lucide-react'
import React from 'react'
import { RevenueChart } from '../components/RevenueChart'
import AppointmentStatus from '../components/AppointmentStatus'
import TableComponent from '@/components/TableComponent'
import { RecentAppointmentsCols } from '../schema/recentAppointmentsCols'
import { useRouter } from 'next/navigation'
import { NewCustomersCols } from '../schema/CustomerCols'
import { useGetDashboard } from '../hooks/useGetDashboard'

export const DashboardPage = () => {
    const router = useRouter();
    const { data: dashboardData, isFetching, isError } = useGetDashboard();
    if (isFetching) {
        return <>
             <div className="flex items-center justify-center p-10">
              <LoaderCircle size={50} className="animate-spin text-gold" />
            </div>
        </>
    }
    if (isError) {
        return <>
            <div className='flex items-center justify-center h-screen'>
                <AlertCircleIcon className='w-10 h-10 text-red-500' />
                <p className='text-red-500'>Error while Fetching Data. Please try again later.</p>
            </div>
        </>
    }
    console.log(dashboardData?.data);
    return (
        <div className='space-y-4 p-5'>
            <h1 className='font-semibold text-2xl'>Welcome Back, {dashboardData?.data?.agentName}.</h1>
            <div className='grid grid-cols-4 gap-2'>
                <DashboardCard title='Total Earnings' value={dashboardData?.data?.totalEarnings || "0"} rightIcon={<DollarSignIcon size={20} />} rightIconClassName='text-green-500 rounded-full p-2 bg-green-50' />
                <DashboardCard title='Total Customers' value={dashboardData?.data?.totalCustomers || "0"} rightIcon={<UsersIcon size={20} />} rightIconClassName='text-blue-500 rounded-full p-2 bg-blue-50' />
                <DashboardCard title='Total Appointments' value={dashboardData?.data?.totalAppointments || "0"} rightIcon={<CalendarCheck2Icon size={20} />} rightIconClassName='text-yellow-500 rounded-full p-2 bg-yellow-50' />
                <DashboardCard title='Visited Rate' value={`${dashboardData?.data?.visitedRate || "0"}%`} rightIcon={<CheckCircleIcon size={20} />} rightIconClassName='text-green-500 rounded-full p-2 bg-green-50' />
            </div>
            <div className='flex gap-2'>
                <div className='w-full'>
                    <RevenueChart data={dashboardData?.data?.monthlyEarnings} />
                </div>
                <div className='w-full'>
                    <AppointmentStatus data={dashboardData?.data?.appointmentStatus} />
                </div>
            </div>

            <div className='p-2 space-y-2'>
                <h1 className='font-semibold text-lg'>Recent Appointments</h1>
                <TableComponent
                    columns={RecentAppointmentsCols(router)}
                    data={dashboardData?.data?.recentAppointments}
                    model="Appointment"
                />
            </div>
            <div className='p-2 space-y-2'>
                <h1 className='font-semibold text-lg'>New Customers</h1>
                <TableComponent
                    columns={NewCustomersCols(router)}
                    data={dashboardData?.data?.recentCustomers}
                    model="Customer"
                />
            </div>
        </div>

    )
}