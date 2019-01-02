import { DangerResults } from "../node_modules/danger/distribution/dsl/DangerResults";
/**
 * Options to run typetalk()
 */
export interface TypetalkOptions {
    url: string;
}
/**
 * Send report to Typetalk.
 *
 * @param options
 */
export default function typetalk(options: TypetalkOptions): void;
/**
 * Build endpoint URL for postMessage.
 */
export declare function buildEndpointURI(): string;
/**
 * Create message from danger results.
 *
 * @param r danger result
 */
export declare function createMessage(r: DangerResults): string;
/**
 * Post message to Typetalk
 *
 * @param maybeURL post message endpoint URL
 * @param message message to post
 */
export declare function postMessage(maybeURL: string, message: string): void;
