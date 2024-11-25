document.addEventListener("DOMContentLoaded", function() {
    var ctx = document.getElementById('humidityChart').getContext('2d');
    var humidityData = [50,50,50,50,50,50];
    var labels = [1,2,3,4,5,6,7,8,9,10];
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

    var humidityChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels, 
            datasets: [{
                label: 'Humidity',
                data: humidityData,
                backgroundColor: 'rgba(99, 255, 132, 0.2)',
                borderColor: 'rgba(99, 255, 132, 1)',
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
                        text: 'Humidity %'
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

    function updateHumidity() {
        const enviroment = database.ref("environment");
    
        enviroment.once('value', (snapshot) => {
            const data = snapshot.val();
    
            if (data) {
                let newHumidity = data.humidity;
                if (newHumidity !== undefined) {
                    humidityData.push(newHumidity);
                    humidityData.shift();
                    humidityChart.update();
                } else {
                    console.log("Humidity field is missing in the data");
                }
            } else {
                console.log("There was a problem fetching the database or data is null");
            }
        });
    }
    setInterval(updateHumidity, 12000);
});