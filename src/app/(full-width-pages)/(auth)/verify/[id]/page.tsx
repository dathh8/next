import Verify from "@/components/auth/verify";

interface Props {
    params: Promise<{ id: string }>
}

const VerifyPage = async ({ params }: Props) => {
    const {id} = await params;
    return (
        <>
            <Verify id = {id}/>
        </>
    );
}
export default VerifyPage;