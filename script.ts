const $ = (query: string): HTMLInputElement | null => document.querySelector(query);

interface ParkingSpace {
  id: string
  plateNumber: string
  name: string
  enterTime: string
  exitTime: string
}

class ParkingSpaces {
  private parkingSpaces: Array<ParkingSpace>

  constructor(loadedParkingSpaces: Array<ParkingSpace> | []) {
    this.parkingSpaces = loadedParkingSpaces
  }

  create = (parkingSpace: ParkingSpace) => {
    if (this.parkingSpaces.length > 0) {
      const doublePlateNumber = this.parkingSpaces.filter((el: ParkingSpace) => {
        el.plateNumber === parkingSpace.plateNumber
      })
  
      if (doublePlateNumber) {
        alert("Esse número de placa já consta em uma das vagas!")
      } 
    }
  }

  read = () => {

  }

  update = () => {

  }

  delete = () => {

  }
}

// Events
const registerButtonEvent = () => {
  const name = $("#name")?.value;
  const plateNumber = $("#plateNumber")?.value;

  if (!name || !plateNumber) {
    alert("Os campos nome e placa são obrigatórios");
    return;
  }
}

const addAllEventListeners = () => {
  $("#register")?.addEventListener("click", registerEvent);
}


// App
const App = (): void => {
  // Element Preparations
  addAllEventListeners();
}

// Execute
App();
