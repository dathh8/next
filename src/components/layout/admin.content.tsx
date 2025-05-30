'use client'
import { Layout, Menu, theme } from 'antd';

const AdminContent = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const { Content } = Layout;
    return (
        <Content style={{ margin: '24px 16px 0' }}>
            <div
                style={{
                    padding: 24,
                    minHeight: 'calc(100vh - 180px)',
                }}
            >
                {children}
            </div>
        </Content>
    );
}

export default AdminContent