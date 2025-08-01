function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!url) {
        reject("URL is required");
      } else {
        resolve(`Data from ${url}`);
      }
    }, 1000);
  });
}

function processData(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!data) {
        reject("Data is required");
      } else {
        resolve(data.toUpperCase());
      }
    }, 1000);
  });
}

const main = async (url) => {
  try {
    const data = await fetchData(url);
    const processedData = await processData(data);
    console.log("Processed Data:", processedData);
  } catch (err) {
    console.error("Error:", err);
  }
};

main("https://example.com");
