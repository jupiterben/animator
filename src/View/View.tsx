import { createRoot } from "react-dom/client";
import React, { useRef, useState } from "react";

function MainFrame() {
    return <div></div>;
}

export class AnimatorView {
    constructor() {}
    render() {
        const container = document.getElementById("root");
        const root = createRoot(container!);
        root.render(<MainFrame></MainFrame>);
    }
}
