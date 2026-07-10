const K = 60;

export function reciprocalRankFusion(denseResults, sparseResults) {

    const scoreMap = new Map();

    // Process Dense Results
    denseResults.forEach((result, index) => {

        const id = result.id;
        const rank = index + 1;

        const rrfScore = 1 / (K + rank);

        if (!scoreMap.has(id)) {
            scoreMap.set(id, {
                point: result,
                score: 0
            });
        }

        scoreMap.get(id).score += rrfScore;
    });

    // Process Sparse Results
    sparseResults.forEach((result, index) => {

        const id = result.id;
        const rank = index + 1;

        const rrfScore = 1 / (K + rank);

        if (!scoreMap.has(id)) {
            scoreMap.set(id, {
                point: result,
                score: 0
            });
        }

        scoreMap.get(id).score += rrfScore;
    });

    // Convert Map to Array
    const fusedResults = Array.from(scoreMap.values());

    // Sort by RRF score
    fusedResults.sort((a, b) => b.score - a.score);

    return fusedResults;
}