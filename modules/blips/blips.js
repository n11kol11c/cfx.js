/**
 * Creates a highly customizable blip on the map.
 * Supports standard coordinates, radius zones, and entity-attached tracking.
 * * @param {string} id - Unique identifier for the blip (used for updates/removal).
 * @param {object} config - Configuration object for the blip.
 * @param {object} [config.coords] - Vector3 coordinates {x, y, z}.
 * @param {number} [config.entity] - Network ID or Entity Handle to attach the blip to.
 * @param {number} [config.sprite] - The icon ID (e.g., 1 for circle, 357 for garage).
 * @param {number} [config.color] - Blip color ID (e.g., 3 for blue, 1 for red).
 * @param {string} [config.label] - The text label shown on the map.
 * @param {number} [config.scale] - Size of the blip (default 0.8).
 * @param {boolean} [config.route] - If true, draws a GPS path to the blip.
 * @param {number} [config.radius] - If set, creates an area circle instead of an icon.
 * @returns {number} The handle of the created blip.
*/
const Blips = {
    activeBlips: new Map(),

    create(id, config) {
        const { 
            coords, 
            entity = null, 
            sprite = 1, 
            color = 0, 
            label = "Marker", 
            scale = 0.8,
            alpha = 255,
            display = 4,
            shortRange = true,
            flashing = false,
            route = false,
            radius = null,
            secondaryColor = null,
            priority = 0,
            category = 1,
            bright = false
        } = config;

        let blip;

        if (entity && DoesEntityExist(entity)) {
            blip = AddBlipForEntity(entity);
        } else if (radius) {
            blip = AddBlipForRadius(coords.x, coords.y, coords.z, radius);
            SetBlipAlpha(blip, 128);
        } else {
            blip = AddBlipForCoord(coords.x, coords.y, coords.z);
        }

        SetBlipSprite(blip, sprite);
        SetBlipDisplay(blip, display);
        SetBlipScale(blip, scale);
        SetBlipColour(blip, color);
        SetBlipAlpha(blip, alpha);
        SetBlipAsShortRange(blip, shortRange);
        
        SetBlipPriority(blip, priority);
        SetBlipCategory(blip, category);
        if (bright) SetBlipBright(blip, true);

        if (route) {
            SetBlipRoute(blip, true);
            if (secondaryColor) SetBlipRouteColour(blip, secondaryColor);
        }

        if (flashing) {
            SetBlipFlashes(blip, true);
            SetBlipFlashInterval(blip, 500);
        }

        BeginTextCommandSetBlipName("STRING");
        AddTextComponentString(label);
        EndTextCommandSetBlipName(blip);

        this.activeBlips.set(id, blip);
        return blip;
    },

    updateCoords(id, newCoords) {
        const blip = this.activeBlips.get(id);
        if (blip) SetBlipCoords(blip, newCoords.x, newCoords.y, newCoords.z);
    },

    setDisplay(id, displayType) {
        const blip = this.activeBlips.get(id);
        if (blip) SetBlipDisplay(blip, displayType); 
    },

    setRotation(id, rotation) {
        const blip = this.activeBlips.get(id);
        if (blip) SetBlipRotation(blip, Math.ceil(rotation));
    },

    exists(id) {
        return this.activeBlips.has(id) && DoesBlipExist(this.activeBlips.get(id));
    },

    removeByPrefix(prefix) {
        for (const [id, blip] of this.activeBlips.entries()) {
            if (id.startsWith(prefix)) {
                if (DoesBlipExist(blip)) RemoveBlip(blip);
                this.activeBlips.delete(id);
            }
        }
    },

    remove(id) {
        if (this.activeBlips.has(id)) {
            const blip = this.activeBlips.get(id);
            if (DoesBlipExist(blip)) RemoveBlip(blip);
            this.activeBlips.delete(id);
        }
    },

    removeAll() {
        this.activeBlips.forEach(blip => {
            if (DoesBlipExist(blip)) RemoveBlip(blip);
        });
        this.activeBlips.clear();
    }
};
