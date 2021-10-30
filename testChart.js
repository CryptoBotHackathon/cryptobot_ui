async function graph(timeStamps) {

    const options = {day: 'numeric', month: 'long'};

    let date = timeStamps.map((a) => a.transactionDate.substring(0, 10));

    let value = timeStamps.map((a) => a.amount);

    let operation = timeStamps.map((a) => a.operation);

    console.log(operation);
   
    for(let i = 0;i<=value.length; i++){
        if(operation[i] == 1){
            value[i] = value[i] * -1;
        }    
    }
    let saldo = 0;
    for(let i = 0; i<=value.length; i++){
        if(operation[i] == 1){
            saldo = saldo - value;
        }
        else if(operation[i] == 0){
            saldo = saldo + value;
        }
    }
    console.log(saldo);
    


    // Balance
    const ctx = document.getElementById('balance');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: date,
            datasets: [{
                label: "Bewegung",
                data: value,
                backgroundColor: 'rgb(0, 99, 132)',
                borderColor: 'rgb(0, 99, 132)'
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    // Cryptocompare
    let generalArr = [];
    generalArr = timeStamps.map((b) => b.coinName);

    let BitCoinCounter = 0;
    for (let i = 0; i <= generalArr.length; i++) {
        if (generalArr[i] == "BTC") {
            BitCoinCounter = BitCoinCounter + 1;
        }
    }
    let BitCoinUSDCounter = 0;
    for (let i = 0; i <= generalArr.length; i++) {
        if (generalArr[i] == "BTC-USD") {
            BitCoinUSDCounter = BitCoinUSDCounter + 1;
        }
    }

    const cty = document.getElementById('cryptoCompare');
    const cryptoCompareChart = new Chart(cty, {
        type: 'bar',
        data: {
            labels: ["BitCoin", "Bitcoin-USD"],
            datasets: [{
                label: "Anzahl Aktionen",
                data: [BitCoinCounter, BitCoinUSDCounter],
                backgroundColor: ['rgb(0, 99, 132)', 'rgb(250, 99, 132)'],
                borderColor: ['rgb(0, 99, 132)', 'rgb(250, 99, 132)']
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                },
                x: {
                    beginAtZero: true
                }
            }
        }

    });
}


fetch(`https://cryptobot-api-hackathon.herokuapp.com/payments`)
    .then(res => res.json())
    .then((data)=> {
        graph(data)
    })
