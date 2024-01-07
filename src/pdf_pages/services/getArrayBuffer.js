function getArrayBuffer(fileUrl) {
  return fetch(fileUrl).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.arrayBuffer();
  });
}

export default getArrayBuffer;
