import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface AverageData {
    portfolio: string;
    averageEnergy: number;
}

interface BerAveChartOptionProps {
    averages: AverageData[];
    style?: React.CSSProperties;
}

const BerAveChartOption: React.FC<BerAveChartOptionProps> = ({ averages, style }) => {
    const chartOptions = {
        chart: {
            type: "bar",
        },
        title: {
            text: "Average Energy Consumption per Portfolio",
        },
        xAxis: {
            categories: averages.map((average) => average.portfolio),
            title: {
                text: "Portfolio",
            },
        },
        yAxis: {
            title: {
                text: "Average Energy Consumption",
            },
        },
        series: [
            {
                name: "Average Energy Consumption",
                data: averages.map((average) => average.averageEnergy),
            },
        ],
    };

    return (
        <div className="charts" style={style}>
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
            />
        </div>
    );
};

export default BerAveChartOption;
