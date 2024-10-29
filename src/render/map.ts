import GameMap, { GameTileData, GameTileType } from "@/core/game-map";
import { Creature } from "@/creatures/creatures";

// Set hexagon dimensions
const HEX_RADIUS = 30; // Radius of each hexagon in pixels
const HEX_HEIGHT = Math.sqrt(3) * HEX_RADIUS; // Height of a flat-topped hexagon
const HEX_WIDTH = 2 * HEX_RADIUS * 0.75; // Width accounting for spacing in flat-topped hexagon

// Function to convert hex axial coordinates to pixel coordinates, with an offset for centering
function hexToPixel(q: number, r: number, offsetX: number, offsetY: number) {
    const x = HEX_RADIUS * 3 / 2 * q + offsetX;
    const y = HEX_RADIUS * Math.sqrt(3) * (r + q / 2) + offsetY;
    return { x, y };
}
// Function to draw a single hexagon at a specific pixel position
function drawHexagon(ctx: CanvasRenderingContext2D, x: number, y: number, tile: GameTileData) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const vertexX = x + HEX_RADIUS * Math.cos(angle);
        const vertexY = y + HEX_RADIUS * Math.sin(angle);
        if (i === 0) {
            ctx.moveTo(vertexX, vertexY);
        } else {
            ctx.lineTo(vertexX, vertexY);
        }
    }
    ctx.closePath();

    // Fill the hexagon based on the tile type
    switch (tile.type) {
        case GameTileType.jungle:
            ctx.fillStyle = "#228B22"; // Green for jungle
            break;
        case GameTileType.revealedJungle:
            ctx.fillStyle = "#32CD32"; // Lighter green for revealed jungle
            break;
        case GameTileType.land:
        default:
            ctx.fillStyle = "#D2B48C"; // Tan for land
            break;
    }
    ctx.fill();

    // Stroke for hexagon borders
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    ctx.stroke();
}

// Function to draw the creature initials inside the hexagon
function drawCreature(ctx: CanvasRenderingContext2D, x: number, y: number, creatures: Set<Creature>) {
    const creatureText = Array.from(creatures)
        .map((creature) => creature.name[0])
        .join(", ");
    if (creatureText) {
        ctx.fillStyle = "#000"; // Black text for creatures
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(creatureText, x, y);
    }
}

// Main function to render the hex map centered on the canvas
export function renderGameMapOnCanvas(canvas: HTMLCanvasElement, gameMap: GameMap) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(-1, -1, canvas.width + 1, canvas.height + 1);

    // Calculate offset to center the map
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Calculate map dimensions based on radius and adjust offset to center the map
    const mapRadius = gameMap.radius;
    const mapWidth = (mapRadius * 2 + 1) * HEX_WIDTH;
    const mapHeight = (mapRadius * 2 + 1) * HEX_HEIGHT * 0.5;
    const offsetX = centerX - mapWidth / 2;
    const offsetY = centerY - mapHeight / 2;

    gameMap.forEach((tile) => {
        const { q, r } = tile;
        const { x, y } = hexToPixel(q, r, offsetX, offsetY);

        // Draw hexagon for the tile
        drawHexagon(ctx, x, y, tile.data!);

        // Draw coordinates for debugging
        ctx.fillStyle = "#000"; // Black text for coordinates
        ctx.font = "8px Arial";
        ctx.textAlign = "left";
        ctx.fillText(`${q}, ${r}`, x - (HEX_WIDTH / 2) + 9, y - (HEX_HEIGHT / 2) + 9);


        // Draw creatures in the tile, if any
        drawCreature(ctx, x, y, tile.data!.creatures);
    });
}
