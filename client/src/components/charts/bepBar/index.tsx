import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface ChartOptionProps {
    chartData: {
        name: string;
        data: string;
    }[];
    style?: React.CSSProperties;
}

const BEPChartOption: React.FC<ChartOptionProps> = ( {chartData, style}) => {
    const chartOptions = {
        chart: {
            type: 'bar',
        },
        accessibility: {
            enabled: true,
        },
        title: {
            text: 'Building Energy Performance',
        },
        xAxis: {
            categories: chartData.map((dataPoint) => dataPoint.name),
            title: {
                text: 'Buildings',
            },
            gridLineWidth: 1,
            lineWidth: 0,
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Energy Performance',
            },
            labels: {
                overflow: 'justify',
            },
            gridLineWidth: 0,
        },
        tooltip: {
            valueSuffix: 'Kwh',
        },
        plotOptions: {
            bar: {
                borderRadius: 20,
                dataLabels: {
                    enabled: true,
                },
            },
        },
        credits: {
            enabled: false,
        },
        series: [
            {
                name: 'Building Energy Performance (BEP) kWh/sqm.annum',
                data: chartData.map((dataPoint) => Number(dataPoint.data)),
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

export default BEPChartOption;