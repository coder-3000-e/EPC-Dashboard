using System.Collections.Immutable;
using Microsoft.AspNetCore.Mvc;
using rmt.Helpers;
using rmt.Models;

namespace rmt.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EPCController : ControllerBase
    {
        private readonly ILogger<EPCController> _logger;
        private ExcelReader excelReader = new ExcelReader();
        private ImmutableList<EPCData> epcData;
        private readonly string filePath = @"Data\EPC dummy(demo) data.xlsx";

        public EPCController(ILogger<EPCController> logger)
        {
            var path = Path.GetFullPath(filePath);
            _logger = logger;
            epcData = excelReader.ReadExcelFile(path).ToImmutableList();
        }

        [HttpGet("getAll")]
        public ActionResult<ImmutableList<EPCData>> GetAll()
        {
            return epcData;
        }

        [HttpGet("filter")]
        public ActionResult<ImmutableList<EPCData>> FilteredResponse([FromQuery] string buildingName, [FromQuery] string buildingOwner)
        {
            if (string.IsNullOrEmpty(buildingName) && string.IsNullOrEmpty(buildingOwner))
            {
                return Ok(epcData);
            }
            var filteredData = epcData
                .Where(data =>
                    (string.IsNullOrEmpty(buildingName) || data.BuildingName.Contains(buildingName, StringComparison.OrdinalIgnoreCase)) &&
                    (string.IsNullOrEmpty(buildingOwner) || data.BuildingOwner.Contains(buildingOwner, StringComparison.OrdinalIgnoreCase)))
                .ToImmutableList();

            if (filteredData.Count == 0)
            {
                return NotFound("No matching records found.");
            }

            return Ok(filteredData);
        }
    }
}
