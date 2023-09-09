export default function findGreatestClouldCoverage(cloudLayers) {
  if (!cloudLayers.length) return "SKC - Clear skies"

  const cloudCoverageDefinitions = {
    "ovc": "Overcast",
    "bkn": "Broken",
    "sct": "Scattered",
    "few": "Few"
  }

  return cloudCoverageDefinitions[cloudLayers[cloudLayers.length - 1].coverage]
}
