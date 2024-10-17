import Footer from "@/components/manga/footer";
import SearchBar from "@/components/search-bar";
import Sidebar from "@/components/sidebar";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w- relative flex min-h-screen">
      {/* Background Split */}
      <div className="fixed left-0 top-0 -z-10 flex h-full min-h-screen w-full">
        {/* Left section (45%) */}
        <div className="h-full basis-[45%] bg-[#f0eee2] dark:bg-[#2b2b2b]" />
        {/* Dark mode suggestion: #2b2b2b is a deep neutral gray */}

        {/* Right section (remaining 55%) */}
        <div className="h-full flex-1 bg-[#f9f7eb] dark:bg-[#1c1c1c]" />
        {/* Dark mode suggestion: #1c1c1c is an even darker gray for contrast */}
      </div>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div
        id="main-page"
        className="flex flex-1 flex-col overflow-x-hidden pt-6 custom-scrollbar"
      >
        <div className="sm:px-8">
          <SearchBar />
          <div className="flex h-full flex-1 flex-col">{children}</div>
        </div>
        <Footer />
      </div>
      <Toaster richColors />
    </main>
  );
};

export default RootLayout;
