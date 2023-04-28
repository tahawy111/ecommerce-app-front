export const getError = (error:any) => {
    return error.response && error.response.data.msg
      ? error.response.data.msg
      : error.msg || error;
  };