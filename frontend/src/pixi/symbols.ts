import { Sprite, Texture } from "pixi.js"
import type { GameSymbol } from "../../shared/types"

type Textures = {
  star: Texture
  cherry: Texture
  question: Texture
}

export function createSymbol(type: GameSymbol, textures: Textures): Sprite {
  let texture: Texture

  if (type === "S") texture = textures.star
  else if (type === "C") texture = textures.cherry
  else texture = textures.question

  const sprite = new Sprite(texture);

  sprite.anchor.set(0.5)

  return sprite
}