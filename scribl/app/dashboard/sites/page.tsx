import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

export default function SitesRoute() {
  return (
    <>
      <div className="mt-4 text-end">
        <Button>
          <PlusCircle className="size-4" />
          Create Site
        </Button>
      </div>
      <section></section>
    </>
  );
}
