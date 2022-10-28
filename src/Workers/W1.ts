const ctx = self;

ctx.onmessage = (e) => {
    console.log(e.data);
    ctx.postMessage("Polo!");
};
