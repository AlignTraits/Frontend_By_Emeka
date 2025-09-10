import { AlertTriangle } from "lucide-react";

export default function ActionRequiredAlert() {
  return (
    <div className="bg-[#fff] border border-amber-200 rounded-lg p-4 flex items-start gap-3 w-full mx-auto">
      <AlertTriangle className="w-5 h-5 text-amber-800 mt-0.5 flex-shrink-0" />
      <div>
        <h3 className="font-semibold text-amber-800 text-sm mb-1">
          Action Required
        </h3>
        <p className="text-amber-700 text-sm leading-relaxed">
          We need you to create two types of exam records so we can properly recommend courses for you.
        </p>
      </div>
    </div>
  );
}