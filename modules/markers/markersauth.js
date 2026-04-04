/**
 * @file markersauth.js
 * @description Authorization logic for the CfxMarker system using Qbox Core.
 * @version 1.0.0
 * @author Matija (cfxjs)
 */

/**
 * Global authorization utility for validating player access.
 * Integrates directly with qbx_core to check Job, Grade, and CitizenID.
 * @type {import('./markers').CfxAuth}
 */
export const CfxAuth = {
    /**
     * Determines if the local player meets the marker's access requirements.
     * @param {import('./markers').MarkerRestriction} marker - The marker to validate.
     * @returns {boolean}
     */
    canAccess(marker) {
        if (!marker.restricted) {
            return true;
        }

        const PlayerData = exports['qbx_core'].GetPlayerData();
        
        if (!PlayerData) {
            return false;
        }

        if (marker.job && PlayerData.job.name !== marker.job) {
            return false;
        }

        if (marker.rank > 0 && PlayerData.job.grade.level < marker.rank) {
            return false;
        }

        if (marker.citizenid && PlayerData.citizenid !== marker.citizenid) {
            return false;
        }

        return true;
    }
};
