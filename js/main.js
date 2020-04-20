// New York
const latitudeNY = 41.145556;
const longitudeNY = -73.995;

// Melbourne
const latitudeML = -37.867579;
const longitudeML = 145.048621;

const pointersContainer = document.querySelector("#pointers-container");
const mapImage = document.querySelector(".map img");
const mapWidth = mapImage.clientWidth;
const mapHeight = mapImage.clientHeight;

[
  { lat: latitudeNY, lon: longitudeNY },
  { lat: latitudeML, lon: longitudeML }
].forEach(({ lat, lon }) => {
  const { x, y } = latLonToOffsets(lat, lon, mapWidth, mapHeight);
  renderPointer(x, y);
});

/**
 * @param {number} latitude in degrees
 * @param {number} longitude in degrees
 * @param {number} mapWidth in pixels
 * @param {number} mapHeight in pixels
 */
function latLonToOffsets(latitude, longitude, mapWidth, mapHeight) {
  const radius = mapWidth / (2 * Math.PI);
  const FE = 180; // false easting

  const lonRad = degreesToRadians(longitude + FE);
  const x = lonRad * radius;

  const latRad = degreesToRadians(latitude);
  const verticalOffsetFromEquator =
    radius * Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  const y = mapHeight / 2 - verticalOffsetFromEquator;

  return { x, y };
}

/**
 * @param {number} degrees
 */
function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function renderPointer(x, y) {
  const pointer = document.createElement("span");
  pointer.classList.add("pointer");
  pointer.style.left = `${x}px`;
  pointer.style.top = `${y}px`;
  pointersContainer.appendChild(pointer);
}
