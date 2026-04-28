import { Application, Sprite, Texture } from "pixi.js";
import { createReels } from "./reels"

type Textures = {
    star: Texture
    cherry: Texture
    question: Texture
    background: Texture
    border: Texture
}

export default function initScene(app: Application, textures: Textures) {

    const bg = new Sprite(textures.background)
    bg.width = 720
    bg.height = 350
    app.stage.addChild(bg)

    const reels = createReels(app, textures)
    app.stage.addChild(reels.container)

    reels.setResult(["S", "C", "Q"])

    const border = new Sprite(textures.border)
    border.width = 720
    border.height = 350
    app.stage.addChild(border)

    return reels
}