"use strict";
const $ = (query) => document.querySelector(query);
class ParkingSpaces {
    constructor(loadedParkingSpaces) {
        this.create = (parkingSpace) => {
            if (this.parkingSpaces.length > 0) {
                const doublePlateNumber = this.parkingSpaces.find((el) => {
                    return el.plateNumber === parkingSpace.plateNumber;
                });
                if (doublePlateNumber) {
                    alert("Esse número de placa já consta em uma das vagas!");
                    return;
                }
            }
            this.parkingSpaces.push(parkingSpace);
        };
        this.read = () => {
            return this.parkingSpaces;
        };
        this.update = () => {
        };
        this.delete = () => {
        };
        this.parkingSpaces = loadedParkingSpaces;
    }
}
// Initiate
const MemParkingSpaces = new ParkingSpaces([]);
// Events
const registerButtonEvent = (e) => {
    var _a, _b;
    const name = (_a = $("#name")) === null || _a === void 0 ? void 0 : _a.value;
    const plateNumber = (_b = $("#plateNumber")) === null || _b === void 0 ? void 0 : _b.value;
    if (!name || !plateNumber) {
        alert("Os campos nome e placa são obrigatórios");
        return;
    }
    MemParkingSpaces.create({
        id: "0saf",
        plateNumber,
        name: name,
        enterTime: "none",
        exitTime: "nen",
    });
    console.log(MemParkingSpaces.read());
};
const addAllEventListeners = () => {
    var _a;
    (_a = $("#register")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", registerButtonEvent);
};
// App
const App = () => {
    // Element Preparations
    addAllEventListeners();
};
// Execute
App();
