import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { EPCData } from "../../../const";

interface OptionProps {
    data: EPCData[];
    style?: React.CSSProperties;
}
const PieChart: React.FC<OptionProps> = ({ data, style }) => {

    const gradeCounts: Record<string, number> = {};

    data.forEach((building) => {
        const epcGrade = building.buildingRating;
        if (epcGrade in gradeCounts) {
            gradeCounts[epcGrade] += 1;
        } else {
            gradeCounts[epcGrade] = 1;
        }
    });

    const totalBuildings = data.length;
    const epcGradeData = Object.keys(gradeCounts).map((grade) => ({
        name: grade,
        y: gradeCounts[grade] / totalBuildings,
      }));
      
    const chartOptions = {
        chart: {
            type: "pie",
        },
        title: {
            text: "EPC Grade Proportions",
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: "pointer",
                dataLabels: {
                    enabled: true,
                    format: "<b>{point.name}</b>: {point.percentage:.1f} %",
                },
            },
        },
        series: [
            {
                name: "Proportion",
                colorByPoint: true,
                data:epcGradeData,
            },
        ],
    };

    return <div className="charts" style={style}><HighchartsReact highcharts={Highcharts} options={chartOptions} /></div>;
};

export default PieChart;