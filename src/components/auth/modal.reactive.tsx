'use client'
import React, { useEffect, useState } from 'react';
import { Button, Modal, Steps, Form, Input, notification } from 'antd';
import { useHasMounted } from '@/utils/customHook';
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { sendRequest } from '@/utils/api';

const ModalReactive = (props: any) => {
    const { isModalOpen, setIsModalOpen, userEmail } = props;
    const [current, setCurrent] = useState(0);
    const [userId, setUserId] = useState('');
    const [form] = Form.useForm();
    const hasMounted = useHasMounted();

    useEffect(() => {
        form.setFieldValue("email", userEmail)
    }, [userEmail])

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinishStep0 = async (values: any) => {
        const { email } = values;
        const res = await sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/retry-active`,
            method: "POST",
            body: {
                email
            }
        });
        if (res?.data) {
            setCurrent(1);
            setUserId(res?.data?.id)
        } else {
            notification.error({
                message: "Error",
                description: res?.message
            });
        }
    };

    const onFinishStep1 = async (values: any) => {
        const { id, code } = values;
        const res = await sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/check-code`,
            method: "POST",
            body: {
                id: userId, code
            }
        })
        if (res?.data) {
            setCurrent(2);
        } else {
            notification.error({
                message: "Error",
                description: res?.message
            });
        }
    };

    return (
        <>
            <Modal
                title="Active User"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                maskClosable={false}
                footer={null}
            >
                <Steps
                    current={current}
                    items={[
                        {
                            title: 'Login',
                            // status: 'finish',
                            icon: <UserOutlined />,
                        },
                        {
                            title: 'Verification',
                            // status: 'finish',
                            icon: <SolutionOutlined />,
                        },
                        {
                            title: 'Done',
                            // status: 'wait',
                            icon: <SmileOutlined />,
                        },
                    ]}
                />
                {current === 0 &&
                    <>
                        <div style={{ marginTop: 20 }}>
                            Your account have been not active

                        </div>
                        <Form
                            name="verify-emil-form"
                            onFinish={onFinishStep0}
                            autoComplete="off"
                            layout='vertical'
                            form={form}
                        >
                            <Form.Item
                                label=""
                                name="email"
                                initialValue={userEmail}
                            >
                                <Input disabled />
                            </Form.Item>

                            <Form.Item
                            >
                                <Button type="primary" htmlType="submit">
                                    Resend
                                </Button>
                            </Form.Item>
                        </Form>
                    </>
                }
                {current === 1 &&
                    <>
                        <div style={{ marginTop: 20 }}>
                            Enter your code send to your email
                        </div>
                        <Form
                            name="re-active-user-form"
                            onFinish={onFinishStep1}
                            autoComplete="off"
                            layout='vertical'
                            form={form}
                        >
                            <Form.Item
                                label="Active code"
                                name="code"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input code!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                            >
                                <Button type="primary" htmlType="submit">
                                    Active
                                </Button>
                            </Form.Item>
                        </Form>
                    </>
                }

                {current ===2 &&
                 <div style={{ marginTop: 20 }}>
                            Your account have been active succeesfuly. Please login agaign
                </div>
                }
            </Modal>
        </>
    );

}

export default ModalReactive;