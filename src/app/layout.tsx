import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "@/app/globals.css";
import {AntdRegistry} from '@ant-design/nextjs-registry';
import NextAuthWrapper from "@/library/next.auth.wrapper";
import '@ant-design/v5-patch-for-react-19';
import {SidebarProvider} from '@/context/SidebarContext';
import {ThemeProvider} from '@/context/ThemeContext';
import {Suspense} from "react";
import Loading from "./loading";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Dathh Admin Panel",
    description: "Dathh Admin Panel",
};

export default function RootLayout(
    {
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AntdRegistry>
            <Suspense fallback={<Loading/>}>
                <NextAuthWrapper>
                    <ThemeProvider>
                        <SidebarProvider>
                            {children}
                        </SidebarProvider>
                    </ThemeProvider>
                </NextAuthWrapper>
            </Suspense>
        </AntdRegistry>
        </body>
        </html>
    );
}
