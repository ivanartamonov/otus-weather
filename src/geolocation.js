const geolocation = {
  getCurrentPosition: () =>
    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (res) => resolve(res.coords),
        (error) => reject(error)
      );
    }),
};

export default geolocation;
