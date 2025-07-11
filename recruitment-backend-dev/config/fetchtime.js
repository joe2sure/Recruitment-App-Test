import ntpClient from 'ntp-client';
import axios from 'axios';

async function fetchTime() {
  const maxTime = 180000; // 3 minutes in milliseconds
  const timeout = 5000;   // 5 seconds timeout per HTTP request
  const startTime = Date.now();

  // Try NTP for 3 minutes
  while (Date.now() - startTime < maxTime) {
    try {
      const date = await new Promise((resolve, reject) => {
        ntpClient.getNetworkTime("time.windows.com", 123, (err, date) => {
          if (err) return reject(err);
          resolve(date);
        });
      });

      // NTP succeeded, format the date
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');

      const formattedDate = `${month}/${day}/${year} ${hours}:${minutes}`;
      return formattedDate;
    } catch (error) {
      console.log("Error fetching NTP time, retrying...");
      await new Promise(r => setTimeout(r, 2000)); // wait 2 seconds before retrying
    }
  }

  console.log("NTP failed after 3 minutes. Switching to HTTP API fallback...");

  // Now try HTTP API fallback
  const url = "https://timeapi.io/api/Time/current/zone?timeZone=Africa/Lagos";
  const startHttpTime = Date.now();

  while (Date.now() - startHttpTime < maxTime) {
    try {
      const response = await axios.get(url, { timeout });
      const data = response.data;
      const jointime = `${data.date} ${data.time}`;
      return jointime;
    } catch (error) {
      console.log("Error fetching HTTP API time, retrying...");
      await new Promise(r => setTimeout(r, 2000)); // wait 2 seconds before retrying
    }
  }

  throw new Error("Failed to fetch time after trying NTP and HTTP fallback.");
}


if (import.meta.url === 'file://' + new URL(import.meta.url).pathname) {
  (async () => {
    try {
      const result = await fetchTime();
     
    } catch (error) {
      console.error("Error getting time:", error);
    }
  })();
}

export default fetchTime;
