const getError = (error: Error | Response) => {
  if (error instanceof Response) {
    switch (error.status) {
      case 404:
        return 'The resource wasn´t found';
      default:
        return 'There was an error with your request, try again';
    }
  } else if (error instanceof Error) {
    return error.message;
  }
  return 'There was an error with your request, try again';
}

const setLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
}

const getLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return undefined;
}

export {
  getError,
  setLocalStorage,
  getLocalStorage
};