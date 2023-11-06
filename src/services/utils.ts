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

export {
  getError,
};