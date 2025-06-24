import { Dropdown, Space, Tag } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { getPostTableActionColumn } from './PostTableActionColumn';

interface DataType {
    id: string;
    title: string;
    author: string;
    is_published: boolean;
    description: string;
    tags: string;
    created_at: string;
    updated_at: string;
    views: number;
}

export const getPostTableColumns = (router: any): ColumnsType<DataType> => [
    {
        title: 'Title',
        dataIndex: 'title',
        sorter: true,
    },
    {
        title: 'Author',
        dataIndex: 'author',
        filters: [
            { text: 'Male', value: 'male' },
            { text: 'Female', value: 'female' },
        ],
    },
    {
        title: 'Is Published',
        dataIndex: 'is_published',
        filters: [
            { text: 'Publish', value: '1' },
            { text: 'Un Publish', value: '0' },
        ],
        render: (_, record) => (
            <span style={{ color: record.is_published ? 'green' : 'red' }}>
                {record.is_published ? 'Publish' : 'Un Publish'}
            </span>
        ),
    },
    {
        title: 'Description',
        dataIndex: 'description',
        ellipsis: true,
        render: (text) => <span>{text}</span>,
    },
    {
        title: 'Tags',
        dataIndex: 'tags',
        filters: [
            { text: 'Technology', value: 'technology' },
            { text: 'Health', value: 'health' },
            { text: 'Lifestyle', value: 'lifestyle' },
        ],
        render: (_, record) => (
            <Tag color="blue" key={record.tags}>
                {record.tags}
            </Tag>
        ),
    },
    {
        title: 'Created At',
        dataIndex: 'created_at',
        sorter: true,
        render: (text) =>
            new Date(text).toLocaleString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            }).replace(',', ''),
    },
    {
        title: 'Updated At',
        dataIndex: 'updated_at',
        sorter: true,
        render: (text) =>
            new Date(text).toLocaleString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            }).replace(',', ''),
    },
    {
        title: 'Views',
        dataIndex: 'views',
        sorter: true,
    },
    getPostTableActionColumn(router),
];