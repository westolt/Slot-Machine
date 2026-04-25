import { Application } from 'pixi.js';
import { createSymbol } from "./symbols"

let app: Application | null = null;

export async function initSlotMachine(container: HTMLElement) {
    if (app) return

    app = new Application()
    await app.init({
        background: "#262b36",
        resizeTo: container
    })

    container.appendChild(app.canvas)

    const s1 = createSymbol("A")
    const s2 = createSymbol("B")
    const s3 = createSymbol("C")

    s1.x = 100
    s2.x = 300
    s3.x = 500

    s1.y = s2.y = s3.y = 200

    app.stage.addChild(s1, s2, s3)
}