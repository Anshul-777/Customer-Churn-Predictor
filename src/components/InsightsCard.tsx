import { CheckCircle2, AlertTriangle, XCircle, Lightbulb } from "lucide-react";

interface InsightsCardProps {
  probability: number;
  riskLevel: "Low" | "Medium" | "High";
  recommendations: string[];
}

const icons = {
  Low: <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" style={{ color: "hsl(158, 64%, 40%)" }} />,
  Medium: <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" style={{ color: "hsl(38, 92%, 50%)" }} />,
  High: <XCircle className="h-4 w-4 shrink-0 mt-0.5" style={{ color: "hsl(0, 84%, 60%)" }} />,
};

export default function InsightsCard({ riskLevel, recommendations }: InsightsCardProps) {
  const insights = recommendations;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Lightbulb className="h-4 w-4 text-primary" />
        Actionable Recommendations
      </div>
      <ul className="space-y-2.5">
        {insights.map((insight, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
            {icons[riskLevel]}
            <span>{insight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
