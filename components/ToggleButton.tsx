import { cn } from "@/lib/utils";
import { Switch } from "@headlessui/react";

interface ToggleButtonProps {
  enabled: boolean;
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  updateData: (isActive: boolean) => void;
}

export default function ToggleButton({
  enabled,
  setEnabled,
  updateData,
}: ToggleButtonProps) {
  return (
    <Switch
      checked={enabled}
      onChange={(value) => {
        setEnabled(value);
        updateData(value);
      }}
      className={cn(
        enabled ? "bg-violet-500" : "bg-violet-300",
        "relative inline-flex h-8 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          enabled ? "translate-x-6" : "translate-x-0",
          "pointer-events-none inline-block h-7 w-7 -mt-[1px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
        )}
      />
    </Switch>
  );
}
