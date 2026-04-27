import { Container } from "pixi.js";
import { createSymbol } from "./symbols";
import type { GameSymbol } from "../../../shared/types";
import type { Texture, Sprite } from "pixi.js"

type Textures = {
    star: Texture
    cherry: Texture
    question: Texture
}

export function createReels(textures: Textures) {
   const container = new Container()

   let currentSymbols: Sprite[] = []

   function setResult(result: GameSymbol[]) {
    currentSymbols.forEach(s => container.removeChild(s))
    currentSymbols = []

    result.forEach((symbolType, index) => {
        const symbol = createSymbol(symbolType, textures)

        symbol.x = 150 + index * 200
        symbol.y = 180
        symbol.height = 200
        symbol.width = 200

        container.addChild(symbol)
        currentSymbols.push(symbol)
    })
   }

   return{
    container,
    setResult
   }
}