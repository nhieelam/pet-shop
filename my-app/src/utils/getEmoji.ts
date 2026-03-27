export const getEmojiPet = (species: string) => {
    if (species.includes("Dog")) return "🐕";
    if (species.includes("Cat")) return "🐈";
    if (species.includes("Bird")) return "🐦";
    if (species.includes("Fish")) return "🐠";
    return "🐾";
};