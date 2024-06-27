import { Quality } from "../interface/tmp";

const commonBgTheme =
    "bg-gradient-to-tr from-violet-500 to-indigo-300 border-violet-500";
const rareBgTheme =
    "bg-gradient-to-tr from-red-500 to-orange-300 border-red-500";
const legendaryBgTheme =
    "bg-gradient-to-tr from-yellow-400 via-amber-300 to-yellow-100 border-yellow-400";

export const qualityToThemeMapper: Record<Quality, string> = {
    [Quality.COMMON]: commonBgTheme,
    [Quality.RARE]: rareBgTheme,
    [Quality.LEGENDARY]: legendaryBgTheme,
};