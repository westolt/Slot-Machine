import { Graphics } from "pixi.js"
import type { GameSymbol } from "../../../shared/types"

export function createSymbol(type: GameSymbol): Graphics {
  const g = new Graphics()

  g.rect(0, 0, 150, 150)

  if (type === "💎") {
    g.fill(0xff0000) // red
  } else if (type === "🍒") {
    g.fill(0x00ff00) // green
  } else {
    g.fill(0x0000ff) // blue
  }

  return g
}