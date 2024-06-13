"use strict";
const $ = (query) => document.querySelector(query);
const mock1 = [
    {
        id: '32x!#o',
        plateNumber: 'GKR9534',
        name: 'Bir',
        entryTime: '2201895890152',
    },
    {
        id: '@wggf!t',
        plateNumber: 'GKR9534',
        name: 'Zé',
        entryTime: '2201895890152',
    },
    {
        id: 'a%f(f',
        plateNumber: 'GKR9534',
        name: 'agagw',
        entryTime: '2201895890152',
    }
];
class ParkingSpaces {
    constructor(loadedParkingSpaces) {
        this.checkDoublePlate = (parkingSpace) => {
            return this.parkingSpaces.find((el) => el.plateNumber === parkingSpace.plateNumber);
        };
        this.create = (parkingSpace) => {
            if (this.parkingSpaces.length > 0) {
                const doublePlateNumber = this.checkDoublePlate(parkingSpace);
                if (doublePlateNumber) {
                    alert(`O número de placa (${doublePlateNumber}), já consta em uma das vagas!`);
                    return;
                }
            }
            this.parkingSpaces.push(parkingSpace);
            return parkingSpace;
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
const MemParkingSpaces = new ParkingSpaces(mock1);
// Events
const registerButtonEvent = () => {
    var _a, _b;
    const name = (_a = $('#name')) === null || _a === void 0 ? void 0 : _a.value;
    const plateNumber = (_b = $('#plateNumber')) === null || _b === void 0 ? void 0 : _b.value;
    if (!name || !plateNumber) {
        alert('Os campos nome e placa são obrigatórios');
        return;
    }
    MemParkingSpaces.create({
        id: '0saf',
        plateNumber,
        name: name,
        entryTime: 'none',
    });
    console.log(MemParkingSpaces.read());
};
const addAllEventListeners = () => {
    var _a;
    (_a = $('#register')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', registerButtonEvent);
};
// Render
function populateTable() {
    const ParkSpacesTable = $('#parkingSpaces');
    if (ParkSpacesTable) {
        ParkSpacesTable.innerHTML = '';
        MemParkingSpaces.read().forEach((parkingSpace) => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
        <td>${parkingSpace.name}</td>
        <td>${parkingSpace.plateNumber}</td>
        <td>${parkingSpace.entryTime}</td>
        <td>
          <button type='button'>X</button>
        </td>
      `;
            ParkSpacesTable.appendChild(newRow);
        });
    }
}
// App
const App = () => {
    // Element Preparations
    addAllEventListeners();
    populateTable();
};
// Execute
App();
