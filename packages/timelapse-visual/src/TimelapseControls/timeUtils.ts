// Converts the time interval to a step value
export const intervalToStep = (timeInterval: string): number => {
  let step = 1000 * 60 * 60 * 24;
  switch (timeInterval) {
    case "1sec":
      step = 1000;
      break;
    case "1min":
      step = 1000 * 60;
      break;
    case "15min":
      step = 1000 * 15 * 60;
      break;
    case "30min":
      step = 1000 * 30 * 60;
      break;
    case "days":
      step = 1000 * 60 * 60 * 24;
      break;
    case "hours":
      step = 1000 * 60 * 60;
      break;
    case "years":
      step = 1000 * 60 * 60 * 24 * 365;
      break;
    default:
      step;
  }
  return step;
};