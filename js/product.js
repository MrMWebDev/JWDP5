// API request function
makeRequest = () => {
    return new Promise((resolve, reject) => {
      //   id isretrieved from the querystring searchparm
      const queryString = window.location.search;
      const urlParams = newURLSearchParams(queryString);
      const id = urlParams.get('id');

      let apiRequest = new XMLHttpRequest();
      apiRequest.open('GET', api + id);
      apiRequest.send();
      apiRequest.onreadystatechange = () => {
        if (apiRequest.readyState === 4) {
          if (apiRequest.status === 200) {
            // if ready state and status return success codes resolve promise with response.
            resolve(JSON.parse(apiRequest.response));
          } else {
            // if unsuccessfull reject with arror message.
            reject('Something Went Wrong - API Request Failed!!!');
          }
        }
      }
    });
  }