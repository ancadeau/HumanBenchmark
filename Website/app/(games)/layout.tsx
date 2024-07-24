import { GameLayout } from "@/components/layout/gameLayout";
import "@/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GameLayout>{children}</GameLayout>;
}