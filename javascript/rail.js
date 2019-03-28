// Station Codes
// "https://docs.google.com/spreadsheets/d/13Kz-v3Yjn6ork9vXyl8KLSgzf7KYuGNP9d7HPMd-Kzc/pub?hl=en&single=true&gid=0&output=html"


//keeping the configstation seperate, just in case need to change them in the future
const configstation = {
  _APIKEY_: "c629ce7c-43c5-4e4f-81e6-2d70dcc42759",
  qURL: "https://dcmetrohero.com/api/v1/"
};

//the urls for query url, for hot-switching
//Any undefined MUST be defined/given value, or it won't work.
const apiTypes = {
  trainURL: "metrorail/trains/",
  trainMetrics: "metrorail/metrics",
  trips: {
    // metrorail/trips/{fromStationCode}/{toStationCode}
    fromStation: undefined,
    toStation: undefined,
    url: "metrorail/trips/"
  },
  tweets: "metrorail/tweets/",
  trainReports: "metrorail/trains/tags/",
  indTrainReports: {
    trainId: undefined,
    url: "metrorail/trains/" + this.trainId + "/tags/"
  }
};

// Get train info
$.ajax({
  type: "GET",
  url: configstation.qURL + apiTypes.trainURL,
  contentType: "application/json",
  xhrFields: {
    withCredentials: false
  },
  headers: {
    apiKey: configstation._APIKEY_
  }
}).then(res => {
  console.log(res);
});