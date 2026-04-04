import { CfxAuth } from './markersauth.js';

export class CfxMarker {
    /**
     * @param {string} id
     */
    constructor(id) {
        /** @type {string} */
        this.id = id;
        /** @type {boolean} */
        this.active = true;
        /** @type {boolean} */
        this.isPlayerInside = false;
        /** @type {{x: number, y: number, z: number}} */
        this.pos = { x: 0, y: 0, z: 0 };
        /** @type {{x: number, y: number, z: number}} */
        this.interactPos = { x: 0, y: 0, z: 0 };
        /** @type {number} */
        this.type = 1;
        /** @type {{x: number, y: number, z: number}} */
        this.dir = { x: 0.0, y: 0.0, z: 0.0 };
        /** @type {{x: number, y: number, z: number}} */
        this.rot = { x: 0.0, y: 0.0, z: 0.0 };
        /** @type {{x: number, y: number, z: number}} */
        this.scale = { x: 1.0, y: 1.0, z: 1.0 };
        /** @type {{r: number, g: number, b: number, a: number}} */
        this.rgba = { r: 255, g: 255, b: 255, a: 150 };
        /** @type {boolean} */
        this.bob = false;
        /** @type {boolean} */
        this.faceCamera = false;
        /** @type {boolean} */
        this.rotate = false;
        /** @type {number} */
        this.rotationOrder = 2;
        /** @type {{dict: string | null, name: string | null}} */
        this.texture = { dict: null, name: null };
        /** @type {boolean} */
        this.drawOnEnts = false;
        /** @type {number} */
        this.drawDistance = 15.0;
        /** @type {number} */
        this.interactDistance = 1.5;
        /** @type {number} */
        this.zTolerance = 2.0;
        /** @type {boolean} */
        this.requireKeyPress = true;
        /** @type {number} */
        this.interactKey = 38;
        /** @type {string | null} */
        this.text = null;
        /** @type {number} */
        this.textScale = 0.35;
        /** @type {number} */
        this.textFont = 4;
        /** @type {{r: number, g: number, b: number, a: number}} */
        this.textColor = { r: 255, g: 255, b: 255, a: 255 };
        /** @type {number} */
        this.textOffsetZ = 0.6;
        /** @type {boolean} */
        this.textOutline = true;
        /** @type {boolean} */
        this.textShadow = false;
        /** @type {boolean} */
        this.textCenter = true;
        /** @type {string | null} */
        this.job = null;
        /** @type {number} */
        this.rank = 0;
        /** @type {string | null} */
        this.citizenid = null;
        /** @type {boolean} */
        this.restricted = false;
        /** @type {((pos: {x: number, y: number, z: number}) => void) | null} */
        this.onInteract = null;
        /** @type {((pos: {x: number, y: number, z: number}) => void) | null} */
        this.onEnter = null;
        /** @type {((pos: {x: number, y: number, z: number}) => void) | null} */
        this.onExit = null;
    }

    /**
     * 
     * @param {number} x - X value
     * @param {number} y - Y value
     * @param {number} z - Z value
     * @returns {this}
     */
    setMarkerPos(x, y, z) {
        this.pos = { x, y, z };
        if (this.interactPos.x === 0) this.interactPos = { x, y, z };
        return this;
    }

    setTriggerPos(x, y, z, range = 1.5, key = 38, needsKey = true) {
        this.interactPos = { x, y, z };
        this.interactDistance = range;
        this.interactKey = key;
        this.requireKeyPress = needsKey;
        return this;
    }

    setMarkerVisuals(type, scaleX, scaleY, scaleZ, r, g, b, a) {
        this.type = type;
        this.scale = { x: scaleX, y: scaleY, z: scaleZ };
        this.rgba = { r, g, b, a };
        return this;
    }

    setMarkerAnimation(bob, rotate, faceCamera) {
        this.bob = bob;
        this.rotate = rotate;
        this.faceCamera = faceCamera;
        return this;
    }

    setMarkerTexture(dict, name, drawOnEnts = false) {
        this.texture = { dict, name };
        this.drawOnEnts = drawOnEnts;
        return this;
    }

    setMarkerRotation(x, y, z, order = 2) {
        this.rot = { x, y, z };
        this.rotationOrder = order;
        return this;
    }

    setMarkerDirection(x, y, z) {
        this.dir = { x, y, z };
        return this;
    }

    setRestriction(jobName = null, minRank = 0, cid = null) {
        this.job = jobName;
        this.rank = minRank;
        this.citizenid = cid;
        this.restricted = true;
        return this;
    }

    setText(content, scale, font, r, g, b, a, offsetZ, outline, shadow, center) {
        this.text = content;
        if (scale !== undefined) this.textScale = scale;
        if (font !== undefined) this.textFont = font;
        if (r !== undefined) this.textColor = { r, g, b, a };
        if (offsetZ !== undefined) this.textOffsetZ = offsetZ;
        if (outline !== undefined) this.textOutline = outline;
        if (shadow !== undefined) this.textShadow = shadow;
        if (center !== undefined) this.textCenter = center;
        return this;
    }

    setLogic(drawDist, zTol) {
        this.drawDistance = drawDist;
        this.zTolerance = zTol;
        return this;
    }

    onEnter(cb) {
        this.onEnter = cb;
        return this;
    }

    onExit(cb) {
        this.onExit = cb;
        return this;
    }

    onAction(cb) {
        this.onInteract = cb;
        return this;
    }

    spawn() {
        CfxMarkerSystem.add(this);
        return this;
    }

    draw() {
        DrawMarker(
            this.type, this.pos.x, this.pos.y, this.pos.z,
            this.dir.x, this.dir.y, this.dir.z,
            this.rot.x, this.rot.y, this.rot.z,
            this.scale.x, this.scale.y, this.scale.z,
            this.rgba.r, this.rgba.g, this.rgba.b, this.rgba.a,
            this.bob, this.faceCamera, this.rotationOrder, this.rotate,
            this.texture.dict, this.texture.name, this.drawOnEnts
        );
        if (this.text) this.drawText();
    }

    drawText() {
        const [onScreen, x, y] = GetScreenCoordFromWorldCoord(this.pos.x, this.pos.y, this.pos.z + this.textOffsetZ);
        if (onScreen) {
            SetTextScale(this.textScale, this.textScale);
            SetTextFont(this.textFont);
            SetTextColour(this.textColor.r, this.textColor.g, this.textColor.b, this.textColor.a);
            if (this.textOutline) SetTextOutline();
            if (this.textShadow) SetTextDropShadow();
            SetTextEntry("STRING");
            if (this.textCenter) SetTextCentre(1);
            AddTextComponentString(this.text);
            DrawText(x, y);
        }
    }
}

export const CfxMarkerSystem = {
    markers: new Map(),
    active: false,

    add(m) {
        this.markers.set(m.id, m);
        this.start();
    },

    remove(id) {
        this.markers.delete(id);
    },

    start() {
        if (this.active) return;
        this.active = true;

        setTick(async () => {
            if (this.markers.size === 0) return;
            const p = GetEntityCoords(PlayerPedId());
            let sleep = 1000;

            this.markers.forEach((m) => {
                if (!m.active) return;
                if (!CfxAuth.canAccess(m)) return;

                const dx = p[0] - m.interactPos.x;
                const dy = p[1] - m.interactPos.y;
                const dz = p[2] - m.interactPos.z;
                const d2 = dx*dx + dy*dy + dz*dz;

                if (d2 < (m.drawDistance * m.drawDistance)) {
                    sleep = 0;
                    m.draw();

                    const inside = (d2 < (m.interactDistance * m.interactDistance)) && (Math.abs(dz) < m.zTolerance);

                    if (inside && !m.isPlayerInside) {
                        m.isPlayerInside = true;
                        if (m.onEnter) m.onEnter(m.interactPos);
                        if (!m.requireKeyPress && m.onInteract) m.onInteract(m.interactPos);
                    } else if (!inside && m.isPlayerInside) {
                        m.isPlayerInside = false;
                        if (m.onExit) m.onExit(m.interactPos);
                    }

                    if (m.isPlayerInside && m.requireKeyPress && m.onInteract) {
                        if (IsControlJustReleased(0, m.interactKey)) m.onInteract(m.interactPos);
                    }
                } else {
                    m.isPlayerInside = false;
                }
            });

            if (sleep > 0) await new Promise(r => setTimeout(r, sleep));
        });
    }
};
