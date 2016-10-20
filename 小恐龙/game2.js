var gamecount = 0;
var cscr = 0;
var sessid = 0;
var isWebkit = 'WebkitAppearance' in document.documentElement.style;
// if (isWebkit) {
//     (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', 'UA-10106478-4', 'auto');ga('send', 'pageview');
// }
function genP() {
    for (var r = 8,
    a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    t = "",
    n = 0,
    o = a.length; r > n; ++n) t += a.charAt(Math.floor(Math.random() * o));
    return t
};
function setBase64Str(e) {
    base64Str = e,
    base64Count = 0
}
function readBase64() {
    if (!base64Str) return END_OF_INPUT;
    if (base64Count >= base64Str.length) return END_OF_INPUT;
    var e = 255 & base64Str.charCodeAt(base64Count);
    return base64Count++,
    e
}
function encodeBase64(e) {
    setBase64Str(e);
    var z = Math.floor((Math.random() * 30) + 1);
    var y = 32 - z;
    var x = genP();
    for (var a = "",
    r = new Array(3), s = 0, t = !1; ! t && (r[0] = readBase64()) != END_OF_INPUT;) r[1] = readBase64(),
    r[2] = readBase64(),
    a += base64Chars[r[0] >> 2],
    r[1] != END_OF_INPUT ? (a += base64Chars[r[0] << 4 & 48 | r[1] >> 4], r[2] != END_OF_INPUT ? (a += base64Chars[r[1] << 2 & 60 | r[2] >> 6], a += base64Chars[63 & r[2]]) : (a += base64Chars[r[1] << 2 & 60], a += "=", t = !0)) : (a += base64Chars[r[0] << 4 & 48], a += "=", a += "=", t = !0),
    s += 4,
    s >= 76 && (a += "\n", s = 0);
    a += base64Chars[y];
    a += base64Chars[z] + z + x;
    return a = "PMrrE" + a
}
for (var END_OF_INPUT = -1,
base64Chars = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/"), reverseBase64Chars = new Array, i = 0; i < base64Chars.length; i++) reverseBase64Chars[base64Chars[i]] = i;
var base64Str, base64Count;

function hideClass(a) {
    var b = document.querySelectorAll("." + a),
    c = 0,
    d = b.length;
    for (c; c < d; c++) b[c].style.display = "none"
}
function softHideClass(a) {
    var b = document.querySelectorAll("." + a),
    c = 0,
    d = b.length;
    for (c; c < d; c++) b[c].style.visibility = "hidden"
}
function showClass(a) {
    var b = document.querySelectorAll("." + a),
    c = 0,
    d = b.length;
    for (c; c < d; c++) b[c].style.display = "",
    b[c].style.visibility = "visible"
} !
function() {
    "use strict";
    function a(b, d) {
        return a.instance_ ? a.instance_: (a.instance_ = this, this.outerContainerEl = document.querySelector(b), this.containerEl = null, this.snackbarEl = null, this.detailsButton = this.outerContainerEl.querySelector("#details-button"), this.config = d || a.config, this.dimensions = a.defaultDimensions, this.canvas = null, this.canvasCtx = null, this.tRex = null, this.distanceMeter = null, this.distanceRan = 0, this.highestScore = 0, this.time = 0, this.runningTime = 0, this.msPerFrame = 1e3 / c, this.currentSpeed = this.config.SPEED, this.obstacles = [], this.started = !1, this.activated = !1, this.crashed = !1, this.paused = !1, this.inverted = !1, this.invertTimer = 0, this.resizeTimerId_ = null, this.playCount = 0, this.audioBuffer = null, this.soundFx = {},
        this.audioContext = null, this.images = {},
        this.imagesLoaded = 0, void this.loadImages())
    }
    function h(a, b) {
        return Math.floor(Math.random() * (b - a + 1)) + a
    }
    function i(a) {
        f && window.navigator.vibrate && window.navigator.vibrate(a)
    }
    function j(b, c, d, e) {
        var f = document.createElement("canvas");
        return f.className = e ? a.classes.CANVAS + " " + e: a.classes.CANVAS,
        f.width = c,
        f.height = d,
        b.appendChild(f),
        f
    }
    function k(a) {
        for (var b = a.length / 4 * 3,
        c = atob(a), d = new ArrayBuffer(b), e = new Uint8Array(d), f = 0; f < b; f++) e[f] = c.charCodeAt(f);
        return e.buffer
    }
    function l() {
        return e ? (new Date).getTime() : performance.now()
    }
    function m(a, b, c, d) {
        this.canvas = a,
        this.canvasCtx = a.getContext("2d"),
        this.canvasDimensions = d,
        this.textImgPos = b,
        this.restartImgPos = c,
        this.draw()
    }
    function n(b, c, d) {
        var f = (a.defaultDimensions.WIDTH + b.xPos, new r(c.xPos + 1, c.yPos + 1, c.config.WIDTH - 2, c.config.HEIGHT - 2)),
        g = new r(b.xPos + 1, b.yPos + 1, b.typeConfig.width * b.size - 2, b.typeConfig.height - 2);
        if (d && p(d, f, g), q(f, g)) for (var h = b.collisionBoxes,
        i = c.ducking ? t.collisionBoxes.DUCKING: t.collisionBoxes.RUNNING, j = 0; j < i.length; j++) for (var k = 0; k < h.length; k++) {
            var l = o(i[j], f),
            m = o(h[k], g),
            n = q(l, m);
            if (d && p(d, l, m), n) return [l, m]
        }
        return ! 1
    }
    function o(a, b) {
        return new r(a.x + b.x, a.y + b.y, a.width, a.height)
    }
    function p(a, b, c) {
        a.save(),
        a.strokeStyle = "#f00",
        a.strokeRect(b.x, b.y, b.width, b.height),
        a.strokeStyle = "#0f0",
        a.strokeRect(c.x, c.y, c.width, c.height),
        a.restore()
    }
    function q(a, b) {
        var c = !1,
        f = (a.x, a.y, b.x);
        b.y;
        return a.x < f + b.width && a.x + a.width > f && a.y < b.y + b.height && a.height + a.y > b.y && (c = !0),
        c
    }
    function r(a, b, c, d) {
        this.x = a,
        this.y = b,
        this.width = c,
        this.height = d
    }
    function s(a, b, c, d, e, f, g) {
        this.canvasCtx = a,
        this.spritePos = c,
        this.typeConfig = b,
        this.gapCoefficient = e,
        this.size = h(1, s.MAX_OBSTACLE_LENGTH),
        this.dimensions = d,
        this.remove = !1,
        this.xPos = d.WIDTH + (g || 0),
        this.yPos = 0,
        this.width = 0,
        this.collisionBoxes = [],
        this.gap = 0,
        this.speedOffset = 0,
        this.currentFrame = 0,
        this.timer = 0,
        this.init(f)
    }
    function t(a, b) {
        this.canvas = a,
        this.canvasCtx = a.getContext("2d"),
        this.spritePos = b,
        this.xPos = 0,
        this.yPos = 0,
        this.groundYPos = 0,
        this.currentFrame = 0,
        this.currentAnimFrames = [],
        this.blinkDelay = 0,
        this.animStartTime = 0,
        this.timer = 0,
        this.msPerFrame = 1e3 / c,
        this.config = t.config,
        this.status = t.status.WAITING,
        this.jumping = !1,
        this.ducking = !1,
        this.jumpVelocity = 0,
        this.reachedMinHeight = !1,
        this.speedDrop = !1,
        this.jumpCount = 0,
        this.jumpspotX = 0,
        this.init()
    }
    function u(b, c, d) {
        this.canvas = b,
        this.canvasCtx = b.getContext("2d"),
        this.image = a.imageSprite,
        this.spritePos = c,
        this.x = 0,
        this.y = 5,
        this.currentDistance = 0,
        this.maxScore = 0,
        this.highScore = 0,
        this.container = null,
        this.digits = [],
        this.acheivement = !1,
        this.defaultString = "",
        this.flashTimer = 0,
        this.flashIterations = 0,
        this.invertTrigger = !1,
        this.config = u.config,
        this.maxScoreUnits = this.config.MAX_DISTANCE_UNITS,
        this.init(d)
    }
    function v(a, b, c) {
        this.canvas = a,
        this.canvasCtx = this.canvas.getContext("2d"),
        this.spritePos = b,
        this.containerWidth = c,
        this.xPos = c,
        this.yPos = 0,
        this.remove = !1,
        this.cloudGap = h(v.config.MIN_CLOUD_GAP, v.config.MAX_CLOUD_GAP),
        this.init()
    }
    function w(a, b, c) {
        this.spritePos = b,
        this.canvas = a,
        this.canvasCtx = a.getContext("2d"),
        this.xPos = c - 50,
        this.yPos = 30,
        this.currentPhase = 0,
        this.opacity = 0,
        this.containerWidth = c,
        this.stars = [],
        this.drawStars = !1,
        this.placeStars()
    }
    function x(a, b) {
        this.spritePos = b,
        this.canvas = a,
        this.canvasCtx = a.getContext("2d"),
        this.sourceDimensions = {},
        this.dimensions = x.dimensions,
        this.sourceXPos = [this.spritePos.x, this.spritePos.x + this.dimensions.WIDTH],
        this.xPos = [],
        this.yPos = 0,
        this.bumpThreshold = .5,
        this.setSourceDimensions(),
        this.draw()
    }
    function y(a, b, c, d) {
        this.canvas = a,
        this.canvasCtx = this.canvas.getContext("2d"),
        this.config = y.config,
        this.dimensions = c,
        this.gapCoefficient = d,
        this.obstacles = [],
        this.obstacleHistory = [],
        this.horizonOffsets = [0, 0],
        this.cloudFrequency = this.config.CLOUD_FREQUENCY,
        this.spritePos = b,
        this.nightMode = null,
        this.clouds = [],
        this.cloudSpeed = this.config.BG_CLOUD_SPEED,
        this.horizonLine = null,
        this.init()
    }
    window.Runner = a;
    var b = 600,
    c = 60,
    d = window.devicePixelRatio > 1,
    e = window.navigator.userAgent.indexOf("CriOS") > -1 || "UIWebViewForStaticFileContent" == window.navigator.userAgent,
    f = window.navigator.userAgent.indexOf("Mobi") > -1 || e;
    "ontouchstart" in window;
    a.config = {
        ACCELERATION: .001,
        BG_CLOUD_SPEED: .2,
        BOTTOM_PAD: 10,
        CLEAR_TIME: 3e3,
        CLOUD_FREQUENCY: .5,
        GAMEOVER_CLEAR_TIME: 750,
        GAP_COEFFICIENT: .6,
        GRAVITY: .6,
        INITIAL_JUMP_VELOCITY: 12,
        INVERT_FADE_DURATION: 12e3,
        INVERT_DISTANCE: 700,
        MAX_CLOUDS: 6,
        MAX_OBSTACLE_LENGTH: 3,
        MAX_OBSTACLE_DUPLICATION: 2,
        MAX_SPEED: 13,
        MIN_JUMP_HEIGHT: 35,
        MOBILE_SPEED_COEFFICIENT: 1.2,
        RESOURCE_TEMPLATE_ID: "audio-resources",
        SPEED: 6,
        SPEED_DROP_COEFFICIENT: 3
    },
    a.defaultDimensions = {
        WIDTH: b,
        HEIGHT: 150
    },
    a.classes = {
        CANVAS: "runner-canvas",
        CONTAINER: "runner-container",
        CRASHED: "crashed",
        ICON: "icon-offline",
        INVERTED: "inverted",
        SNACKBAR: "snackbar",
        SNACKBAR_SHOW: "snackbar-show",
        TOUCH_CONTROLLER: "controller"
    },
    a.spriteDefinition = {
        LDPI: {
            CACTUS_LARGE: {
                x: 332,
                y: 2
            },
            CACTUS_SMALL: {
                x: 228,
                y: 2
            },
            CLOUD: {
                x: 86,
                y: 2
            },
            HORIZON: {
                x: 2,
                y: 54
            },
            MOON: {
                x: 484,
                y: 2
            },
            PTERODACTYL: {
                x: 134,
                y: 2
            },
            RESTART: {
                x: 2,
                y: 2
            },
            TEXT_SPRITE: {
                x: 655,
                y: 2
            },
            TREX: {
                x: 848,
                y: 2
            },
            STAR: {
                x: 645,
                y: 2
            }
        },
        HDPI: {
            CACTUS_LARGE: {
                x: 652,
                y: 2
            },
            CACTUS_SMALL: {
                x: 446,
                y: 2
            },
            CLOUD: {
                x: 166,
                y: 2
            },
            HORIZON: {
                x: 2,
                y: 104
            },
            MOON: {
                x: 954,
                y: 2
            },
            PTERODACTYL: {
                x: 260,
                y: 2
            },
            RESTART: {
                x: 2,
                y: 2
            },
            TEXT_SPRITE: {
                x: 1294,
                y: 2
            },
            TREX: {
                x: 1678,
                y: 2
            },
            STAR: {
                x: 1276,
                y: 2
            }
        }
    },
    a.sounds = {
        BUTTON_PRESS: "offline-sound-press",
        HIT: "offline-sound-hit",
        SCORE: "offline-sound-reached"
    },
    a.keycodes = {
        JUMP: {
            38 : 1,
            32 : 1
        },
        DUCK: {
            40 : 1
        },
        RESTART: {
            13 : 1
        }
    },
    a.events = {
        ANIM_END: "webkitAnimationEnd",
        CLICK: "click",
        KEYDOWN: "keydown",
        KEYUP: "keyup",
        MOUSEDOWN: "mousedown",
        MOUSEUP: "mouseup",
        RESIZE: "resize",
        TOUCHEND: "touchend",
        TOUCHSTART: "touchstart",
        VISIBILITY: "visibilitychange",
        BLUR: "blur",
        FOCUS: "focus",
        LOAD: "load"
    },
    a.prototype = {
        setupDisabledRunner: function() {},
        updateConfigSetting: function(a, b) {
            if (a in this.config && void 0 != b) switch (this.config[a] = b, a) {
            case "GRAVITY":
            case "MIN_JUMP_HEIGHT":
            case "SPEED_DROP_COEFFICIENT":
                this.tRex.config[a] = b;
                break;
            case "INITIAL_JUMP_VELOCITY":
                this.tRex.setJumpVelocity(b);
                break;
            case "SPEED":
                this.setSpeed(b)
            }
        },
        loadImages: function() {
            d ? (a.imageSprite = document.getElementById("offline-resources-2x"), this.spriteDef = a.spriteDefinition.HDPI) : (a.imageSprite = document.getElementById("offline-resources-1x"), this.spriteDef = a.spriteDefinition.LDPI),
            this.init()
        },
        loadSounds: function() {
            if (!e) {
                this.audioContext = new AudioContext;
                var b = document.getElementById(this.config.RESOURCE_TEMPLATE_ID).content;
                for (var c in a.sounds) {
                    var d = b.getElementById(a.sounds[c]).src;
                    d = d.substr(d.indexOf(",") + 1);
                    var f = k(d);
                    this.audioContext.decodeAudioData(f,
                    function(a, b) {
                        this.soundFx[a] = b
                    }.bind(this, c))
                }
            }
        },
        setSpeed: function(a) {
            var c = a || this.currentSpeed;
            if (this.dimensions.WIDTH < b) {
                var d = c * this.dimensions.WIDTH / b * this.config.MOBILE_SPEED_COEFFICIENT;
                this.currentSpeed = d > c ? c: d
            } else a && (this.currentSpeed = a)
        },
        init: function() {
            this.adjustDimensions(),
            this.setSpeed(),
            this.containerEl = document.createElement("div"),
            this.containerEl.className = a.classes.CONTAINER,
            this.canvas = j(this.containerEl, this.dimensions.WIDTH, this.dimensions.HEIGHT, a.classes.PLAYER),
            this.canvas.id = "gamecanvas",
            this.canvasCtx = this.canvas.getContext("2d"),
            this.canvasCtx.fillStyle = "#f7f7f7",
            this.canvasCtx.fill(),
            a.updateCanvasScaling(this.canvas),
            this.horizon = new y(this.canvas, this.spriteDef, this.dimensions, this.config.GAP_COEFFICIENT),
            this.distanceMeter = new u(this.canvas, this.spriteDef.TEXT_SPRITE, this.dimensions.WIDTH),
            this.tRex = new t(this.canvas, this.spriteDef.TREX),
            this.outerContainerEl.appendChild(this.containerEl),
            f && this.createTouchController(),
            this.startListening(),
            this.update(),
            window.addEventListener(a.events.RESIZE, this.debounceResize.bind(this))
        },
        createTouchController: function() {
            this.touchController = document.createElement("div"),
            this.touchController.className = a.classes.TOUCH_CONTROLLER
        },
        debounceResize: function() {
            this.resizeTimerId_ || (this.resizeTimerId_ = setInterval(this.adjustDimensions.bind(this), 250))
        },
        adjustDimensions: function() {
            clearInterval(this.resizeTimerId_),
            this.resizeTimerId_ = null;
            var b = window.getComputedStyle(this.outerContainerEl),
            c = Number(b.paddingLeft.substr(0, b.paddingLeft.length - 2));
            this.dimensions.WIDTH = this.outerContainerEl.offsetWidth - 2 * c,
            this.canvas && (this.canvas.width = this.dimensions.WIDTH, this.canvas.height = this.dimensions.HEIGHT, a.updateCanvasScaling(this.canvas), this.distanceMeter.calcXPos(this.dimensions.WIDTH), this.clearCanvas(), this.horizon.update(0, 0, !0), this.tRex.update(0), this.activated || this.crashed || this.paused ? (this.containerEl.style.width = this.dimensions.WIDTH + "px", this.containerEl.style.height = this.dimensions.HEIGHT + "px", this.distanceMeter.update(0, Math.ceil(this.distanceRan)), this.stop()) : this.tRex.draw(0, 0), this.crashed && this.gameOverPanel && (this.gameOverPanel.updateDimensions(this.dimensions.WIDTH), this.gameOverPanel.draw()))
        },
        playIntro: function() {
            if (this.started || this.crashed) this.crashed && this.restart();
            else {
                this.playingIntro = !0,
                this.tRex.playingIntro = !0;
                var b = "@-webkit-keyframes intro { from { width:" + t.config.WIDTH + "px }to { width: " + this.dimensions.WIDTH + "px }}";
                document.styleSheets[0].insertRule(b, 0),
                this.containerEl.addEventListener(a.events.ANIM_END, this.startGame.bind(this)),
                this.containerEl.style.webkitAnimation = "intro .4s ease-out 1 both",
                this.containerEl.style.width = this.dimensions.WIDTH + "px",
                this.touchController && this.outerContainerEl.appendChild(this.touchController),
                this.activated = !0,
                this.started = !0
            }
        },
        startGame: function() {
            hideClass("hidewhenplaying"),
            softHideClass("softhidewhenplaying"),
            document.getElementById("firsttimeinfo").style.color = "#f7f7f7",
            this.runningTime = 0,
            this.playingIntro = !1,
            this.tRex.playingIntro = !1,
            this.containerEl.style.webkitAnimation = "",
            this.playCount++,
            document.addEventListener(a.events.VISIBILITY, this.onVisibilityChange.bind(this)),
            window.addEventListener(a.events.BLUR, this.onVisibilityChange.bind(this)),
            window.addEventListener(a.events.FOCUS, this.onVisibilityChange.bind(this))
        },
        clearCanvas: function() {
            this.canvasCtx.clearRect(0, 0, this.dimensions.WIDTH, this.dimensions.HEIGHT)
        },
        update: function() {
            this.drawPending = !1;
            var a = l(),
            b = a - (this.time || a);
            if (this.time = a, this.activated) {
                this.clearCanvas(),
                this.tRex.jumping && this.tRex.updateJump(b),
                this.runningTime += b;
                var c = this.runningTime > this.config.CLEAR_TIME;
                1 != this.tRex.jumpCount || this.playingIntro || this.playIntro(),
                this.playingIntro ? this.horizon.update(0, this.currentSpeed, c) : (b = this.started ? b: 0, this.horizon.update(b, this.currentSpeed, c, this.inverted));
                var d = c && n(this.horizon.obstacles[0], this.tRex);
                d ? this.gameOver() : (this.distanceRan += this.currentSpeed * b / this.msPerFrame, this.currentSpeed < this.config.MAX_SPEED && (this.currentSpeed += this.config.ACCELERATION));
                var e = this.distanceMeter.update(b, Math.ceil(this.distanceRan));
                if (e && this.playSound(this.soundFx.SCORE), this.invertTimer > this.config.INVERT_FADE_DURATION) this.invertTimer = 0,
                this.invertTrigger = !1,
                this.invert();
                else if (this.invertTimer) this.invertTimer += b;
                else {
                    var f = this.distanceMeter.getActualDistance(Math.ceil(this.distanceRan));
                    f > 0 && (this.invertTrigger = !(f % this.config.INVERT_DISTANCE), this.invertTrigger && 0 === this.invertTimer && (this.invertTimer += b, this.invert()))
                }
            }
            this.crashed || (this.tRex.update(b), this.raq())
        },
        handleEvent: function(b) {
            return function(a, c) {
                switch (a) {
                case c.KEYDOWN:
                case c.TOUCHSTART:
                case c.MOUSEDOWN:
                    this.onKeyDown(b);
                    break;
                case c.KEYUP:
                case c.TOUCHEND:
                case c.MOUSEUP:
                    this.onKeyUp(b)
                }
            }.bind(this)(b.type, a.events)
        },
        startListening: function() {
            document.addEventListener(a.events.KEYDOWN, this),
            document.addEventListener(a.events.KEYUP, this),
            f ? (this.touchController.addEventListener(a.events.TOUCHSTART, this), this.touchController.addEventListener(a.events.TOUCHEND, this), this.containerEl.addEventListener(a.events.TOUCHSTART, this)) : (document.addEventListener(a.events.MOUSEDOWN, this), document.addEventListener(a.events.MOUSEUP, this))
        },
        stopListening: function() {
            document.removeEventListener(a.events.KEYDOWN, this),
            document.removeEventListener(a.events.KEYUP, this),
            f ? (this.touchController.removeEventListener(a.events.TOUCHSTART, this), this.touchController.removeEventListener(a.events.TOUCHEND, this), this.containerEl.removeEventListener(a.events.TOUCHSTART, this)) : (document.removeEventListener(a.events.MOUSEDOWN, this), document.removeEventListener(a.events.MOUSEUP, this))
        },
        onKeyDown: function(b) {
            f && b.preventDefault(),
            b.target != this.detailsButton && (this.crashed || !a.keycodes.JUMP[b.keyCode] && b.type != a.events.TOUCHSTART || (this.activated || (this.loadSounds(), this.activated = !0), this.tRex.jumping || this.tRex.ducking || (this.playSound(this.soundFx.BUTTON_PRESS), this.tRex.startJump(this.currentSpeed))), this.crashed && b.type == a.events.TOUCHSTART && b.currentTarget == this.containerEl && this.restart()),
            this.activated && !this.crashed && a.keycodes.DUCK[b.keyCode] && (b.preventDefault(), this.tRex.jumping ? this.tRex.setSpeedDrop() : this.tRex.jumping || this.tRex.ducking || this.tRex.setDuck(!0))
        },
        onKeyUp: function(b) {
            var c = String(b.keyCode),
            d = a.keycodes.JUMP[c] || b.type == a.events.TOUCHEND || b.type == a.events.MOUSEDOWN;
            if (this.isRunning() && d) this.tRex.endJump();
            else if (a.keycodes.DUCK[c]) this.tRex.speedDrop = !1,
            this.tRex.setDuck(!1);
            else if (this.crashed) {
                var e = l() - this.time; (a.keycodes.RESTART[c] || this.isLeftClickOnCanvas(b) || e >= this.config.GAMEOVER_CLEAR_TIME && a.keycodes.JUMP[c]) && this.restart()
            } else this.paused && d && (this.tRex.reset(), this.play())
        },
        isLeftClickOnCanvas: function(b) {
            return null != b.button && b.button < 2 && b.type == a.events.MOUSEUP && b.target == this.canvas
        },
        raq: function() {
            this.drawPending || (this.drawPending = !0, this.raqId = requestAnimationFrame(this.update.bind(this)))
        },
        isRunning: function() {
            return !! this.raqId
        },
        gameOver: function() {
            showClass("hidewhenplaying"),
            showClass("softhidewhenplaying"),
            gamecount++,
            this.playSound(this.soundFx.HIT),
            i(200),
            this.stop(),
            this.crashed = !0,
            this.distanceMeter.acheivement = !1,
            this.tRex.update(100, t.status.CRASHED),
            this.gameOverPanel ? this.gameOverPanel.draw() : this.gameOverPanel = new m(this.canvas, this.spriteDef.TEXT_SPRITE, this.spriteDef.RESTART, this.dimensions),
            this.distanceRan > this.highestScore && (this.highestScore = Math.ceil(this.distanceRan), this.distanceMeter.setHighScore(this.highestScore)),
            cscr = this.distanceMeter.getActualDistance(Math.ceil(this.distanceRan)),
            this.time = l(),
            this.checkWR(cscr)
        },
        checkWR: function(a) {
            $.get("/game.cgi?act=gethighscore&sessid=" + sessid,
            function(b, c) {
                a > b && $.ajax({
                    type: "POST",
                    url: "/game.cgi",
                    data: {
                        act: "pass1",
                        sword: encodeBase64(a + ""),
                        sessid: sessid
                    },
                    cache: !1,
                    contentType: "application/x-www-form-urlencoded",
                    success: function(a) {
                        if (!isNaN(a)) {
                            var b = "<div style='text-align:center; padding:10px;'><table style='margin:10px auto 30px;'><tr><td><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAhCAMAAAD5wuvoAAAAOVBMVEUAAADj4+NTU1NISEhOTk6lpaWpqalGRkahoaHOzs58fHw/Pz+urq5cXFxmZmZeXl49PT3///9+fn6WGCIfAAAAAnRSTlMAqkCQh84AAADDSURBVCjPpdFLFoMgDAVQmo9B8Nfuf7GVQ4pojJO+gUe8EggEk9eRYMOCvwgbXWdAAs28XBkB31NzsEzTBx4YCB4Z/mbCmnumQYfO7MTM0WVEEdnKWPqfolQ9vgC314kTXLnbxQJgGCjXl9y1LJiVSxdjCONAh9KQUFm7rNqKx01Zz0jVrq1xGOmRw2B8Xjsez27vI59dj9mpLx3Y+qnNNfVLF2xR68v+dJhL2bKKw7phcVg37HG51j2Y4n3xuiqe+/4CXJMGHIBC1ZIAAAAASUVORK5CYII=' /></td><td><span style='font-size:32px;'>Congratulations</span></td><td><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAhCAMAAAD5wuvoAAAANlBMVEUAAADj4+NTU1NISEhOTk6lpaWoqKh8fHzOzs6hoaFdXV0/Pz+urq6qqqqgoKBmZmY9PT3////RJpQvAAAAAnRSTlMAqkCQh84AAAC9SURBVCjPldHhDoMgDARgdldAUad7/5fdZIxOCy67X4QvOUjrnLtpnI2nxhtdE0qESOnMqDo/CHYZcZYrhuCS8T/zHVFuZZEu3733EV3ecn3hXoqP37U8M6KfdR0wDKz1Kkg5TCRqOJVLQWHGRdQlDM4NQfDhbczl6s7tat8uXuZoWPOThcopGQ12K8f/H0Z41MmM3TQfMsZ2s+4AQm02vHeyNht+deYnfJuZv8A+57DJY8w8BGkykdlLLX8C1dkF1XASdiUAAAAASUVORK5CYII=' /></td></tr></table>You have set a new world record. Care to claim your record? Your name will be displayed with a link to the profile you choose.<form id='clsf' action='/game.cgi'><input type='hidden' name='act' value='claimscore'/><input type='hidden' name='qid' value='" + a + "'/><br><input type='text' name='uname' maxlength='15' placeholder='Name' style='width:80%;'><br><br><input type='text' name='profile' maxLength='120' style='width:80%;' placeholder='Profile Url (Facebook,Twitter or Google+ only)'><br/><br/><input type='button' value='Submit' onclick='postCSF();' style='cursor:pointer;'></form></div>";
                            TINY.box.show({
                                html: b,
                                width: 600,
                                height: 380
                            })
                        }
                    }
                })
            })
        },
        stop: function() {
            this.activated = !1,
            this.paused = !0,
            cancelAnimationFrame(this.raqId),
            this.raqId = 0
        },
        play: function() {
            this.crashed || (this.activated = !0, this.paused = !1, this.tRex.update(0, t.status.RUNNING), this.time = l(), this.update())
        },
        restart: function() {
            hideClass("hidewhenplaying"),
            softHideClass("softhidewhenplaying"),
            this.raqId || (this.playCount++, this.runningTime = 0, this.activated = !0, this.crashed = !1, this.distanceRan = 0, this.setSpeed(this.config.SPEED), this.time = l(), this.containerEl.classList.remove(a.classes.CRASHED), this.clearCanvas(), this.distanceMeter.reset(this.highestScore), this.horizon.reset(), this.tRex.reset(), this.playSound(this.soundFx.BUTTON_PRESS), this.invert(!0), this.update())
        },
        onVisibilityChange: function(a) {
            document.hidden || document.webkitHidden || "blur" == a.type || "visible" != document.visibilityState ? this.stop() : this.crashed || (this.tRex.reset(), this.play())
        },
        playSound: function(a) {
            if (a) {
                var b = this.audioContext.createBufferSource();
                b.buffer = a,
                b.connect(this.audioContext.destination),
                b.start(0)
            }
        },
        invert: function(b) {
            b ? (document.body.classList.toggle(a.classes.INVERTED, !1), this.invertTimer = 0, this.inverted = !1) : this.inverted = document.body.classList.toggle(a.classes.INVERTED, this.invertTrigger)
        }
    },
    a.updateCanvasScaling = function(a, b, c) {
        var d = a.getContext("2d"),
        e = Math.floor(window.devicePixelRatio) || 1,
        f = Math.floor(d.webkitBackingStorePixelRatio) || 1,
        g = e / f;
        if (e !== f) {
            var h = b || a.width,
            i = c || a.height;
            return a.width = h * g,
            a.height = i * g,
            a.style.width = h + "px",
            a.style.height = i + "px",
            d.scale(g, g),
            !0
        }
        return 1 == e && (a.style.width = a.width + "px", a.style.height = a.height + "px"),
        !1
    },
    m.dimensions = {
        TEXT_X: 0,
        TEXT_Y: 13,
        TEXT_WIDTH: 191,
        TEXT_HEIGHT: 11,
        RESTART_WIDTH: 36,
        RESTART_HEIGHT: 32
    },
    m.prototype = {
        updateDimensions: function(a, b) {
            this.canvasDimensions.WIDTH = a,
            b && (this.canvasDimensions.HEIGHT = b)
        },
        draw: function() {
            var b = m.dimensions,
            c = this.canvasDimensions.WIDTH / 2,
            e = b.TEXT_X,
            f = b.TEXT_Y,
            g = b.TEXT_WIDTH,
            h = b.TEXT_HEIGHT,
            i = Math.round(c - b.TEXT_WIDTH / 2),
            j = Math.round((this.canvasDimensions.HEIGHT - 25) / 3),
            k = b.TEXT_WIDTH,
            l = b.TEXT_HEIGHT,
            n = b.RESTART_WIDTH,
            o = b.RESTART_HEIGHT,
            p = c - b.RESTART_WIDTH / 2,
            q = this.canvasDimensions.HEIGHT / 2;
            d && (f *= 2, e *= 2, g *= 2, h *= 2, n *= 2, o *= 2),
            e += this.textImgPos.x,
            f += this.textImgPos.y,
            this.canvasCtx.drawImage(a.imageSprite, e, f, g, h, i, j, k, l),
            this.canvasCtx.drawImage(a.imageSprite, this.restartImgPos.x, this.restartImgPos.y, n, o, p, q, b.RESTART_WIDTH, b.RESTART_HEIGHT)
        }
    },
    s.MAX_GAP_COEFFICIENT = 1.5,
    s.MAX_OBSTACLE_LENGTH = 3,
    s.prototype = {
        init: function(a) {
            if (this.cloneCollisionBoxes(), this.size > 1 && this.typeConfig.multipleSpeed > a && (this.size = 1), this.width = this.typeConfig.width * this.size, Array.isArray(this.typeConfig.yPos)) {
                var b = f ? this.typeConfig.yPosMobile: this.typeConfig.yPos;
                this.yPos = b[h(0, b.length - 1)]
            } else this.yPos = this.typeConfig.yPos;
            this.draw(),
            this.size > 1 && (this.collisionBoxes[1].width = this.width - this.collisionBoxes[0].width - this.collisionBoxes[2].width, this.collisionBoxes[2].x = this.width - this.collisionBoxes[2].width),
            this.typeConfig.speedOffset && (this.speedOffset = Math.random() > .5 ? this.typeConfig.speedOffset: -this.typeConfig.speedOffset),
            this.gap = this.getGap(this.gapCoefficient, a)
        },
        draw: function() {
            var b = this.typeConfig.width,
            c = this.typeConfig.height;
            d && (b = 2 * b, c = 2 * c);
            var e = b * this.size * (.5 * (this.size - 1)) + this.spritePos.x;
            this.currentFrame > 0 && (e += b * this.currentFrame),
            this.canvasCtx.drawImage(a.imageSprite, e, this.spritePos.y, b * this.size, c, this.xPos, this.yPos, this.typeConfig.width * this.size, this.typeConfig.height)
        },
        update: function(a, b) {
            this.remove || (this.typeConfig.speedOffset && (b += this.speedOffset), this.xPos -= Math.floor(b * c / 1e3 * a), this.typeConfig.numFrames && (this.timer += a, this.timer >= this.typeConfig.frameRate && (this.currentFrame = this.currentFrame == this.typeConfig.numFrames - 1 ? 0 : this.currentFrame + 1, this.timer = 0)), this.draw(), this.isVisible() || (this.remove = !0))
        },
        getGap: function(a, b) {
            var c = Math.round(this.width * b + this.typeConfig.minGap * a),
            d = Math.round(c * s.MAX_GAP_COEFFICIENT);
            return h(c, d)
        },
        isVisible: function() {
            return this.xPos + this.width > 0
        },
        cloneCollisionBoxes: function() {
            for (var a = this.typeConfig.collisionBoxes,
            b = a.length - 1; b >= 0; b--) this.collisionBoxes[b] = new r(a[b].x, a[b].y, a[b].width, a[b].height)
        }
    },
    s.types = [{
        type: "CACTUS_SMALL",
        width: 17,
        height: 35,
        yPos: 105,
        multipleSpeed: 4,
        minGap: 120,
        minSpeed: 0,
        collisionBoxes: [new r(0, 7, 5, 27), new r(4, 0, 6, 34), new r(10, 4, 7, 14)]
    },
    {
        type: "CACTUS_LARGE",
        width: 25,
        height: 50,
        yPos: 90,
        multipleSpeed: 7,
        minGap: 120,
        minSpeed: 0,
        collisionBoxes: [new r(0, 12, 7, 38), new r(8, 0, 7, 49), new r(13, 10, 10, 38)]
    },
    {
        type: "PTERODACTYL",
        width: 46,
        height: 40,
        yPos: [100, 75, 50],
        yPosMobile: [100, 50],
        multipleSpeed: 999,
        minSpeed: 8.5,
        minGap: 150,
        collisionBoxes: [new r(15, 15, 16, 5), new r(18, 21, 24, 6), new r(2, 14, 4, 3), new r(6, 10, 4, 7), new r(10, 8, 6, 9)],
        numFrames: 2,
        frameRate: 1e3 / 6,
        speedOffset: .8
    }],
    t.config = {
        DROP_VELOCITY: -5,
        GRAVITY: .6,
        HEIGHT: 47,
        HEIGHT_DUCK: 25,
        INIITAL_JUMP_VELOCITY: -10,
        INTRO_DURATION: 1500,
        MAX_JUMP_HEIGHT: 30,
        MIN_JUMP_HEIGHT: 30,
        SPEED_DROP_COEFFICIENT: 3,
        SPRITE_WIDTH: 262,
        START_X_POS: 50,
        WIDTH: 44,
        WIDTH_DUCK: 59
    },
    t.collisionBoxes = {
        DUCKING: [new r(1, 18, 55, 25)],
        RUNNING: [new r(22, 0, 17, 16), new r(1, 18, 30, 9), new r(10, 35, 14, 8), new r(1, 24, 29, 5), new r(5, 30, 21, 4), new r(9, 34, 15, 4)]
    },
    t.status = {
        CRASHED: "CRASHED",
        DUCKING: "DUCKING",
        JUMPING: "JUMPING",
        RUNNING: "RUNNING",
        WAITING: "WAITING"
    },
    t.BLINK_TIMING = 7e3,
    t.animFrames = {
        WAITING: {
            frames: [44, 0],
            msPerFrame: 1e3 / 3
        },
        RUNNING: {
            frames: [88, 132],
            msPerFrame: 1e3 / 12
        },
        CRASHED: {
            frames: [220],
            msPerFrame: 1e3 / 60
        },
        JUMPING: {
            frames: [0],
            msPerFrame: 1e3 / 60
        },
        DUCKING: {
            frames: [262, 321],
            msPerFrame: 125
        }
    },
    t.prototype = {
        init: function() {
            this.blinkDelay = this.setBlinkDelay(),
            this.groundYPos = a.defaultDimensions.HEIGHT - this.config.HEIGHT - a.config.BOTTOM_PAD,
            this.yPos = this.groundYPos,
            this.minJumpHeight = this.groundYPos - this.config.MIN_JUMP_HEIGHT,
            this.draw(0, 0),
            this.update(0, t.status.WAITING)
        },
        setJumpVelocity: function(a) {
            this.config.INIITAL_JUMP_VELOCITY = -a,
            this.config.DROP_VELOCITY = -a / 2
        },
        update: function(a, b) {
            this.timer += a,
            b && (this.status = b, this.currentFrame = 0, this.msPerFrame = t.animFrames[b].msPerFrame, this.currentAnimFrames = t.animFrames[b].frames, b == t.status.WAITING && (this.animStartTime = l(), this.setBlinkDelay())),
            this.playingIntro && this.xPos < this.config.START_X_POS && (this.xPos += Math.round(this.config.START_X_POS / this.config.INTRO_DURATION * a)),
            this.status == t.status.WAITING ? this.blink(l()) : this.draw(this.currentAnimFrames[this.currentFrame], 0),
            this.timer >= this.msPerFrame && (this.currentFrame = this.currentFrame == this.currentAnimFrames.length - 1 ? 0 : this.currentFrame + 1, this.timer = 0),
            this.speedDrop && this.yPos == this.groundYPos && (this.speedDrop = !1, this.setDuck(!0))
        },
        draw: function(b, c) {
            var e = b,
            f = c,
            g = this.ducking && this.status != t.status.CRASHED ? this.config.WIDTH_DUCK: this.config.WIDTH,
            h = this.config.HEIGHT;
            d && (e *= 2, f *= 2, g *= 2, h *= 2),
            e += this.spritePos.x,
            f += this.spritePos.y,
            this.ducking && this.status != t.status.CRASHED ? this.canvasCtx.drawImage(a.imageSprite, e, f, g, h, this.xPos, this.yPos, this.config.WIDTH_DUCK, this.config.HEIGHT) : (this.ducking && this.status == t.status.CRASHED && this.xPos++, this.canvasCtx.drawImage(a.imageSprite, e, f, g, h, this.xPos, this.yPos, this.config.WIDTH, this.config.HEIGHT))
        },
        setBlinkDelay: function() {
            this.blinkDelay = Math.ceil(Math.random() * t.BLINK_TIMING)
        },
        blink: function(a) {
            var b = a - this.animStartTime;
            b >= this.blinkDelay && (this.draw(this.currentAnimFrames[this.currentFrame], 0), 1 == this.currentFrame && (this.setBlinkDelay(), this.animStartTime = a))
        },
        startJump: function(a) {
            this.jumping || (this.update(0, t.status.JUMPING), this.jumpVelocity = this.config.INIITAL_JUMP_VELOCITY - a / 10, this.jumping = !0, this.reachedMinHeight = !1, this.speedDrop = !1)
        },
        endJump: function() {
            this.reachedMinHeight && this.jumpVelocity < this.config.DROP_VELOCITY && (this.jumpVelocity = this.config.DROP_VELOCITY)
        },
        updateJump: function(a, b) {
            var c = t.animFrames[this.status].msPerFrame,
            d = a / c;
            this.speedDrop ? this.yPos += Math.round(this.jumpVelocity * this.config.SPEED_DROP_COEFFICIENT * d) : this.yPos += Math.round(this.jumpVelocity * d),
            this.jumpVelocity += this.config.GRAVITY * d,
            (this.yPos < this.minJumpHeight || this.speedDrop) && (this.reachedMinHeight = !0),
            (this.yPos < this.config.MAX_JUMP_HEIGHT || this.speedDrop) && this.endJump(),
            this.yPos > this.groundYPos && (this.reset(), this.jumpCount++),
            this.update(a)
        },
        setSpeedDrop: function() {
            this.speedDrop = !0,
            this.jumpVelocity = 1
        },
        setDuck: function(a) {
            a && this.status != t.status.DUCKING ? (this.update(0, t.status.DUCKING), this.ducking = !0) : this.status == t.status.DUCKING && (this.update(0, t.status.RUNNING), this.ducking = !1)
        },
        reset: function() {
            this.yPos = this.groundYPos,
            this.jumpVelocity = 0,
            this.jumping = !1,
            this.ducking = !1,
            this.update(0, t.status.RUNNING),
            this.midair = !1,
            this.speedDrop = !1,
            this.jumpCount = 0
        }
    },
    u.dimensions = {
        WIDTH: 10,
        HEIGHT: 13,
        DEST_WIDTH: 11
    },
    u.yPos = [0, 13, 27, 40, 53, 67, 80, 93, 107, 120],
    u.config = {
        MAX_DISTANCE_UNITS: 5,
        ACHIEVEMENT_DISTANCE: 100,
        COEFFICIENT: .025,
        FLASH_DURATION: 250,
        FLASH_ITERATIONS: 3
    },
    u.prototype = {
        init: function(a) {
            var b = "";
            this.calcXPos(a),
            this.maxScore = this.maxScoreUnits;
            for (var c = 0; c < this.maxScoreUnits; c++) this.draw(c, 0),
            this.defaultString += "0",
            b += "9";
            this.maxScore = parseInt(b)
        },
        calcXPos: function(a) {
            this.x = a - u.dimensions.DEST_WIDTH * (this.maxScoreUnits + 1)
        },
        draw: function(a, b, c) {
            var e = u.dimensions.WIDTH,
            f = u.dimensions.HEIGHT,
            g = u.dimensions.WIDTH * b,
            h = 0,
            i = a * u.dimensions.DEST_WIDTH,
            j = this.y,
            k = u.dimensions.WIDTH,
            l = u.dimensions.HEIGHT;
            if (d && (e *= 2, f *= 2, g *= 2), g += this.spritePos.x, h += this.spritePos.y, this.canvasCtx.save(), c) {
                var m = this.x - 2 * this.maxScoreUnits * u.dimensions.WIDTH;
                this.canvasCtx.translate(m, this.y)
            } else this.canvasCtx.translate(this.x, this.y);
            this.canvasCtx.drawImage(this.image, g, h, e, f, i, j, k, l),
            this.canvasCtx.restore()
        },
        getActualDistance: function(a) {
            return a ? Math.round(a * this.config.COEFFICIENT) : 0
        },
        update: function(a, b) {
            var c = !0,
            d = !1;
            if (this.acheivement) this.flashIterations <= this.config.FLASH_ITERATIONS ? (this.flashTimer += a, this.flashTimer < this.config.FLASH_DURATION ? c = !1 : this.flashTimer > 2 * this.config.FLASH_DURATION && (this.flashTimer = 0, this.flashIterations++)) : (this.acheivement = !1, this.flashIterations = 0, this.flashTimer = 0);
            else if (b = this.getActualDistance(b), b > this.maxScore && this.maxScoreUnits == this.config.MAX_DISTANCE_UNITS ? (this.maxScoreUnits++, this.maxScore = parseInt(this.maxScore + "9")) : this.distance = 0, b > 0) {
                b % this.config.ACHIEVEMENT_DISTANCE == 0 && (this.acheivement = !0, this.flashTimer = 0, d = !0);
                var e = (this.defaultString + b).substr( - this.maxScoreUnits);
                this.digits = e.split("")
            } else this.digits = this.defaultString.split("");
            if (c) for (var f = this.digits.length - 1; f >= 0; f--) this.draw(f, parseInt(this.digits[f]));
            return this.drawHighScore(),
            d
        },
        drawHighScore: function() {
            this.canvasCtx.save(),
            this.canvasCtx.globalAlpha = .8;
            for (var a = this.highScore.length - 1; a >= 0; a--) this.draw(a, parseInt(this.highScore[a], 10), !0);
            this.canvasCtx.restore()
        },
        setHighScore: function(a) {
            a = this.getActualDistance(a);
            var b = (this.defaultString + a).substr( - this.maxScoreUnits);
            this.highScore = ["10", "11", ""].concat(b.split(""))
        },
        reset: function() {
            this.update(0),
            this.acheivement = !1
        }
    },
    v.config = {
        HEIGHT: 14,
        MAX_CLOUD_GAP: 400,
        MAX_SKY_LEVEL: 30,
        MIN_CLOUD_GAP: 100,
        MIN_SKY_LEVEL: 71,
        WIDTH: 46
    },
    v.prototype = {
        init: function() {
            this.yPos = h(v.config.MAX_SKY_LEVEL, v.config.MIN_SKY_LEVEL),
            this.draw()
        },
        draw: function() {
            this.canvasCtx.save();
            var b = v.config.WIDTH,
            c = v.config.HEIGHT;
            d && (b = 2 * b, c = 2 * c),
            this.canvasCtx.drawImage(a.imageSprite, this.spritePos.x, this.spritePos.y, b, c, this.xPos, this.yPos, v.config.WIDTH, v.config.HEIGHT),
            this.canvasCtx.restore()
        },
        update: function(a) {
            this.remove || (this.xPos -= Math.ceil(a), this.draw(), this.isVisible() || (this.remove = !0))
        },
        isVisible: function() {
            return this.xPos + v.config.WIDTH > 0
        }
    },
    w.config = {
        FADE_SPEED: .035,
        HEIGHT: 40,
        MOON_SPEED: .25,
        NUM_STARS: 2,
        STAR_SIZE: 9,
        STAR_SPEED: .3,
        STAR_MAX_Y: 70,
        WIDTH: 20
    },
    w.phases = [140, 120, 100, 60, 40, 20, 0],
    w.prototype = {
        update: function(a, b) {
            if (a && 0 == this.opacity && (this.currentPhase++, this.currentPhase >= w.phases.length && (this.currentPhase = 0)), a && (this.opacity < 1 || 0 == this.opacity) ? this.opacity += w.config.FADE_SPEED: this.opacity > 0 && (this.opacity -= w.config.FADE_SPEED), this.opacity > 0) {
                if (this.xPos = this.updateXPos(this.xPos, w.config.MOON_SPEED), this.drawStars) for (var c = 0; c < w.config.NUM_STARS; c++) this.stars[c].x = this.updateXPos(this.stars[c].x, w.config.STAR_SPEED);
                this.draw()
            } else this.opacity = 0,
            this.placeStars();
            this.drawStars = !0
        },
        updateXPos: function(a, b) {
            return a < -w.config.WIDTH ? a = this.containerWidth: a -= b,
            a
        },
        draw: function() {
            var b = 3 == this.currentPhase ? 2 * w.config.WIDTH: w.config.WIDTH,
            c = w.config.HEIGHT,
            e = this.spritePos.x + w.phases[this.currentPhase],
            f = b,
            g = w.config.STAR_SIZE,
            h = a.spriteDefinition.LDPI.STAR.x;
            if (d && (b *= 2, c *= 2, e = this.spritePos.x + 2 * w.phases[this.currentPhase], g *= 2, h = a.spriteDefinition.HDPI.STAR.x), this.canvasCtx.save(), this.canvasCtx.globalAlpha = this.opacity, this.drawStars) for (var i = 0; i < w.config.NUM_STARS; i++) this.canvasCtx.drawImage(a.imageSprite, h, this.stars[i].sourceY, g, g, Math.round(this.stars[i].x), this.stars[i].y, w.config.STAR_SIZE, w.config.STAR_SIZE);
            this.canvasCtx.drawImage(a.imageSprite, e, this.spritePos.y, b, c, Math.round(this.xPos), this.yPos, f, w.config.HEIGHT),
            this.canvasCtx.globalAlpha = 1,
            this.canvasCtx.restore()
        },
        placeStars: function() {
            for (var b = Math.round(this.containerWidth / w.config.NUM_STARS), c = 0; c < w.config.NUM_STARS; c++) this.stars[c] = {},
            this.stars[c].x = h(b * c, b * (c + 1)),
            this.stars[c].y = h(0, w.config.STAR_MAX_Y),
            d ? this.stars[c].sourceY = a.spriteDefinition.HDPI.STAR.y + 2 * w.config.STAR_SIZE * c: this.stars[c].sourceY = a.spriteDefinition.LDPI.STAR.y + w.config.STAR_SIZE * c
        },
        reset: function() {
            this.currentPhase = 0,
            this.opacity = 0,
            this.update(!1)
        }
    },
    x.dimensions = {
        WIDTH: 600,
        HEIGHT: 12,
        YPOS: 127
    },
    x.prototype = {
        setSourceDimensions: function() {
            for (var a in x.dimensions) d ? "YPOS" != a && (this.sourceDimensions[a] = 2 * x.dimensions[a]) : this.sourceDimensions[a] = x.dimensions[a],
            this.dimensions[a] = x.dimensions[a];
            this.xPos = [0, x.dimensions.WIDTH],
            this.yPos = x.dimensions.YPOS
        },
        getRandomType: function() {
            return Math.random() > this.bumpThreshold ? this.dimensions.WIDTH: 0
        },
        draw: function() {
            this.canvasCtx.drawImage(a.imageSprite, this.sourceXPos[0], this.spritePos.y, this.sourceDimensions.WIDTH, this.sourceDimensions.HEIGHT, this.xPos[0], this.yPos, this.dimensions.WIDTH, this.dimensions.HEIGHT),
            this.canvasCtx.drawImage(a.imageSprite, this.sourceXPos[1], this.spritePos.y, this.sourceDimensions.WIDTH, this.sourceDimensions.HEIGHT, this.xPos[1], this.yPos, this.dimensions.WIDTH, this.dimensions.HEIGHT)
        },
        updateXPos: function(a, b) {
            var c = a,
            d = 0 == a ? 1 : 0;
            this.xPos[c] -= b,
            this.xPos[d] = this.xPos[c] + this.dimensions.WIDTH,
            this.xPos[c] <= -this.dimensions.WIDTH && (this.xPos[c] += 2 * this.dimensions.WIDTH, this.xPos[d] = this.xPos[c] - this.dimensions.WIDTH, this.sourceXPos[c] = this.getRandomType() + this.spritePos.x)
        },
        update: function(a, b) {
            var d = Math.floor(.06 * b * a);
            this.xPos[0] <= 0 ? this.updateXPos(0, d) : this.updateXPos(1, d),
            this.draw()
        },
        reset: function() {
            this.xPos[0] = 0,
            this.xPos[1] = x.dimensions.WIDTH
        }
    },
    y.config = {
        BG_CLOUD_SPEED: .2,
        BUMPY_THRESHOLD: .3,
        CLOUD_FREQUENCY: .5,
        HORIZON_HEIGHT: 16,
        MAX_CLOUDS: 6
    },
    y.prototype = {
        init: function() {
            this.addCloud(),
            this.horizonLine = new x(this.canvas, this.spritePos.HORIZON),
            this.nightMode = new w(this.canvas, this.spritePos.MOON, this.dimensions.WIDTH)
        },
        update: function(a, b, c, d) {
            this.runningTime += a,
            this.horizonLine.update(a, b),
            this.nightMode.update(d),
            this.updateClouds(a, b),
            c && this.updateObstacles(a, b)
        },
        updateClouds: function(a, b) {
            var c = this.cloudSpeed / 1e3 * a * b,
            d = this.clouds.length;
            if (d) {
                for (var e = d - 1; e >= 0; e--) this.clouds[e].update(c);
                var f = this.clouds[d - 1];
                d < this.config.MAX_CLOUDS && this.dimensions.WIDTH - f.xPos > f.cloudGap && this.cloudFrequency > Math.random() && this.addCloud(),
                this.clouds = this.clouds.filter(function(a) {
                    return ! a.remove
                })
            } else this.addCloud()
        },
        updateObstacles: function(a, b) {
            for (var c = this.obstacles.slice(0), d = 0; d < this.obstacles.length; d++) {
                var e = this.obstacles[d];
                e.update(a, b),
                e.remove && c.shift()
            }
            if (this.obstacles = c, this.obstacles.length > 0) {
                var f = this.obstacles[this.obstacles.length - 1];
                f && !f.followingObstacleCreated && f.isVisible() && f.xPos + f.width + f.gap < this.dimensions.WIDTH && (this.addNewObstacle(b), f.followingObstacleCreated = !0)
            } else this.addNewObstacle(b)
        },
        removeFirstObstacle: function() {
            this.obstacles.shift()
        },
        addNewObstacle: function(b) {
            var c = h(0, s.types.length - 1),
            d = s.types[c];
            if (this.duplicateObstacleCheck(d.type) || b < d.minSpeed) this.addNewObstacle(b);
            else {
                var e = this.spritePos[d.type];
                this.obstacles.push(new s(this.canvasCtx, d, e, this.dimensions, this.gapCoefficient, b, d.width)),
                this.obstacleHistory.unshift(d.type),
                this.obstacleHistory.length > 1 && this.obstacleHistory.splice(a.config.MAX_OBSTACLE_DUPLICATION)
            }
        },
        duplicateObstacleCheck: function(b) {
            for (var c = 0,
            d = 0; d < this.obstacleHistory.length; d++) c = this.obstacleHistory[d] == b ? c + 1 : 0;
            return c >= a.config.MAX_OBSTACLE_DUPLICATION
        },
        reset: function() {
            this.obstacles = [],
            this.horizonLine.reset(),
            this.nightMode.reset()
        },
        resize: function(a, b) {
            this.canvas.width = a,
            this.canvas.height = b
        },
        addCloud: function() {
            this.clouds.push(new v(this.canvas, this.spritePos.CLOUD, this.dimensions.WIDTH))
        }
    }
} ();

var isWebkit = 'WebkitAppearance' in document.documentElement.style;
if (isWebkit) {
    new Runner('.interstitial-wrapper');
} else {
    //清除display样式，display将使用默认值（块元素会变成block，内联元素会变成inline）
    document.getElementById("main-frame-notchrome").style.display = "";
}