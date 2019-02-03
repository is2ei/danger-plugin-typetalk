import axios from "axios";
import { DangerResults } from "../node_modules/danger/distribution/dsl/DangerResults";
declare var results: DangerResults;

interface PostMessageRequestParam {
    message: string;
}

/**
 * Options to run typetalk()
 */
export interface Options {
    url: string;
}

const typetalkBaseURL: string = "https://typetalk.com/";

/**
 * Typetalk API doc: https://developer.nulab-inc.com/docs/typetalk/api/1/post-message/
 */
const postMessageEndpintURI: string = "/api/v1/topics/";

/**
 * Send report to Typetalk.
 *
 * @param options
 */
export default function typetalk(options: Options) {
    const uri: string = buildEndpointURI();
    const msg: string = createMessage(results);
    postMessage(uri, msg);
}

/**
 * Build endpoint URL for postMessage.
 */
export function buildEndpointURI(): string {
    const topicID = process.env.TYPETALK_TOPIC_ID;

    if (topicID === undefined || topicID === "") {
        throw Error(`'topic id' missing - must supply $TYPETALK_TOPIC_ID`);
    }

    return postMessageEndpintURI + topicID;
}

/**
 * Create message from danger results.
 *
 * @param r danger result
 */
export function createMessage(r: DangerResults): string {

    const fails    = r.fails;
    const warnings = r.warnings;
    const messages = r.messages;

    if (fails.length === 0 && warnings.length === 0  && messages.length === 0) {
        return ":white_check_mark: There is nothing to report...";
    }

    let message: string = "";

    if (fails.length > 0) {
        message += ":rage: Failure\n" + fails.map((f) => `• ${f.message} at ${f.file} line ${f.line}`).join("\n");
    }
    if (warnings.length > 0) {
        message += ":angry: Warning\n" + warnings.map((w) => `• ${w.message} at ${w.file} line ${w.line}`).join("\n");
    }
    if (messages.length > 0) {
        message += ":open_mouth: Message\n" ;
        message += messages.map((m) => `• ${m.message}`).join("\n");
    }

    return message;
}

/**
 * Post message to Typetalk
 *
 * @param maybeURL post message endpoint URL
 * @param message message to post
 */
export function postMessage(url: string, message: string): void {

    if (url === undefined || url === "") {
        throw Error(`'url' missing - must supply valid URL`);
    }

    if (message === undefined || message === "") {
        throw Error(`'message' missing - must supply message to post`);
    }

    const token = process.env.TYPETALK_TOKEN;
    if (token === undefined || token === "") {
        throw Error(`'token' missing - must supply $TYPETALK_TOKEN`);
    }

    const a = axios.create({
        baseURL: typetalkBaseURL,
        headers: {
            "Content-Type": "application/json",
            "X-Typetalk-Token": token,
        },
        maxRedirects: 0,
        proxy: false,
        responseType: "json",
    });

    const p: PostMessageRequestParam = {message};

    a.post(url, p)
    .then((response) => {
        // Do something
    })
    .catch((error) => {
        // Do something
    });
}
