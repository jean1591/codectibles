import { Quality } from "@/app/api/interfaces/collectible";

const legendaryBgTheme =
"bg-gradient-to-tr from-purple-600 to-pink-300 border-purple-600";
const rareBgTheme =
"bg-gradient-to-tr from-blue-400 to-cyan-200 border-blue-400";
const commonBgTheme =
    "bg-gradient-to-tr from-green-500 via-lime-500 to-yellow-100 border-green-500";

export const qualityToThemeMapper: Record<Quality, string> = {
    [Quality.COMMON]: commonBgTheme,
    [Quality.RARE]: rareBgTheme,
    [Quality.LEGENDARY]: legendaryBgTheme,
};