import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { NewSiteForm } from "@/components/dashboard/form/new-site";

export default function NewSiteRoute() {
  return (
    <main className="max-w-6xl mx-auto mt-4 flex flex-col gap-y-4 w-[95%]">
      <div className="flex gap-x-4 items-center">
        <Button asChild size="icon" variant="outline">
          <Link href="/dashboard/sites">
            <ChevronLeft />
          </Link>
        </Button>
        <h1 className="text-xl tracking-tight">Create a new site</h1>
      </div>

      <NewSiteForm />
    </main>
  );
}
