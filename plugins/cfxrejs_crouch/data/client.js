/**
 * Local state to track the player's crouch status.
 */
let isCrouched = false;

/**
 * Main execution tick for handling the crouch mechanic.
 * Synchronizes movement clipsets and handles input suppression.
 */
setTick(async () => {
    const playerPed = PlayerPedId();

    /**
     * Safety check: Disable crouch state if the player enters a vehicle,
     * is incapacitated, or dies. Ensures state consistency.
     */
    if (IsPedInAnyVehicle(playerPed, false) || IsPedDeadOrDying(playerPed, true)) {
        if (isCrouched) {
            isCrouched = false;
            ResetPedMovementClipset(playerPed, 0.25);
        }
        return;
    }

    /**
     * Suppress the default 'Stealth Mode' action on the Duck control (INPUT_DUCK).
     * This allows us to override the behavior with our custom logic.
     */
    DisableControlAction(0, 36, true);

    if (IsDisabledControlJustPressed(0, 36)) {
        isCrouched = !isCrouched;

        if (isCrouched) {
            /**
             * Request and stream the required animation set.
             * Standard Cfx.re procedure to ensure assets are loaded in memory before application.
             */
            RequestAnimSet("move_ped_crouched");
            while (!HasAnimSetLoaded("move_ped_crouched")) {
                await new Promise(resolve => setTimeout(resolve, 0));
            }
            
            SetPedMovementClipset(playerPed, "move_ped_crouched", 0.45);
        } else {
            ResetPedMovementClipset(playerPed, 0.45);
        }
    }
});
