"use strict";
const $ = (query) => document.querySelector(query);
// Auxiliares
// Função para adicionar zero à esquerda se o número for menor que 10
const padZero = (num) => (num < 10 ? `0${num}` : num);
// Função para formatar uma data para "dd/mm/yyyy - HH:MM:SS"
const formatDate = (date) => {
    const day = padZero(date.getDate());
    const month = padZero(date.getMonth() + 1); // Meses começam de 0
    const year = date.getFullYear();
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const seconds = padZero(date.getSeconds());
    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
};
const mock1 = [
    {
        id: '32x!#o',
        plateNumber: 'GKR95ss34',
        name: 'Bir',
        entryTime: new Date(),
    },
    {
        id: '@wggf!t',
        plateNumber: 'GKR95gg34',
        name: 'Zé',
        entryTime: new Date(),
    },
    {
        id: 'a%f(f',
        plateNumber: 'GKR9wr534',
        name: 'agagw',
        entryTime: new Date(),
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
            localStorage.setItem('ParkingSpaces', JSON.stringify(this.parkingSpaces));
            populateTable();
            return parkingSpace;
        };
        this.read = () => {
            return this.parkingSpaces;
        };
        this.update = () => {
        };
        this.delete = (plateNumber) => {
            const filteredParkingSpaces = this.parkingSpaces.filter((parkingSpace) => {
                return parkingSpace.plateNumber != plateNumber;
            });
            this.parkingSpaces = filteredParkingSpaces;
            localStorage.setItem('ParkingSpaces', JSON.stringify(this.parkingSpaces));
            populateTable();
        };
        this.parkingSpaces = loadedParkingSpaces;
    }
}
// Initiate
const lstorageParkingSpaces = localStorage.getItem('ParkingSpaces') || '[]';
const parsedParkingSpaces = JSON.parse(lstorageParkingSpaces);
const MemParkingSpaces = new ParkingSpaces(parsedParkingSpaces);
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
        entryTime: new Date().getTime(),
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
            var _a;
            const newRow = document.createElement('tr');
            const entryDate = new Date(parkingSpace.entryTime);
            const formattedDate = formatDate(entryDate);
            newRow.id = parkingSpace.plateNumber;
            newRow.innerHTML = `
        <td>${parkingSpace.name}</td>
        <td>${parkingSpace.plateNumber}</td>
        <td>${formattedDate}</td>
        <td>
          <button class="delete-button" type='button'>X</button>
        </td>
      `;
            (_a = newRow.querySelector(".delete-button")) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
                MemParkingSpaces.delete(parkingSpace.plateNumber);
            });
            ParkSpacesTable.appendChild(newRow);
        });
    }
}
// App
const App = () => {
    // Element Preparations
    addAllEventListeners();
    // Render
    populateTable();
};
// Execute
App();
