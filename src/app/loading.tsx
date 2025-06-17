import {Flex, Spin} from "antd";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-30">
            <Flex align="center" gap="middle">
                <Spin size="large"/>
            </Flex>
        </div>
    );
}