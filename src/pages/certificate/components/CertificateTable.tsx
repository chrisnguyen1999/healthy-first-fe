import CustomTable from '@/components/table/CustomTable';
import { DEFAULT_PAGINATION } from '@/config';
import {
    Certificate,
    CertificateListResponse,
    CertificateStatus,
    ColumnsType,
    ResponseData,
    SortChangeProps,
    SortType,
} from '@/types';
import { downloadCertificate, renderCertificateStatus } from '@/utils';
import dayjs from 'dayjs';
import { Button } from 'react-bootstrap';
import { UseMutateFunction } from 'react-query';
import { Link } from 'react-router-dom';

interface CertificateTableProps {
    certtificateListResponse: CertificateListResponse;
    tableLoading: boolean;
    onPageChange: (selected: number) => void;
    onPageLimitChange: (selected: number) => void;
    onSortChange: (sortObject: SortChangeProps) => void;
    sortQuery: Record<string, SortType | null>;
    onPrintCertificate: UseMutateFunction<
        ResponseData<any>,
        unknown,
        string,
        unknown
    >;
}

const CertificateTable: React.FC<CertificateTableProps> = ({
    certtificateListResponse,
    tableLoading,
    onPageChange,
    onPageLimitChange,
    onSortChange,
    sortQuery,
    onPrintCertificate,
}) => {
    const columns: ColumnsType<Certificate>[] = [
        {
            key: 'facilityName',
            title: 'Facility name',
            render: (value: string) => <h5 className="m-b-0">{value}</h5>,
            showSort: true,
            sortType: sortQuery['facilityName'],
        },
        {
            key: 'status',
            title: 'Status',
            showSort: true,
            render: (value: CertificateStatus) =>
                renderCertificateStatus(value),
            sortType: sortQuery['status'],
        },
        {
            key: 'isRevoked',
            title: 'Revoked',
            showSort: true,
            render: (value: boolean) =>
                value && <label className="badge bg-danger">revoked</label>,
            sortType: sortQuery['isRevoked'],
        },
        {
            key: 'startDate',
            title: 'Start date',
            render: (value: string) => dayjs(value).format('DD/MM/YYYY'),
            showSort: true,
            sortType: sortQuery['startDate'],
        },
        {
            key: 'endDate',
            title: 'End date',
            render: (value: string) => dayjs(value).format('DD/MM/YYYY'),
            showSort: true,
            sortType: sortQuery['endDate'],
        },
        {
            key: 'createdAt',
            title: 'Created at',
            render: (value: string) => dayjs(value).format('DD/MM/YYYY'),
            showSort: true,
            sortType: sortQuery['createdAt'],
        },
    ];

    const actions = (data: Certificate) => (
        <div className="d-flex gap-3 justify-content-center">
            <Link to={`/certificate/edit/${data._id}`}>
                <Button
                    variant="outline-info"
                    size="sm"
                    title="View certificate"
                >
                    <i className="mdi mdi-eye"></i>
                </Button>
            </Link>
            {(data.status === CertificateStatus.COMPLETED ||
                data.status === CertificateStatus.FAILURE) && (
                <>
                    <Button
                        variant="outline-secondary"
                        size="sm"
                        title="Print certificate"
                        onClick={() => onPrintCertificate(data._id)}
                    >
                        <i className="mdi mdi-printer"></i>
                    </Button>
                    <Button
                        variant="outline-purple"
                        size="sm"
                        title="Download certificate"
                        onClick={() => downloadCertificate(data._id)}
                    >
                        <i className="mdi mdi-download"></i>
                    </Button>
                </>
            )}
        </div>
    );

    return (
        <CustomTable
            columns={columns}
            dataSource={certtificateListResponse?.data?.records || []}
            pagination={
                certtificateListResponse?.data?.pagination || DEFAULT_PAGINATION
            }
            title="Certificate Table"
            subtitle="Overview of Certificate Table"
            actions={actions}
            isLoading={tableLoading}
            onPageChange={onPageChange}
            onPageLimitChange={onPageLimitChange}
            onSortChange={onSortChange}
        />
    );
};

export default CertificateTable;
