"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('*', (req, res) => {
    const apiDocsUrl = `${req.protocol}://${req.get('host')}/api-docs`;
    res.status(404).send({
        status: 404,
        message: `Resource not found, go to /api-docs for more information`,
        apiDocs: `${apiDocsUrl}`
    });
});
exports.default = router;
//# sourceMappingURL=notFoundRoute.js.map