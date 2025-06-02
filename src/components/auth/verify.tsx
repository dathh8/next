'use client'
import React from 'react';
import { Button, Col, Divider, Form, Input, message, notification, Row } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { sendRequest } from '@/utils/api';
import { useRouter } from 'next/navigation';
import '@ant-design/v5-patch-for-react-19';

const Verify = (props: any) => {
    const { id } = props;

    const router = useRouter()

    const onFinish = async (values: any) => {
        const { _id, code } = values;
        const res = await sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/check-code`,
            method: "POST",
            body: {
                _id, code
            }
        })
        if (res?.data) {
            message.success("Active user success.")
            router.push(`/auth/login`);
        } else {
            notification.error({
                message: "Verify error",
                description: res?.message
            })
        }
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
                    <legend>Active User</legend>
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        autoComplete="off"
                        layout='vertical'
                    >
                        <Form.Item
                            label="Id"
                            name="_id"
                            initialValue={id}
                            
                        >
                            <Input disabled />
                        </Form.Item>
                        <div>
                            Active code had been send to register email, please check your email.
                        </div>
                        <Divider />

                        <Form.Item
                            label="Code"
                            name="code"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your code!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>



                        <Form.Item
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                    <Link href={"/"}><ArrowLeftOutlined /> Back to HomePage</Link>
                    <Divider />
                    <div style={{ textAlign: "center" }}>
                        Had User? <Link href={"/auth/login"}>Login</Link>
                    </div>

                </fieldset>
            </Col>
        </Row>

    )
}

export default Verify;