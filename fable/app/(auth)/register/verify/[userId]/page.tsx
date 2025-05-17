import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function VerifyRoute({ userId }: { userId: string }) {
  return (
    <Card className="max-w-xl mx-auto w-[90%] mt-10">
      <CardHeader>
        <Loader2 className="size-15 animate-spin text-primary bg-primary/20 rounded-full p-2 mx-auto" />
        <CardTitle className="text-xl mt-2">
          Verify your email address.
        </CardTitle>
        <CardDescription>
          We've just sent you an email. Head over to your email and click the
          link to verify your account.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
