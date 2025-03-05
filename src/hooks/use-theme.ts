import { useTheme as useNextTheme } from "next-themes"

export function useTheme(): boolean {
    const { theme, systemTheme } = useNextTheme()

    // If the theme is set to system, use the system preference
    if (theme === "system") {
        return systemTheme === "dark"
    }

    // Otherwise, use the explicitly set theme
    return theme === "dark"
}