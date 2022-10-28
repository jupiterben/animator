
import { AnimatorView } from "./View/View";

class App {
    view: AnimatorView;
    constructor() {
        this.view = new AnimatorView();
    }
    start() {
        this.view.render();
    }
}


declare global {
    var app: App;
}
globalThis.app = new App();
globalThis.app.start();
export default app;
