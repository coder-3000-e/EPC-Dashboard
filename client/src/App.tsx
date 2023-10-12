import React, { useEffect, useMemo, useState } from 'react';
import { getAllEPCData } from './functions/axios';
import { EPCData } from './const';
import './App.css';
import { calculateEnergyReduction, useAverageEnergyPerPortfolio } from './functions';
import BerAveChartOption from './components/charts/bepAverage';
import PieChart from './components/charts/pie';
import BEPChartOption from './components/charts/bepBar';
import Filter from './components/search';
import DashBoardModal from './components/modals';

function App() {
  const [epcData, setEpcData] = useState<EPCData[]>([]);
  const [searchOptions, setSearchOptions] = useState<{ buildingOwners: string[]; buildingNames: string[] }>({ buildingOwners: [], buildingNames: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllEPCData();
        setEpcData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredEpcData = useMemo(() => {
    return epcData.filter((building) => {
      const ownerFilter =
        searchOptions.buildingOwners.length === 0 ||
        searchOptions.buildingOwners.includes(building.buildingOwner);
      const nameFilter =
        searchOptions.buildingNames.length === 0 ||
        searchOptions.buildingNames.includes(building.buildingName);

      return ownerFilter && nameFilter;
    });
  }, [epcData, searchOptions]);

  const bepPerPortfolio = useAverageEnergyPerPortfolio(filteredEpcData);

  const chartData = useMemo(() => {
    return filteredEpcData.map((building) => ({
      name: building.buildingName,
      data: building.buildingEnergyPerformance,
    }));
  }, [filteredEpcData]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chartName, setChartName] = useState('');

  const openModal = (chartName: string) => {
    setIsModalOpen(true);
    setChartName(chartName);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <div className='heading'><h1 >EPC dashboard</h1></div>
      <Filter searchOptions={searchOptions} setSearchOptions={setSearchOptions} epcData={epcData} />

      <table id="datatable">
        <thead>
          <tr>
            <th>Building Name</th>
            <th>Building Owner</th>
            <th>Building Address</th>
            <th>Province</th>
            <th>Certificate Number</th>
            <th>Grade</th>
            <th>Building Energy Performance</th>
            <th>Benchmark</th>
            <th>Net Floor Area</th>
            <th>% distribution per energy source</th>
            <th>Target to get to benchmark (%)</th>
            <th>Target to get to benchmark (kWh)</th>
          </tr>
        </thead>
        <tbody>
          {filteredEpcData.map((building, index) => (
            <tr key={index}>
              <td>{building.buildingName}</td>
              <td>{building.buildingOwner}</td>
              <td>{building.buildingAddress}</td>
              <td>{building.province}</td>
              <td>{index}</td>
              <td>{building.buildingRating}</td>
              <td>{building.buildingEnergyPerformance}</td>
              <td>{building.benchmark}</td>
              <td>{building.unadjustedNFA}</td>
              <td>{'50% grid, 20% diesel, 20% gas, 10% solar'}</td>
              <td>{calculateEnergyReduction(building).percentage}</td>
              <td>{calculateEnergyReduction(building).amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='chartDashBoards'>

        <div style={{ display: 'contents' }}><button onClick={() => { openModal('berAve'); }}>View</button><BerAveChartOption averages={bepPerPortfolio} /></div>
        <div style={{ display: 'contents' }}><button onClick={() => { openModal('pie'); }}>View</button><PieChart data={filteredEpcData} /></div>
        <div style={{ display: 'contents' }}><button onClick={() => { openModal('bepChart'); }}>View</button><BEPChartOption chartData={chartData} /></div>
      </div>
      {isModalOpen && chartName === 'berAve' &&
        <DashBoardModal isOpen={isModalOpen} onRequestClose={closeModal} modalComponent={<BerAveChartOption style={{width: 'revert'}} averages={bepPerPortfolio} />} />
      }
      {isModalOpen && chartName === 'pie' &&
        <DashBoardModal isOpen={isModalOpen} onRequestClose={closeModal} modalComponent={<PieChart style={{width: 'revert'}} data={filteredEpcData} />} />
      }
      {isModalOpen && chartName === 'bepChart' &&
        <DashBoardModal isOpen={isModalOpen} onRequestClose={closeModal} modalComponent={<BEPChartOption style={{width: 'revert'}} chartData={chartData} />} />
      }
    </div >
  );
}

export default App;
