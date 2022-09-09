import { createRoot } from "react-dom/client";
import React, { Suspense } from "react";
import TreeCanvas from '~ThreeCavnas';
import BabylonCanvas from '~BabylonCanvas';

export class AnimatorView {
    constructor() { }
    render() {
        const container = document.getElementById("root");
        const root = createRoot(container!);
        root.render(
            <TreeCanvas />
            <BabylonCanvas/>
        );
    }
}
