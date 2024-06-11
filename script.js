"use strict";
const App = () => {
    var _a;
    const $ = (query) => document.querySelector(query);
    (_a = $("#register")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        var _a, _b;
        const name = (_a = $("#name")) === null || _a === void 0 ? void 0 : _a.value;
        const plateNumber = (_b = $("#plateNumber")) === null || _b === void 0 ? void 0 : _b.value;
        if (!name || !plateNumber) {
            alert("Os campos nome e placa são obrigatórios");
            return;
        }
    });
};
// Execute
App();
