// Auxiliares
//
//
//
function leftPadZero (num: number): string {
  return (num < 10 ? `0${num}` : `num`);
}

function formatDate (date: Date): string {
  const day = leftPadZero(date.getDate());
  const month = leftPadZero(date.getMonth() + 1); // Meses começam de 0
  const year = date.getFullYear();
  const hours = leftPadZero(date.getHours());
  const minutes = leftPadZero(date.getMinutes());
  const seconds = leftPadZero(date.getSeconds());

  return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
};

interface ParkingSpace {
  id: string;
  plateNumber: string;
  name: string;
  entryTime: number;
  exitTime?: number;
}

class ParkingSpaces {
  private parkingSpaces: Array<ParkingSpace>;

  constructor(loadedParkingSpaces: Array<ParkingSpace> | []) {
    this.parkingSpaces = loadedParkingSpaces;
  }

  checkDoublePlate = (parkingSpace: ParkingSpace) => {
    return this.parkingSpaces.find((el: ParkingSpace) => el.plateNumber === parkingSpace.plateNumber);
  }

  create = (parkingSpace: ParkingSpace) => {
    if (this.parkingSpaces.length > 0) {
      const doublePlateNumber = this.checkDoublePlate(parkingSpace)

      if (doublePlateNumber) {
        alert(`O número de placa (${doublePlateNumber}), já consta em uma das vagas!`);
        return;
      }
    }

    this.parkingSpaces.push(parkingSpace);

    localStorage.setItem('ParkingSpaces', JSON.stringify(this.parkingSpaces));

    populateTable();
    return parkingSpace;
  }

  read = (): Array<ParkingSpace> => {
    return this.parkingSpaces;
  }

  update = () => {

  }

  delete = (plateNumber: String) => {
    const filteredParkingSpaces = this.parkingSpaces.filter((parkingSpace: ParkingSpace) => {
      return parkingSpace.plateNumber != plateNumber;
    });

    this.parkingSpaces = filteredParkingSpaces;
    localStorage.setItem('ParkingSpaces', JSON.stringify(this.parkingSpaces));

    populateTable();
  }
}

// Initiate
const $ = (query: string): HTMLInputElement | null => document.querySelector(query);
const lstorageParkingSpaces = localStorage.getItem('ParkingSpaces') || '[]';
const parsedParkingSpaces = JSON.parse(lstorageParkingSpaces)
const MemParkingSpaces = new ParkingSpaces(parsedParkingSpaces);

// Events
function registerButtonEvent(): void {

  const name = $('#name')?.value;
  const plateNumber = $('#plateNumber')?.value;

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
}

function addAllEventListeners(): void {
  $('#register')?.addEventListener('click', registerButtonEvent);
}

// Render
function populateTable(): void {
  const ParkSpacesTable = $('#parkingSpaces');

  if (ParkSpacesTable) {
    ParkSpacesTable.innerHTML = '';

    MemParkingSpaces.read().forEach((parkingSpace: ParkingSpace) => {
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
      `

      newRow.querySelector(".delete-button")?.addEventListener('click', () => {
        MemParkingSpaces.delete(parkingSpace.plateNumber);
      });

      ParkSpacesTable.appendChild(newRow);
    });
  }
}

// App
function App(): void {
  // Element Preparations
  addAllEventListeners();
  
  // Render
  populateTable();
}

// Execute
App();
