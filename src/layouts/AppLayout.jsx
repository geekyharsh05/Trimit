import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AnimatedCursor } from "@/components/AnimatedCursor";
import { Toaster } from "sonner";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen container">
        <Header />
        <AnimatedCursor />
        <Toaster />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
