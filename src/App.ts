import * as protobuf from "protobufjs";
import protoFile from "url:./a.proto";
import { AnimatorView } from "./View";

class App {
    view: AnimatorView;
    constructor() {
        this.view = new AnimatorView();
    }
    start() {
        this.view.render();
    }

    static jsObject2Buffer(protoType: protobuf.Type, payload: any) {
        // Verify the payload if necessary (i.e. when possibly incomplete or invalid)
        var errMsg = protoType.verify(payload);
        if (errMsg) throw Error(errMsg);
        // Create a new message
        var message = protoType.create(payload); // or use .fromObject if conversion is necessary
        // Encode a message to an Uint8Array (browser) or Buffer (node)
        return protoType.encode(message).finish();
    }

    static buffer2jsObject(protoType: protobuf.Type, buffer: Uint8Array) {
        // Decode an Uint8Array (browser) or Buffer (node) to a message
        var message = protoType.decode(buffer);
        // ... do something with message
        // Maybe convert the message back to a plain object
        return protoType.toObject(message, {
            longs: String,
            enums: String,
            bytes: String,
            // see ConversionOptions
        });
    }

    async loadData() {
        var response = await fetch(protoFile);
        var content = await response.text();
        var parseResult = await protobuf.parse(content);
        var root = parseResult.root;
        var meshArrayType = root.lookupType("MayaLiveProto.VertexChannel");
        try {
            // Exemplary payload
            var payload = {
                key: "",
                elementCount: 0, // Should be 2(UV), 3(RGB) or 4(RGBA)
                values: [],
            };
            var decodedMessage = App.jsObject2Buffer(meshArrayType, payload);
            var backObj = App.buffer2jsObject(meshArrayType, decodedMessage);
            console.log(backObj);
        } catch (e) {
            if (e instanceof protobuf.util.ProtocolError) {
                // e.instance holds the so far decoded message with missing required fields
            } else {
                // wire format is invalid
            }
        }
    }
}

declare global {
    var app: App;
}
globalThis.app = new App();
globalThis.app.start();
export default app;
