"use client";
import { Input } from '@/components/ui/input'
import { IndianRupee, LoaderCircle, Search } from 'lucide-react'
import { CommissionListCols, type CommissionRow } from '../schema/commissionListCols'
import { CommissionCard } from '../ui/CommissionCard'
import TableComponent from '@/components/TableComponent'
import { useRouter } from 'next/navigation'
import DashboardCard from '@/components/DashboardCard';
import { formatCurrency } from '@/lib/formatcurrency';
import { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useGetCommissionsList } from '../hooks/useGetCommissionsList';
import Pagination from '@/components/Pagination';
import { useGetCommissionCounts } from '../hooks/useGetCommissionCounts';

const CommissionlistPage = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const { data: commissionCounts, isFetching: isCommissionCountsLoading } = useGetCommissionCounts();
    const { data: commissionsList, isFetching: isCommissionsListLoading, error } = useGetCommissionsList(debouncedSearchTerm, currentPage, limit);
    const listData = commissionsList?.data;
    const commissions = listData?.commissions ?? [];
    const pagination = listData?.pagination;
    const currentPageNumber = pagination?.currentPage ?? currentPage;
    const totalPages = pagination?.totalPages ?? 1;
    const serverLimit = pagination?.limit ?? limit;

    if (isCommissionCountsLoading && isCommissionsListLoading) {
        return <div className="flex items-center justify-center p-10 h-96 mt-20">
            <LoaderCircle size={50} className="animate-spin text-gold" />
        </div>
    }
    if (error) {
        return <div className="flex items-center justify-center p-10 h-96">
            <p className="text-red-500">Error fetching commission counts</p>
        </div>
    }

    return (
        <div className='p-5 space-y-4'>
            <h1 className='text-2xl font-bold'>Commission List</h1>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <DashboardCard title="Total Commissions" value={formatCurrency(commissionCounts?.data?.totalCommissionAmount ?? 0)} rightIcon={<IndianRupee size={20} />} rightIconClassName="text-green-500 rounded-full p-2 bg-green-100" />
                <DashboardCard title="Unpaid Commissions" value={formatCurrency(commissionCounts?.data?.unpaidCommission ?? 0)} rightIcon={<IndianRupee size={20} />} rightIconClassName="text-yellow-500 rounded-full p-2 bg-yellow-100" />
            </div>

            {/* Search */}

            <div className="relative flex-1 ">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground " />
                <Input
                    placeholder="Search by name or email... "
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="pl-10 pr-4 py-5 w-full bg-white"
                />
            </div>
            {isCommissionsListLoading ? (
                <div className="flex items-center justify-center p-10 h-96">
                    <LoaderCircle size={50} className="animate-spin text-gold" />
                </div>
            ) : (
                <>
                    <div className="block space-y-3 md:hidden">
                        {commissions.length === 0 ? (
                            <p className="py-4 text-sm text-muted-foreground">
                                No commissions found.
                            </p>
                        ) : (
                            (commissions as CommissionRow[]).map((row, index) => (
                                <CommissionCard
                                    key={row.orderId ?? `commission-${index}`}
                                    data={{
                                        orderId: row.orderId,
                                        customerName: row.customerName,
                                        email: row.customerEmail,
                                        commissionAmount: row.commissionAmount ?? 0,
                                    }}
                                />
                            ))
                        )}
                    </div>
                    <div className="hidden rounded-xl bg-background md:block">
                        <TableComponent
                            columns={CommissionListCols(router)}
                            data={commissions}
                            model="Commission"
                        />
                    </div>
                </>
            )}
            {!error && pagination && (
                <Pagination
                    currentPage={currentPageNumber}
                    totalPages={totalPages}
                    hasPreviousPage={currentPageNumber > 1}
                    hasNextPage={currentPageNumber < totalPages}
                    limit={serverLimit}
                    onPageChange={(page) => setCurrentPage(page)}
                    onPageSizeChange={(newLimit) => {
                        setLimit(newLimit);
                        setCurrentPage(1);
                    }}
                />
            )}
        </div>
    );
};

export default CommissionlistPage;