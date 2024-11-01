import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./globals.css";
import PreHeader from "@/components/PreHeader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LoadingProvider } from "@/context/LoadingContext";

export const metadata = {
  title: "JOB PORTAL",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LoadingProvider>
          <PreHeader />
          <Header />
          <main>{children}</main>
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </LoadingProvider>
      </body>
    </html>
  );
}
