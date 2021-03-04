// import * as levenshtien from 'damerau-levenshtien';
import levenshtien from 'damerau-levenshtien';

interface LevenshteinResponse {
    steps: number;
    relative: number;
    similarity: number;
}


export function getSimilarity(x: string, y: string): number {
    const result: LevenshteinResponse = levenshtien(x, y);
    return result.similarity;
}

export function getSimilarString(s: string, dictionary: string[]): string | undefined {
    const results = dictionary.map((word) => {
        const result: LevenshteinResponse = levenshtien(word, s);
        const similarity = result.similarity;
        return { word, similarity };
    });

    const minSimilarity = 0.75;
    let maxSimilarity = 0;
    let bestFit = undefined;
    for (const {word, similarity} of results) {
        if (similarity > maxSimilarity && similarity >= minSimilarity) {
            bestFit = word;
            maxSimilarity = similarity;
        }
    }
    return bestFit;
}

