"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCardState = getCardState;
exports.getTokenizationStatus = getTokenizationStatus;
function getCardState(stateId) {
  switch (stateId) {
    case -1:
      return 'not found';
    case 0:
      return 'active';
    case 1:
      return 'requireActivation';
    case 2:
      return 'pending';
    case 3:
      return 'suspended';
    case 4:
      return 'deactivated';
    default:
      throw new Error(`Unknown card state: ${stateId}`);
  }
}
function getTokenizationStatus(stateId) {
  switch (stateId) {
    case -1:
      return 'error';
    case 0:
      return 'success';
    case 1:
      return 'canceled';
    default:
      throw new Error(`Unknown tokenization status: ${stateId}`);
  }
}
//# sourceMappingURL=utils.js.map