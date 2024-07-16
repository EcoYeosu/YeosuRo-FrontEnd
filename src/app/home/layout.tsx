import { UserProvider } from "@auth0/nextjs-auth0/client";
import Footer from "@components/module/Footer";
import { Header } from "@components/module/Header";
import { Providers } from "@app/provider";
import { getSession } from "@auth0/nextjs-auth0";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "홈",
  description: "Bliisly 홈페이지 입니다.",
};

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const getUser = () => session?.user;

  return (
    <html lang="ko" className="light">
      <UserProvider>
        <body>
          <Providers>
            <Header session={getUser()} />
            <main className="bg-white flex flex-col">
              {children}
            </main>
            <Footer />
          </Providers>
        </body>
      </UserProvider>
    </html>
  );
}
 