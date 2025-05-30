import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import AdminFooter from '@/components/layout/admin.footer';
import AdminHeader from '@/components/layout/admin.header';
import AdminSideBar from '@/components/layout/admin.sidebar';
import AdminContent from '@/components/layout/admin.content';
import { AdminContextProvider } from '@/library/admin.context';
import { auth } from '@/auth';

const AdminLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const session = await auth();
    return (
        <AdminContextProvider>
            <div style={{ display: "flex" }}>
                <div className='left-side' style={{ minWidth: 80 }}>
                    <AdminSideBar />
                </div>

                <div className='right-side' style={{ flex: 1 }}>
                    <AdminHeader session = {session}/>
                    <AdminContent>
                        {children}
                    </AdminContent>
                    <AdminFooter />
                </div>
            </div>
        </AdminContextProvider>
    );
}

export default AdminLayout