import axios from'axios' 
import { DangerResults } from "../node_modules/danger/distribution/dsl/DangerResults"

interface PostMessageRequestParam {
    message: string
}

/**
 * Options to run typetalk()
 */
export interface TypetalkOptions {
    url: string
}

/**
 * Typetalk API doc: https://developer.nulab-inc.com/docs/typetalk/api/1/post-message/
 */
const postMessageEndpintURL: string = 'https://typetalk.com/api/v1/topics/'

declare var dangerResults: DangerResults

/**
 * Send report to Typetalk.
 * 
 * @param options 
 */
export default function typetalk(options: TypetalkOptions) {
    const url: string = buildEndpointURL()
    const msg: string = createMessage(dangerResults)
    postMessage(url, msg)
}

/**
 * Post message to Typetalk
 * 
 * @param maybeURL post message endpoint URL
 * @param message message to post
 */
export function postMessage(maybeURL: string, message: string): void {

    if (maybeURL === undefined || maybeURL === '') {
        throw Error(`'url' missing - must supply valid URL`)
    }

    const validURL = new URL(maybeURL).toString()

    if (message === undefined || message === '') {
        throw Error(`'message' missing - must supply message to post`)
    }

    let p: PostMessageRequestParam = {
        message: message
    }

    let a = axios.create({})
    a.post(validURL, p)
    .then(function (response) {

    })
    .catch(function (error) {

    })
}

/**
 * Build endpoint URL for postMessage.
 */
export function buildEndpointURL(): string {
    const topicID = process.env.TOPIC_ID

    if (topicID === undefined || topicID === '') {
        throw Error(`'topic id' missing - must supply Typetalk topic id`)
    }

    return postMessageEndpintURL + topicID
}

/**
 * Create message from danger results.
 * 
 * @param r danger result
 */
export function createMessage(r: DangerResults): string {

    const fails     = r.fails
    const warnings  = r.warnings
    const messages  = r.messages

    if (fails.length === 0 && warnings.length === 0  && messages.length === 0) {
        return ':white_check_mark: There is nothing to report...'
    }

    let message: string = ''

    if (fails.length > 0) {
        message += ":rage: Failure\n" + fails.map(f => `• ${f.message} at ${f.file} line ${f.line}`).join("\n")
    }
    if (warnings.length > 0) {
        message += ":angry: Warning\n" + warnings.map(w => `• ${w.message} at ${w.file} line ${w.line}`).join("\n")
    }
    if (messages.length > 0) {
        message += ":open_mouth: Message\n" + messages.map(m => `• ${m.message} at ${m.file} line ${m.line}`).join("\n")
    }

    return message
}