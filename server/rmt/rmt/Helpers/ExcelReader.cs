using System;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using rmt.Models;

namespace rmt.Helpers
{
    public class ExcelReader
    {
        public List<EPCData> ReadExcelFile(string filePath)
        {
            List<EPCData> epcDataList = new List<EPCData>();

            using (FileStream fs = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
            {
                using (SpreadsheetDocument spreadsheetDocument = SpreadsheetDocument.Open(fs, false))
                {
                    var workbookPart = spreadsheetDocument.WorkbookPart;
                    var sharedStringTablePart = workbookPart?.GetPartsOfType<SharedStringTablePart>().FirstOrDefault();
                    var sharedStringTable = sharedStringTablePart?.SharedStringTable;

                    var worksheetPartFirst = workbookPart?.WorksheetParts.First();
                    var workSheet = worksheetPartFirst?.Worksheet;

                    var rows = workSheet.Descendants<Row>();

                    bool isFirstRow = true;

                    foreach (Row row in rows)
                    {
                        if (isFirstRow)
                        {
                            isFirstRow = false;
                            continue;
                        }

                        List<string> cellValues = new List<string>();

                        foreach (Cell cell in row.Elements<Cell>())
                        {
                            if ((cell.DataType != null) && (cell.DataType == CellValues.SharedString))
                            {
                                var ssid = int.Parse(cell.CellValue.Text);
                                var str = sharedStringTable.ChildElements[ssid].InnerText;
                                cellValues.Add(str);
                            }
                            else if (cell.CellValue != null)
                            {
                                cellValues.Add(cell.CellValue.Text);
                            }
                        }

                        EPCData buildingData = new EPCData
                        {
                            BuildingName = cellValues[0],
                            BuildingOwner = cellValues[1],
                            BuildingAddress = cellValues[2],
                            Province = cellValues[3],
                            OccupancyClass = cellValues[4],
                            ClimaticZone = cellValues[5],
                            TotalConstructedArea = cellValues[6],
                            UnadjustedNFA = cellValues[7],
                            TotalEnergyConsumption = cellValues[8],
                            Benchmark = cellValues[9],
                            BuildingEnergyPerformance = cellValues[10],
                            Variance = cellValues[11],
                            MultipleOfReferenceValue = cellValues[12],
                            BuildingRating = cellValues[13]
                        };

                        epcDataList.Add(buildingData);
                    }
                }
            }

            return epcDataList;
        }
    }
}
