import ToastProvider from '@/components/ToastProvider'
import Navbar from "@/components/global/Navbar";
import NavHeader from "@/components/NavHeader";
import Footer from "@/components/global/Footer";
import Container from "@/components/global/Container";

export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <ToastProvider>
            <NavHeader />
            <Navbar />
            <Container>
                <div className="min-h-[80vh]">
                    {children}
                </div>
                <Footer />
            </Container>

        </ToastProvider>
    );
}
