/**
 * Crosshair Management for cfxjs
 */

let isCrosshairVisible = false;

/**
 * Toggles the NUI crosshair display
 * @param visible - Boolean to show or hide
 */
const toggleCrosshair = (visible: boolean): void => {
    isCrosshairVisible = visible;
    SendNUIMessage({
        type: 'toggleCrosshair',
        display: visible
    });
};

setTick(() => {
    const playerPed = PlayerPedId();
    const isAiming = IsControlPressed(0, 25);
    const isPaused = IsPauseMenuActive();
    const isFreecam = IsPlayerFreeAiming(PlayerId());

    const shouldShow = isAiming && !isPaused;

    if (shouldShow !== isCrosshairVisible) {
        toggleCrosshair(shouldShow);
    }

    if (shouldShow) {
        HideHudComponentThisFrame(14);
    }
});

on('onResourceStop', (resourceName: string) => {
    if (GetCurrentResourceName() !== resourceName) return;
    toggleCrosshair(false);
});
