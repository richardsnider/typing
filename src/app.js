const startup = require('./startup');

(async () => {
    document.addEventListener('DOMContentLoaded', startup);
})();

module.exports = startup;
