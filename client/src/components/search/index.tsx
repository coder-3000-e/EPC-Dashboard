import { EPCData } from "../../const";
import "./style.css";


interface FilterProps {
    searchOptions: {
        buildingOwners: string[];
        buildingNames: string[];
    };
    setSearchOptions: React.Dispatch<React.SetStateAction<{
        buildingOwners: string[];
        buildingNames: string[];
    }>>;
    epcData: EPCData[];
}

const Filter: React.FC<FilterProps> = ({ searchOptions, setSearchOptions, epcData }) => {

    return (
        <div className="filter-border">
            <div>
                <label>Select Building Owners:</label>
                <select className="filter"
                    multiple={true}
                    onChange={(e) =>
                        setSearchOptions({
                            ...searchOptions,
                            buildingOwners: Array.from(
                                e.target.selectedOptions,
                                (option) => option.value
                            ),
                        })
                    }
                >
                    {Array.from(new Set(epcData.map((building) => building.buildingOwner)).values()).map((owner: string) => (
                        <option key={owner} value={owner}>
                            {owner}
                        </option>
                    ))}
                </select>
            </div>

            <button className="btn" onClick={() => {
                setSearchOptions({
                    buildingOwners: [],
                    buildingNames: [],
                });

                const selectElements = document.querySelectorAll('select.filter');
                selectElements.forEach((selectElement) => {
                    const select = selectElement as HTMLSelectElement;
                    select.selectedIndex = -1;
                });
            }}>Reset</button>

            <div>
                <label>Select Building Names:</label>
                <select
                    multiple={true}
                    className='filter'
                    onChange={(e) =>
                        setSearchOptions({
                            ...searchOptions,
                            buildingNames: Array.from(
                                e.target.selectedOptions,
                                (option) => option.value
                            ),
                        })
                    }
                >
                    {Array.from(new Set(epcData.map((building) => building.buildingName)).values()).map((name: string) => (
                        <option key={name} value={name}>
                            {name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default Filter;