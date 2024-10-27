"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var deck_1 = require("./cards/abilities-and-equipments/deck");
var deck_2 = require("./cards/jungle/deck");
var CreatureActionsController_1 = require("./controllers/CreatureController/CreatureActionsController");
var CreatureController_1 = require("./controllers/CreatureController/CreatureController");
var GameController_1 = require("./controllers/GameController");
var game_map_1 = require("./core/game-map");
var Elora_1 = require("./creatures/champions/Elora");
var Jorik_1 = require("./creatures/champions/Jorik");
var gameState = (function () {
    var map = new game_map_1["default"](3);
    var abilitiesAndEquipmentsDeck = new deck_1["default"]();
    var jungleDeck = new deck_2["default"]();
    var players = [];
    var effectsQueue = new GameController_1.EffectsQueue();
    var gameState = new GameController_1.GameState(map, abilitiesAndEquipmentsDeck, jungleDeck, players, effectsQueue);
    return gameState;
})();
var gameContext = new GameController_1.GameContext(function () { return gameState; });
var RED_TEAM = 1;
var BLUE_TEAM = 2;
var jorik = new Jorik_1["default"](RED_TEAM);
var enemy = new Elora_1["default"](BLUE_TEAM);
// in center;
gameContext.getGameState().map.moveCreature(jorik, gameContext.getGameState().map.getTile(0, 0));
gameContext.getGameState().map.moveCreature(enemy, gameContext.getGameState().map.getTile(0, 0));
var PlaygroundJorikActionsController = /** @class */ (function (_super) {
    __extends(PlaygroundJorikActionsController, _super);
    function PlaygroundJorikActionsController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.actionIndex = 0;
        return _this;
    }
    PlaygroundJorikActionsController.prototype.getNextAction = function (state) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.actionIndex === 0) {
                    this.actionIndex++;
                    return [2 /*return*/, new CreatureActionsController_1.BasicAttackAction(enemy)];
                }
                if (this.actionIndex === 1) {
                    this.actionIndex++;
                    return [2 /*return*/, new CreatureActionsController_1.MovementAction(gameContext.getGameState().map.getTile(0, 1))];
                }
                return [2 /*return*/, new CreatureActionsController_1.EndOfTurnAction()];
            });
        });
    };
    PlaygroundJorikActionsController.prototype.createController = function (creature) {
        return new PlaygroundJorikActionsController(creature);
    };
    return PlaygroundJorikActionsController;
}(CreatureActionsController_1["default"]));
function playJorikTurn() {
    return __awaiter(this, void 0, void 0, function () {
        var jorikController;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jorikController = new CreatureController_1["default"](jorik, jorik.team, gameContext, {
                        ActionsController: PlaygroundJorikActionsController
                    });
                    return [4 /*yield*/, jorikController.playTurn()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
playJorikTurn();
