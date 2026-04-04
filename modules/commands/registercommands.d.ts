/**
 * @file registercommand.d.ts
 * @description TypeScript definitions for the cfxjs command wrappers.
 */

export interface CommandParam {
    name: string;
    help: string;
}

/**
 * Job-based restriction object.
 * @property job - The internal name of the job (e.g., 'ambulance').
 * @property grade - Optional minimum job grade required.
 */
export interface JobRestriction {
    job: string;
    grade?: number;
}

/**
 * The callback signature for all cfxjs commands.
 * @param source - Player ID (0 for console).
 * @param args - Array of command arguments.
 * @param raw - The entire raw command string.
 * @param xPlayer - Optional ESX player object (if using ESX wrapper).
 */
export type CommandCallback = (
    source: number, 
    args: string[], 
    raw: string,
    xPlayer?: any 
) => void;

/**
 * Qbox Command Wrapper
 */
export function CfxRegisterQboxCommand(
    name: string,
    description: string,
    params: CommandParam[],
    restricted: string | boolean,
    callback: CommandCallback
): void;

/**
 * ESX Command Wrapper
 */
export function CfxRegisterESXCommand(
    name: string,
    description: string,
    params: CommandParam[],
    restricted: string | JobRestriction | boolean,
    callback: CommandCallback
): void;
