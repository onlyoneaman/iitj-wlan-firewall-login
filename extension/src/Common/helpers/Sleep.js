async function Sleep(timeInMS) {
  return new Promise(resolve => setTimeout(resolve, timeInMS));
}

export default Sleep