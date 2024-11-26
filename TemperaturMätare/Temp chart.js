document.addEventListener("DOMContentLoaded", function() {
    var ctx = document.getElementById('temperatureChart').getContext('2d');
    const firebaseConfig = {

        apiKey: "AIzaSyDYfFFPXiXnRyBhPBPTwkn_Jazn3GoLS1I",
      
        authDomain: "seriousley-the-real-real-one.firebaseapp.com",
      
        databaseURL: "https://seriousley-the-real-real-one-default-rtdb.europe-west1.firebasedatabase.app",
      
        projectId: "seriousley-the-real-real-one",
      
        storageBucket: "seriousley-the-real-real-one.firebasestorage.app",
      
        messagingSenderId: "225254089770",
      
        appId: "1:225254089770:web:8edfb9852b2051ccf40f53"
      
      };
      
      firebase.initializeApp(firebaseConfig);
      const database = firebase.database();
    
    var temperatureData = [23,23,23,23,23,23,23,23,23];
    var labels = ["^","*","^","*","^","*","^","*","^"];

    var temperatureChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels, 
            datasets: [{
                label: 'Temperature in Celcius',
                data: temperatureData,
                backgroundColor: 'rgba(255, 70, 90, 0.2)',
                borderColor: 'rgba(255, 70, 90, 1)',
                borderWidth: 2,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Temperature (°C)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Per 12 Seconds'
                    }
                }
            }
        }
    });

    function updateTempreture() {
        const enviroment = database.ref("environment");
    
        enviroment.once('value', (snapshot) => {
            const data = snapshot.val();
    
            if (data) {
                let newTemperature = data.temperature;
                if (newTemperature !== undefined) {
                    temperatureData.push(newTemperature);
                    temperatureData.shift();
                    temperatureChart.update();
                } else {
                    console.log("Temperature field is missing in the data");
                }
            } else {
                console.log("There was a problem fetching the database or data is null");
            }
        });
    }
    setInterval(updateTempreture, 12000);
});