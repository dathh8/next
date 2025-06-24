'use client';

import {Dropdown, notification, Space, Table, Tag} from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import qs from 'qs';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {DownOutlined} from "@ant-design/icons";
import '@ant-design/v5-patch-for-react-19';
import { getPostTableColumns } from './columns/PostTableColumns';


interface DataType {
    name: {
        first: string;
        last: string;
    };
    gender: string;
    email: string;
    login: {
        uuid: string;
    };
}

interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Record<string, FilterValue>;
}

const getRandomuserParams = (params: TableParams) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
});

const PostTable: React.FC = (props: any) => {
    const router = useRouter();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const columns = getPostTableColumns(router);

    const fetchData = () => {
        setLoading(true);
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/post/getAll?${qs.stringify(getRandomuserParams(tableParams))}`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('access_token') || ''}`,
            },
        })
            .then(res => {
            if (res.status === 401) {
                notification.error({
                    message: "Error login",
                    description: 'You are not authorized to access this resource. Please login again.',
                });
                setLoading(false);
                return Promise.reject('Unauthorized');
            }
            return res.json();
        })
            .then(({ data }) => {
                setData(data.results);
                setLoading(false);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: data.total,
                    },
                });
            });
    };

    useEffect(() => {
        fetchData();
    }, [JSON.stringify(tableParams)]);

    const handleTableChange = (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue>,
        sorter: SorterResult<DataType>,
    ) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
    };

    return (
        <Table
            columns={columns}
            rowKey={record => record.id}
            dataSource={data}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
            sticky={{ offsetHeader: 75 }}
        />
    )
};

export default PostTable;