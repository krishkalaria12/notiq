import { Moon, Sun } from "lucide-react"
import { useTheme } from "../providers/theme-provider"
import { Switch } from "./ui/switch"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center gap-2">
      <Sun className="h-[1.2rem] w-[1.2rem]" />
      <Switch
        checked={theme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
      <Moon className="h-[1.2rem] w-[1.2rem]" />
    </div>
  )
}