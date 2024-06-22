export const computeProgress = (user: number, previousmilestone: number, nextmilestone: number) => {
    return Math.ceil(
        ((user - previousmilestone) /
            (nextmilestone - previousmilestone)) *
        100
    );
}
