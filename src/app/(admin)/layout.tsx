"use client";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoad, setisLoad] = useState(false);
  const { data, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status == "authenticated") {
      if (!data) return router.push("/signin");
      setisLoad(true);
    }
    if (status == "unauthenticated") return router.push("/signin");
  }, [status]);
  return (
    <>
      {!isLoad ? (
        <Loader />
      ) : (
        <div className="flex w-full h-full">
          <Navbar />
          <div className="flex-1 mx-8">{children}</div>
        </div>
      )}
    </>
  );
}
