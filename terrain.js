const worldWidth = 10;
const worldHeight = 10;
const octaveCount = 4;
const persistence = 0.5;
const terrainTypes = [
  { type: "water", color: "blue", threshold: 0.4 },
  { type: "grass", color: "green", threshold: 0.6 },
  { type: "mountain", color: "gray", threshold: 1 },
];

function generateTerrain(width, height, octaveCount, persistence) {
  const world = [];
  for (let y = 0; y < height; y++) {
    const row = [];

    for (let x = 0; x < width; x++) {
      const noiseValue = perlinNoise(
        x / width,
        y / height,
        octaveCount,
        persistence
      );
      const terrainType = getTerrainType(noiseValue);
      row.push(terrainType);
    }

    world.push(row);
  }

  return world;
}

function perlinNoise(x, y, octaveCount, persistence) {
  let total = 0;
  let frequency = 1;
  let amplitude = 1;
  let maxValue = 0;

  for (let i = 0; i < octaveCount; i++) {
    total += noise(x * frequency, y * frequency) * amplitude;
    maxValue += amplitude;
    amplitude *= persistence;
    frequency *= 2;
  }

  return total / maxValue;
}

function noise(x, y) {
  const n = x + y * 57;
  return (Math.sin(n) * 43758.5453123) % 1;
}

function getTerrainType(value) {
  for (let terrain of terrainTypes) {
    if (value < terrain.threshold) {
      return terrain;
    }
  }
}

function displayTerrain(world) {
  const terrainElement = document.getElementById("terrain");
  terrainElement.innerHTML = "";

  for (let row of world) {
    for (let cell of row) {
      const cellElement = document.createElement("div");
      cellElement.className = "cell";
      cellElement.style.backgroundColor = cell.color;
      terrainElement.appendChild(cellElement);
    }

    terrainElement.appendChild(document.createElement("br"));
  }
}

const world = generateTerrain(
  worldWidth,
  worldHeight,
  octaveCount,
  persistence
);
displayTerrain(world);

document.getElementById("generate").addEventListener("click", () => {
  const newWorld = generateTerrain(
    worldWidth,
    worldHeight,
    octaveCount,
    persistence
  );
  displayTerrain(newWorld);
});
