'use server'

import {signIn} from "@/auth"
import { InvalidEmailPasswordError, InactiveUserError } from "./errors";

export async function authenticate(username: string, password: string) {
    try {
        return await signIn("credentials", {username, password, redirect: false});
    } catch (error) {
        console.error("Authentication error:", error);
        if (error instanceof InvalidEmailPasswordError) {
            return {
                error: "InvalidEmailPasswordError",
                code: 1
            }
        }
        if (error instanceof InactiveUserError) {
            return {
                error: "InactiveUserError",
                code: 2
            }
        }
    
        return {
                error: "Internal server error",
                code: 0
            }
    }
}