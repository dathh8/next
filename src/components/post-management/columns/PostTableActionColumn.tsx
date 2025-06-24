import { Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

export const getPostTableActionColumn = (router: any) => ({
    title: 'Action',
    key: 'action',
    render: (_: any, record: any) => (
        <Space size="middle">
            <Dropdown
                menu={{
                    items: [
                        {
                            key: '1',
                            label: (
                                <span onClick={() => router.push(`/post_management/post_listing/edit/${record.id}`)}>
                                    Edit
                                </span>
                            ),
                        },
                        {
                            key: '2',
                            label: <span>View</span>,
                        },
                    ],
                }}
            >
                <a>
                    Select <DownOutlined />
                </a>
            </Dropdown>
        </Space>
    ),
});