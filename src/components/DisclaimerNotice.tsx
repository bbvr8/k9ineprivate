import { AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";

export const DisclaimerNotice = () => {
  return (
    <Card className="p-4 border-warning/20 bg-warning/10">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-warning mb-2">Important Disclaimer</h3>
          <p className="text-sm text-foreground mb-2">
            ANY COMP BAN IN ANY SERVER IS NOT MY FAULT, USING THIS IS YOUR RESPONSIBILITY
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            I LOVE DUMBBOY
          </p>
        </div>
      </div>
    </Card>
  );
};