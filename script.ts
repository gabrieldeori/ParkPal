const $ = (query: string): HTMLInputElement | null => document.querySelector(query);

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
]

interface ParkingSpace {
  id: string;
  plateNumber: string;
  name: string;
  entryTime: string;
  exitTime?: string;
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
    return parkingSpace;
  }

  read = (): Array<ParkingSpace> => {
    return this.parkingSpaces;
  }

  update = () => {

  }

  delete = () => {

  }
}

// Initiate
const MemParkingSpaces = new ParkingSpaces(mock1);

// Events
const registerButtonEvent = () => {

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
    entryTime: 'none',
  });

  console.log(MemParkingSpaces.read());
}

const addAllEventListeners = () => {
  $('#register')?.addEventListener('click', registerButtonEvent);
}


// Render
function populateTable() {
  const ParkSpacesTable = $('#parkingSpaces');
  
  if (ParkSpacesTable) {
    ParkSpacesTable.innerHTML = '';

    MemParkingSpaces.read().forEach((parkingSpace: ParkingSpace) => {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${parkingSpace.name}</td>
        <td>${parkingSpace.plateNumber}</td>
        <td>${parkingSpace.entryTime}</td>
        <td>
          <button type='button'>X</button>
        </td>
      `

      ParkSpacesTable.appendChild(newRow);
    });
  }
}

// App
const App = (): void => {
  // Element Preparations
  addAllEventListeners();
  populateTable();
}

// Execute
App();
