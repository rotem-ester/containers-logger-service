function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function demo() {
    // Sleep in loop
    for (let i = 0; i < 120; i++) {
        await sleep(60000);
        console.log(`log num: ${i}`)
        console.error(`error num: ${i}`)
    }
  }
  
  demo();