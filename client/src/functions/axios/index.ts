import axios from 'axios';
import { EPCData } from '../../const';

export const getAllEPCData = async (): Promise<EPCData[]> => {
  try {
    const response = await axios.get('http://localhost:5000/api/EPC/getAll');

    if (response.status === 200) {
      return response.data as EPCData[];
    } else {
      console.error('Unexpected status code:', response.status);
      return [];
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export const getAllEPCDataByFilter = async (name?: string, buildingOwner?: string): Promise<EPCData[]> => {
  try {
    const params = new URLSearchParams();
    if (name) {
      params.append('buildingName', name);
    }
    if (buildingOwner) {
      params.append('buildingOwner', buildingOwner);
    }

    const url = 'https://localhost:7230/api/EPC/filter';
    const response = await axios.get(url, { params });

    if (response.status === 200) {
      return response.data as EPCData[];
    } else {
      console.error('Unexpected status code:', response.status);
      return [];
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
