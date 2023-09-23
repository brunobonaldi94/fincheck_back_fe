export function delayInSeconds(sec = 1): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), sec * 1000);
    });
  }
