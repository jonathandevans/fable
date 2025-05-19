import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function SitesRoute() {
  return (
    <main className="max-w-6xl mx-auto mt-4 w-[95%]">
      <div className="text-end">
        <Button asChild>
          <Link href="/dashboard/sites/new">
            <PlusCircle className="size-4" />
            Create Site
          </Link>
        </Button>
      </div>
      <section></section>
    </main>
  );
}
