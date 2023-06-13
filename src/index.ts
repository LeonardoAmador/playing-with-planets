type PlanetStatus = 'Habitado' | 'Habitavél' | 'Inabitável' | 'Inexplorado';

interface Planet {
    name: string;
    coordinates: [number, number, number, number];
    situation: PlanetStatus;
    satellites: string[];
}

const allPlanets: Planet[] = [];

const saveNewPlanet = (name: string, coordinates: [number, number, number, number], situation: PlanetStatus, satellites: string[]) => {
    const planet = {
        name,
        coordinates,
        situation,
        satellites
    }

    allPlanets.push(planet);
    alert('A new planet was added.');

    return planet;
}

const getNewPlanetsInfo = (): void => {
    try {
        const planetName = prompt('Enter the planet name: ') as string;
        const coordinates: [number, number, number, number] = ['X', 'Y', 'Z', 'W'].reduce(
            (acc: [number, number, number, number], axis: string) => {
                const coord = Number(prompt(`Enter the ${axis} coordinate:`));
                if (!isNaN(coord)) {
                    acc.push(coord);
                } else {
                    alert(`Invalid ${axis} coordinate entered.`);
                    throw new Error('Invalid coordinates');
                }
                return acc;
            },
            [] as unknown as [number, number, number, number] // Start with an empty array of numbers
        );
        const situation = prompt(`Enter the planet ${planetName} situation: `) as PlanetStatus;

        if (coordinates.length !== 4) {
            alert('Incomplete coordinates entered.');
            return;
        }

        saveNewPlanet(planetName, coordinates, situation, []);
    } catch (error) {
        alert('Impossible to complete the operation.');
    }
};

const updatePlanetSituation = (): void => {
    const planetName = prompt('Wich planet would you like to update the situation? ') as string;
    const planetFound = findPlanetByName(planetName);

    if (planetFound) {
        planetFound.situation = prompt(`For which situation would you like to update the ${planetName}? `) as PlanetStatus;
        alert(`The ${planetName} situation was updated.`);
    } else {
        alert(`Planet not found.`)
        return updatePlanetSituation();
    }
}

const findPlanetByName = (name: string) => allPlanets.find((planet) => planet.name === name);

const addSatellitesToPlanet = () => {
    const planetName =  prompt('Which planet would you like to add satellites to? ') as string;
    const planetFound = findPlanetByName(planetName);

    if (planetFound) {
        const satellitesInput = prompt('Enter the names of the satellites (separated by commas):') as string;
        const satellites = satellitesInput.split(',').map((satellite) => satellite.trim());
        planetFound.satellites.push(...satellites);

        alert(`Satellites (${satellites.join(', ')}) were added to ${planetName}.`)
    } else {
        alert('Planet not found.')
    }
}

const removeSatellitesFromPlanet = () => {
    const planetName = prompt('Which planet would you like to remove satellites? ') as string;
    const planetFound = findPlanetByName(planetName);

    if (!planetFound) {
        alert('`Planet not found!')
        return;
    }

    if (planetFound?.satellites.length === 0) {
        alert(`The ${planetName} has no satellites to remove.`)
    } else {
        const satellitesAvailable = prompt(`These are the satellites available: ${planetFound?.satellites.join(',')}.\nWhat would you like to remove? (separated by commas)`) as string;
        const satellitesToRemove = satellitesAvailable?.split(',').map((satellite) => satellite.trim());
        const satellitesupdated = planetFound?.satellites.filter((satellite) => !satellitesToRemove.includes(satellite))
        planetFound.satellites = satellitesupdated;

        alert(`Satellites (${satellitesToRemove.join(', ')}) were removed from ${planetName}.`);
    }
}

const listAllPlanets = (): void => {
    allPlanets.forEach(({ name, coordinates, situation, satellites }) => {
        alert(`Planet information:\nName: ${name}\nCoordinates: ${coordinates.join(', ')}\nSituation: ${situation}\nSatellites: ${satellites.join(', ')}`);
    })
}

const menu = () => {
    let option: string | null = "";

    while (option !== "6") {
        let choice = prompt('1-Save a new Planet\n2-Update planet status\n3-Add satellite\n4-Remove satellite\n5-List all\n6-Exit');

        option = choice;
        
        switch(option) {
            case "1":
                getNewPlanetsInfo();
                break;
            case "2": 
                updatePlanetSituation();
                break;
            case "3":
                addSatellitesToPlanet();
                break;
            case "4":
                removeSatellitesFromPlanet();
                break;
            case "5":
                listAllPlanets();
                break;
            case "6":
                alert('Exiting...')
                break;
            default:
                alert('Invalid option. Please, try it again!');
        }
    }
}

menu();