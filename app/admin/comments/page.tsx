import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import AdminCommentsClient from "@/components/AdminCommentsClient";

export default async function AdminCommentsPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  if (session.user.email !== process.env.ADMIN_EMAIL) {
    redirect("/");
  }

  return <AdminCommentsClient />;
}
