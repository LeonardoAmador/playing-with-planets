"use strict";
const allPlanets = [];
const saveNewPlanet = (name, coordinates, situation, satellites) => {
    const planet = {
        name,
        coordinates,
        situation,
        satellites
    };
    allPlanets.push(planet);
    alert('A new planet was added.');
    return planet;
};
const getNewPlanetsInfo = () => {
    try {
        const planetName = prompt('Enter the planet name: ');
        const coordinates = ['X', 'Y', 'Z', 'W'].reduce((acc, axis) => {
            const coord = Number(prompt(`Enter the ${axis} coordinate:`));
            if (!isNaN(coord)) {
                acc.push(coord);
            }
            else {
                alert(`Invalid ${axis} coordinate entered.`);
                throw new Error('Invalid coordinates');
            }
            return acc;
        }, [] // Start with an empty array of numbers
        );
        const situation = prompt(`Enter the planet ${planetName} situation: `);
        if (coordinates.length !== 4) {
            alert('Incomplete coordinates entered.');
            return;
        }
        saveNewPlanet(planetName, coordinates, situation, []);
    }
    catch (error) {
        alert('Impossible to complete the operation.');
    }
};
const updatePlanetSituation = () => {
    const planetName = prompt('Wich planet would you like to update the situation? ');
    const planetFound = findPlanetByName(planetName);
    if (planetFound) {
        planetFound.situation = prompt(`For which situation would you like to update the ${planetName}? `);
        alert(`The ${planetName} situation was updated.`);
    }
    else {
        alert(`Planet not found.`);
        return updatePlanetSituation();
    }
};
const findPlanetByName = (name) => allPlanets.find((planet) => planet.name === name);
const addSatellitesToPlanet = () => {
    const planetName = prompt('Which planet would you like to add satellites to? ');
    const planetFound = findPlanetByName(planetName);
    if (planetFound) {
        const satellitesInput = prompt('Enter the names of the satellites (separated by commas):');
        const satellites = satellitesInput.split(',').map((satellite) => satellite.trim());
        planetFound.satellites.push(...satellites);
        alert(`Satellites (${satellites.join(', ')}) were added to ${planetName}.`);
    }
    else {
        alert('Planet not found.');
    }
};
const removeSatellitesFromPlanet = () => {
    const planetName = prompt('Which planet would you like to remove satellites? ');
    const planetFound = findPlanetByName(planetName);
    if (!planetFound) {
        alert('`Planet not found!');
        return;
    }
    if (planetFound?.satellites.length === 0) {
        alert(`The ${planetName} has no satellites to remove.`);
    }
    else {
        const satellitesAvailable = prompt(`These are the satellites available: ${planetFound?.satellites.join(',')}.\nWhat would you like to remove? (separated by commas)`);
        const satellitesToRemove = satellitesAvailable?.split(',').map((satellite) => satellite.trim());
        const satellitesupdated = planetFound?.satellites.filter((satellite) => !satellitesToRemove.includes(satellite));
        planetFound.satellites = satellitesupdated;
        alert(`Satellites (${satellitesToRemove.join(', ')}) were removed from ${planetName}.`);
    }
};
const listAllPlanets = () => {
    allPlanets.forEach(({ name, coordinates, situation, satellites }) => {
        alert(`Planet information:\nName: ${name}\nCoordinates: ${coordinates.join(', ')}\nSituation: ${situation}\nSatellites: ${satellites.join(', ')}`);
    });
};
const menu = () => {
    let option = "";
    while (option !== "6") {
        let choice = prompt('1-Save a new Planet\n2-Update planet status\n3-Add satellite\n4-Remove satellite\n5-List all\n6-Exit');
        option = choice;
        switch (option) {
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
                alert('Exiting...');
                break;
            default:
                alert('Invalid option. Please, try it again!');
        }
    }
};
menu();
