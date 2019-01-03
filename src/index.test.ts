import { DangerResults } from "../node_modules/danger/distribution/dsl/DangerResults";
import { createMessage } from "./";

describe("postMessage()", () => {

    it("should throw error when url is blank", () => {
        expect(() => {
            postMessage("", "message");
        }).toThrow();
    });

    it("should throw error when url is not valid", () => {
        expect(() => {
            postMessage("abcde", "message");
        }).toThrow();
    });

    it("should throw error when message is blank", () => {
        expect(() => {
            postMessage("http://example.com", "");
        }).toThrow();
    });
});

describe("createMessage()", () => {

    const emptyResults: DangerResults = {
        fails: [],
        markdowns: [],
        messages: [],
        warnings: [],
    };

    it("should handle empty result", () => {
        const message = createMessage(emptyResults);
        expect(message).toBe(":white_check_mark: There is nothing to report...");
    });

    const failResults: DangerResults = {
        fails: [ { message: "Failure!!!", file: "index.ts", line: 54321 } ],
        markdowns: [],
        messages: [],
        warnings: [],
    };

    it("should handle failure result", () => {
        const message = createMessage(failResults);
        expect(message).toBe(":rage: Failure\n• Failure!!! at index.ts line 54321");
    });

    const warnResults: DangerResults = {
        fails: [],
        markdowns: [],
        messages: [],
        warnings: [ { message: "Warning!!!", file: "index.ts", line: 54321 } ],
    };

    it("should handle warning result", () => {
        const message = createMessage(warnResults);
        expect(message).toBe(`:angry: Warning\n• Warning!!! at index.ts line 54321`);
    });

    const messageResults: DangerResults = {
        fails: [],
        markdowns: [],
        messages: [ { message: "Hello World!!!", file: "index.ts", line: 54321 } ],
        warnings: [],
    };

    it("should handle message result", () => {
        const message = createMessage(messageResults);
        expect(message).toBe(":open_mouth: Message\n• Hello World!!! at index.ts line 54321");
    });
});
