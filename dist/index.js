"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const typetalkBaseURL = 'https://typetalk.com/';
/**
 * Typetalk API doc: https://developer.nulab-inc.com/docs/typetalk/api/1/post-message/
 */
const postMessageEndpintURI = '/api/v1/topics/';
/**
 * Send report to Typetalk.
 *
 * @param options
 */
function typetalk(options) {
    const uri = buildEndpointURI();
    const msg = createMessage(dangerResults);
    postMessage(uri, msg);
}
exports.default = typetalk;
/**
 * Build endpoint URL for postMessage.
 */
function buildEndpointURI() {
    const topicID = process.env.TOPIC_ID;
    if (topicID === undefined || topicID === '') {
        throw Error(`'topic id' missing - must supply Typetalk topic id`);
    }
    return postMessageEndpintURI + topicID;
}
exports.buildEndpointURI = buildEndpointURI;
/**
 * Create message from danger results.
 *
 * @param r danger result
 */
function createMessage(r) {
    const fails = r.fails;
    const warnings = r.warnings;
    const messages = r.messages;
    if (fails.length === 0 && warnings.length === 0 && messages.length === 0) {
        return ':white_check_mark: There is nothing to report...';
    }
    let message = '';
    if (fails.length > 0) {
        message += ":rage: Failure\n" + fails.map(f => `• ${f.message} at ${f.file} line ${f.line}`).join("\n");
    }
    if (warnings.length > 0) {
        message += ":angry: Warning\n" + warnings.map(w => `• ${w.message} at ${w.file} line ${w.line}`).join("\n");
    }
    if (messages.length > 0) {
        message += ":open_mouth: Message\n" + messages.map(m => `• ${m.message} at ${m.file} line ${m.line}`).join("\n");
    }
    return message;
}
exports.createMessage = createMessage;
/**
 * Post message to Typetalk
 *
 * @param maybeURL post message endpoint URL
 * @param message message to post
 */
function postMessage(maybeURL, message) {
    if (maybeURL === undefined || maybeURL === '') {
        throw Error(`'url' missing - must supply valid URL`);
    }
    const validURL = new URL(maybeURL).toString();
    if (message === undefined || message === '') {
        throw Error(`'message' missing - must supply message to post`);
    }
    const token = process.env.TYPETALK_TOKEN;
    if (token === undefined || token === '') {
        throw Error(`'token' missing - must supply Typetalk topic id`);
    }
    let a = axios_1.default.create({
        baseURL: typetalkBaseURL,
        headers: {
            'Content-Type': 'application/json',
            'X-Typetalk-Token': token,
        },
        responseType: 'json',
        maxRedirects: 0,
        proxy: false,
    });
    let p = {
        message: message
    };
    a.post(validURL, p)
        .then(function (response) {
        // Do something
    })
        .catch(function (error) {
        // Do something
    });
}
exports.postMessage = postMessage;
