// backend/src/utils/trackingId.js
const { customAlphabet } = require('nanoid');
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nanoid = customAlphabet(alphabet, 6);

function generateTrackingId() {
  return 'R-' + nanoid();
}

module.exports = { generateTrackingId };
