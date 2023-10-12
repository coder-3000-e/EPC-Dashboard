import { useMemo } from "react";
import { EPCData } from "../const";

export const useAverageEnergyPerPortfolio = (epcData: EPCData[]) => {
  return useMemo(() => {
    if (!epcData || epcData.length === 0) {
      return [];
    }

    const portfolioData: Record<string, { portfolio: string; totalEnergy: number; count: number }> = {};

    epcData.forEach((building) => {
      const portfolio = building.buildingOwner;

      if (!portfolioData[portfolio]) {
        portfolioData[portfolio] = {
          portfolio,
          totalEnergy: 0,
          count: 0,
        };
      }

      portfolioData[portfolio].totalEnergy += parseFloat(building.buildingEnergyPerformance);
      portfolioData[portfolio].count++;
    });

    const averages = Object.values(portfolioData).map((data) => ({
      portfolio: data.portfolio,
      averageEnergy: data.totalEnergy / data.count,
    }));

    return averages;
  }, [epcData]);
};

interface EnergyReductionResult {
  amount: string;
  percentage: string;
}

export const calculateEnergyReduction = (electricityData: EPCData): EnergyReductionResult => {
  const benchmark = parseFloat(electricityData.benchmark);
  const buildingEnergyPerformance = parseFloat(electricityData.buildingEnergyPerformance);

  let energyReductionNeeded: EnergyReductionResult;

  if (buildingEnergyPerformance > benchmark) {
    const reductionAmount = parseFloat(electricityData.variance);
    const reductionPercentage = (reductionAmount / benchmark) * 100;
    energyReductionNeeded = {
      amount: reductionAmount.toString(),
      percentage: reductionPercentage.toFixed(2) + "%"
    };
  } else {
    energyReductionNeeded = {
      amount: "N/A",
      percentage: "N/A"
    };
  }

  return energyReductionNeeded;
}