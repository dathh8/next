"use client"
import { Button, Col, Divider, Form, Input, message, notification, Row } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { signIn } from "next-auth/react"
import { authenticate } from '@/utils/action';
import { useRouter } from 'next/navigation';
import '@ant-design/v5-patch-for-react-19';

const Login = () => {
    const router = useRouter();
    const onFinish = async (values: any) => {
        const { username, password } = values;
        // const login = await signIn("credentials", { email, password, redirect: false });
        // console.log(login);
        const res = await authenticate(username, password);
        if (res?.error) {
            console.log('fail' + res?.error);
            notification.error({
                message: "Error login",
                description: res?.error
            });
            if(res?.error === 2) {
                router.push('/verify')
            }
        } else {
            router.push('/dashboard')
        }
        
        console.log('response' + res);
    };

    return (
        <Row justify={"center"} style={{ marginTop: "30px" }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{
                    padding: "15px",
                    margin: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "5px"
                }}>
                    <legend>Login</legend>
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        autoComplete="off"
                        layout='vertical'
                    >
                        <Form.Item
                            label="Email"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>



                        <Form.Item
                        >
                            <Button type="primary" htmlType="submit">
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                    <Link href={"/"}><ArrowLeftOutlined /> Back to Homepage</Link>
                    <Divider />
                    <div style={{ textAlign: "center" }}>
                        Not have account? <Link href={"/auth/register"}>Register here</Link>
                    </div>
                </fieldset>
            </Col>
        </Row>
    )
}

export default Login;