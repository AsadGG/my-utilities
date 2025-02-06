export default function hexToRgb(hexColor: string) {
  const fullHexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
  const fullHexResult = fullHexRegex.exec(hexColor);
  if (fullHexResult) {
    const r = parseInt(fullHexResult[1], 16);
    const g = parseInt(fullHexResult[2], 16);
    const b = parseInt(fullHexResult[3], 16);
    return `${r}, ${g}, ${b}`;
  }
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const shorthandResult = shorthandRegex.exec(hexColor);
  if (shorthandResult) {
    const r = parseInt(shorthandResult[1] + shorthandResult[1], 16);
    const g = parseInt(shorthandResult[2] + shorthandResult[2], 16);
    const b = parseInt(shorthandResult[3] + shorthandResult[3], 16);
    return `${r}, ${g}, ${b}`;
  }

  const error = new Error(`${hexColor} is invalid hex color`);

  console.error('error :>> ', error);

  return `0, 0, 0`;
}
