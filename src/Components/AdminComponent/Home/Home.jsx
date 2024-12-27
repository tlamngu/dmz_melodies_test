import React from 'react'
import GridContent from '/src/Components/AdminComponent/GridContent/GridContent';
import LineChart from '/src/Components/AnalyticsCard/LineChart/LineChart'
import UniversalChart from '/src/Components/AnalyticsCard/UniChart/UniChart';
import Infographics from '/src/Components/AdminComponent/Infographics/Infographics';
import NotiCenter from '/src/Components/AdminComponent/NotiCenter/NotiCenter';

function Home() {

    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: 'My First Dataset',
                data: [300, 50, 100, 40, 120, 60],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart Example',
            },
        },
    };
    return (
        <GridContent>
            <div className="GridMaxContent">
                <UniversalChart title="Revenue in 24H" chartType="line" data={data} options={options} className="chart-container" />
            </div>
            <div className="GridMaxContent">
                <Infographics
                    data={[{
                        dataHead: "23.6M+ Tracks",
                        description: "150 Tracks waiting for approvement."
                    }, {
                        dataHead: "12M+ Artists",
                        description: "126 joined this month."
                    }, {
                        dataHead: "2M+ Albums",
                        description: "0.16 Album / Artist."
                    }, {
                        dataHead: "No data",
                        description: "placeholder."
                    }

                    ]}
                />

            </div>
            <div className="GridMaxContent">
                <UniversalChart title="Streaming traffics in 24H" chartType="line" data={data} options={options} className="chart-container" />
            </div>
            <div className="GridMaxContent">
                <NotiCenter notis={[
                    {
                        provider: "Content management system",
                        content: "150 Tracks waiting for approvement."
                    },
                    {
                        provider: "Content management system",
                        content: "150 Tracks waiting for approvement."
                    },
                    {
                        provider: "Content management system",
                        content: "150 Tracks waiting for approvement."
                    },
                    {
                        provider: "Content management system",
                        content: "150 Tracks waiting for approvement."
                    },
                    {
                        provider: "Content management system",
                        content: "150 Tracks waiting for approvement."
                    },
                    {
                        provider: "Content management system",
                        content: "150 Tracks waiting for approvement."
                    }
                ]} />
            </div>

        </GridContent>
    )
}

export default Home