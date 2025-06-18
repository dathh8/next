import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Login from "@/components/auth/login"

const LoginPage = async () => {
    const session = await auth();
    if (session?.user) {
        return redirect("/");
    }
    return (
        <Login/>
    )
}

export default LoginPage;