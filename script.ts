const $ = (query: string): HTMLInputElement | null => document.querySelector(query);

interface ParkingSpace {
  id: string;
  plateNumber: string;
  name: string;
  enterTime: string;
  exitTime: string;
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

  read = () => {
    return this.parkingSpaces;
  }

  update = () => {

  }

  delete = () => {

  }
}

// Initiate
const MemParkingSpaces = new ParkingSpaces([]);

// Events
const registerButtonEvent = () => {

  const name = $("#name")?.value;
  const plateNumber = $("#plateNumber")?.value;

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
}

const addAllEventListeners = () => {
  $("#register")?.addEventListener("click", registerButtonEvent);
}


// App
const App = (): void => {
  // Element Preparations
  addAllEventListeners();
}

// Execute
App();
