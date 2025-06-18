import Register from "@/components/auth/register"
import {auth} from "@/auth";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
    const session = await auth();
    if (session?.user) {
        return redirect("/");
    }
    return (
        <Register/>
    )
}

export default RegisterPage;