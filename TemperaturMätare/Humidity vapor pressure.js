document.addEventListener("DOMContentLoaded", function() {

    var ctx = document.getElementById('humidityVaporPressure').getContext('2d');
    const firebaseConfig = {

        apiKey: "AIzaSyDYfFFPXiXnRyBhPBPTwkn_Jazn3GoLS1I",
      
        authDomain: "seriousley-the-real-real-one.firebaseapp.com",
      
        databaseURL: "https://seriousley-the-real-real-one-default-rtdb.europe-west1.firebasedatabase.app",
      
        projectId: "seriousley-the-real-real-one",
      
        storageBucket: "seriousley-the-real-real-one.firebasestorage.app",
      
        messagingSenderId: "225254089770",
      
        appId: "1:225254089770:web:8edfb9852b2051ccf40f53"
      
      };

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        const database = firebase.database();

    function calculateSaturationVaporPressure(T) {
        return 6.112 * Math.exp((17.67 * T) / (T + 243.5));
    }


    function calculateVaporPressure(RH, T) {
        const e_s = calculateSaturationVaporPressure(T);
        return (RH / 100) * e_s;
    }

    var humidityData = [18,18,18,18,18,18,18,18,18];
    var labels = ["^","*","^","*","^","*","^","*","^"];
    var humidityChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Humidity Vapor Pressure',
                data: humidityData,
                backgroundColor: 'rgba(99, 255, 255, 0.2)',
                borderColor: 'rgba(99, 255, 255, 1)',
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
                        text: 'Humidity hPa '
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

        function updateVaporPressure() {
            const environmentRef = database.ref('environment');
            
            environmentRef.once('value', (snapshot) => {
                const data = snapshot.val();

                if (data) {
                    const temperature = data.temperature;
                    const humidity = data.humidity; 

                    const vaporPressure = calculateVaporPressure(humidity, temperature);
                    console.log('Vapor Pressure:', vaporPressure);

                    humidityData.push(vaporPressure);
                    humidityData.shift();
                    humidityChart.update();
                } else {
                    console.log("Error fetching data from Firebase  >:[");
                }
            });
        }
    setInterval(updateVaporPressure, 12000);
});