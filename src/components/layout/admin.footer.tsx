'use client'
import { Layout, Menu, theme } from 'antd';

const AdminFooter = () => {
    const { Footer } = Layout;
    return (
        <>
            <Footer style={{ textAlign: 'center' }}>
                dathh ©{new Date().getFullYear()} Created by dathh
            </Footer>
        </>
    )
}
export default AdminFooter;