import DashboardCard from '@/components/DashboardCard'
import { AlertCircleIcon, CalendarCheck2Icon, CheckCircleIcon, IndianRupee, LoaderCircle, UsersIcon } from 'lucide-react'
import React from 'react'
import { RevenueChart } from '../components/RevenueChart'
import AppointmentStatus from '../components/AppointmentStatus'
import TableComponent from '@/components/TableComponent'
import { RecentAppointmentsCols, type RecentAppointmentsRow } from '../schema/recentAppointmentsCols'
import { AppointmentCard } from '@/modules/appointments/components/AppointmentCard'
import { useRouter } from 'next/navigation'
import { NewCustomersCols, type NewCustomersColsProps } from '../schema/CustomerCols'
import { useGetDashboard } from '../hooks/useGetDashboard'
import { CustomerRow } from '@/modules/commission/ui/CustomerRow'
import { formatDate } from '@/lib/formatDate'

export const DashboardPage = () => {
    const router = useRouter();
    const { data: dashboardData, isFetching, isError } = useGetDashboard();
    if (isFetching) {
        return <>
            <div className="flex items-center justify-center p-10 mt-20">
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
    const recentAppointments: RecentAppointmentsRow[] =
        dashboardData?.data?.recentAppointments ?? [];
    const recentCustomers: NewCustomersColsProps[] =
        dashboardData?.data?.recentCustomers ?? [];

    return (
        <div className='space-y-4 p-4'>
            <h1 className='max-md:hidden text-2xl font-semibold'>
                Welcome Back, {dashboardData?.data?.agentName}.
            </h1>
            <div className='grid grid-cols-2 gap-2 lg:grid-cols-4'>
                <DashboardCard title='Total Earnings' value={dashboardData?.data?.totalEarnings || "0"} rightIcon={<IndianRupee size={20} />} rightIconClassName='text-green-500 rounded-full p-2 bg-green-50' />
                <DashboardCard title='Total Customers' value={dashboardData?.data?.totalCustomers || "0"} rightIcon={<UsersIcon size={20} />} rightIconClassName='text-blue-500 rounded-full p-2 bg-blue-50' />
                <DashboardCard title='Total Appointments' value={dashboardData?.data?.totalAppointments || "0"} rightIcon={<CalendarCheck2Icon size={20} />} rightIconClassName='text-yellow-500 rounded-full p-2 bg-yellow-50' />
                <DashboardCard title='Visited Rate' value={`${dashboardData?.data?.visitedRate || "0"}%`} rightIcon={<CheckCircleIcon size={20} />} rightIconClassName='text-green-500 rounded-full p-2 bg-green-50' />
            </div>
            <div className='grid grid-cols-1 gap-2 xl:grid-cols-2'>
                <div className='w-full'>
                    <RevenueChart data={dashboardData?.data?.monthlyEarnings} />
                </div>
                <div className='w-full'>
                    <AppointmentStatus data={dashboardData?.data?.appointmentStatus} />
                </div>
            </div>

            <div className='space-y-2 p-2'>
                <h1 className='text-lg font-semibold'>Recent Appointments</h1>
                <div className='hidden md:block'>
                    <TableComponent
                        columns={RecentAppointmentsCols(router)}
                        data={recentAppointments}
                        model="Appointment"
                    />
                </div>
                <div className='block space-y-3 md:hidden'>
                    {recentAppointments.length === 0 ? (
                        <p className='text-sm text-muted-foreground'>No recent appointments.</p>
                    ) : (
                        recentAppointments.map((row) => (
                            <AppointmentCard
                                key={row._id}
                                data={{
                                    _id: row._id,
                                    date: row.date,
                                    customerName: row.customerName,
                                    slot: row.slot,
                                }}
                            />
                        ))
                    )}
                </div>
            </div>
            <div className='space-y-2 p-2'>
                <h1 className='text-lg font-semibold'>New Customers</h1>
                <div className='hidden md:block'>
                    <TableComponent
                        columns={NewCustomersCols(router)}
                        data={recentCustomers}
                        model="Customer"
                    />
                </div>
                <div className='block space-y-3 md:hidden'>
                    {recentCustomers.length === 0 ? (
                        <p className='text-sm text-muted-foreground'>No new customers.</p>
                    ) : (
                        recentCustomers.map((row) => (
                            <CustomerRow
                                key={row._id}
                                data={{
                                    _id: row._id,
                                    customerName: row.fullName,
                                    email: row.email,
                                    createdAt: formatDate(row.createdAt),
                                }}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>

    )
}