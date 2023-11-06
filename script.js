Chart.defaults.font.family = "DM Sans";
Chart.defaults.font.size = 16;

const weekday = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const date = new Date();
let dday = weekday[date.getDay()];
console.log(dday);

const data = fetch("data.json");
getJSON(data);

async function getJSON(data){
    try{
        const response = await fetch("data.json", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();
        //console.log(result);
        length = result.length;

        labels = [];
        values = [];

        for(i = 0; i < length; i++){
            labels.push(result[i].day);
            values.push(result[i].amount);
        }

        new Chart(document.getElementById("barChart"), {
            type: "bar",
            data: {
                labels: labels,
                datasets: [
                    {
                        data: values,
                        backgroundColor: [
                            "rgba(236, 119, 95, 1)",
                            "rgba(236, 119, 95, 1)",
                            "rgba(118, 181, 188, 1)",
                            "rgba(236, 119, 95, 1)",
                            "rgba(236, 119, 95, 1)",
                            "rgba(236, 119, 95, 1)",
                            "rgba(236, 119, 95, 1)"
                        ],
                        hoverBackgroundColor: [
                            "rgba(254,154,135,255)",
                            "rgba(254,154,135,255)",
                            "rgba(181,223,228,255)",
                            "rgba(254,154,135,255)",
                            "rgba(254,154,135,255)",
                            "rgba(254,154,135,255)",
                            "rgba(254,154,135,255)",
                        ],
                        borderRadius: 5,
                        borderSkipped: false,
                    }
                ]
            },
            options: {
                onHover: (event, chartElement) => {
                    event.native.target.style.cursor = chartElement[0] ? "pointer" : "default";
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        //display: false,
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        display: false
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        displayColors: false,
                        callbacks: {
                            label: tooltipItem => `${tooltipItem.yLabel}: ${tooltipItem.xLabel}`,
                            title: () => null,
                            
                            label: function(context){
                                let label = context.dataset.label || "";

                                if(context.parsed.y !== null){
                                    label += new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(context.parsed.y);
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        })


    } catch(error){
        console.error("ERROR", error);
    }
}