import { Cfxjs } from './Cfxjs.js';

/**
 * @param {string} name - Command name (e.g., 'createmarker')
 * @param {string} description - What the command does (for chat suggestions)
 * @param {Array} params - [{ name: 'param1', help: 'description' }]
 * @param {string|boolean} restricted - 'admin', 'god', or false (for everyone)
 * @param {Function} callback - The code to run: (source, args, raw) => {}
 */
export const CfxRegisterCommand = (name, description, params, restricted, callback) => {
    RegisterCommand(name, (source, args, raw) => {
        if (source === 0) {
            callback(source, args, raw);
            return;
        }

        const PlayerData = exports['qbx_core'].GetPlayerData();
        if (!PlayerData) return;

        if (restricted) {
            const hasPerm = exports['qbx_core'].HasPermission(source, restricted);
            if (!hasPerm) {
                console.log(`^1[Auth]^7 Player ${source} tried to use /${name} without permission.`);
                return;
            }
        }

        callback(source, args, raw);
    }, false);

    emit('chat:addSuggestion', `/${name}`, description, params);
};
