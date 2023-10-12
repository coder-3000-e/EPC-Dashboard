# EPC Dashboard

## Table of Contents
- [Description](#description)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Additional Resources](#additional-resources)

## Description
The EPC Dashboard is a comprehensive tool designed to provide insightful information and visualizations for Energy Performance Certificates (EPCs) of buildings. It enables users to easily access and analyze crucial EPC data, including building name, location, certificate number, grade, building energy performance, 2021 benchmark, net floor area, and the percentage distribution per energy source.

**Key Features:**

- **Benchmark Analysis:** The program calculates and displays the target reduction needed to reach the benchmark. If a building's energy performance is higher than the benchmark, it shows the required kWh reduction. If it's lower, it displays "N/A."

- **Target Reduction Details:** The program presents the target reduction both as a percentage and in kWh, helping users understand the energy-saving goals.

- **Portfolio Insights:** Users can view the average Building Energy Performance (BEP) for a portfolio, gaining a holistic view of energy efficiency across multiple buildings.

- **EPC Grade Distribution:** A pie chart illustrates the distribution of EPC grades and their proportions within the selected portfolio, making it easy to identify the grade distribution.

- **Average BEP Visualization:** A bar chart showcases the average building energy performance, allowing users to compare and assess the energy efficiency of individual buildings.

- **Interactive Filtering:** Users can filter the data by portfolio, and the pie chart and bar chart automatically update to reflect the grading distribution and BEP for the selected portfolio.

The program leverages Highcharts to provide visually appealing and interactive data visualizations, enhancing the user experience and facilitating data-driven decision-making.

## Requirements
To run the EPC Dashboard, ensure that you have the following software and tools installed on your system:

- [.NET 6.0](https://dotnet.microsoft.com/en-us/download/dotnet/6.0)
- [Node.js and npm (Node Package Manager)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Git](https://git-scm.com/downloads)

## Getting Started
Follow these steps to set up and run the EPC Dashboard:

1. **Install .NET 6:**
   - Visit [this link](https://dotnet.microsoft.com/en-us/download/dotnet/6.0) and follow the installation instructions to install .NET 6.

2. **Install Git:**
   - If you haven't already, download and install Git from [here](https://git-scm.com/downloads).

3. **Clone or Download the Repository:**
   - Use one of the following methods to obtain the project:
     - Clone the repository with Git:
       ```bash
       git clone https://github.com/coder-3000-e/RMT.git
       ```
     - Alternatively, you can download the repository as a ZIP file by clicking the "Download" button on the GitHub repository's main page. Once downloaded, extract the ZIP archive to a location of your choice on your local machine.

4. **Navigate to the Project Directory:**
   - Open your terminal and navigate to the project's root directory.

5. **Run the Backend:**
   - Navigate to the `server/rmt` directory in your terminal and execute the following commands:
     ```bash
     cd rmt
     dotnet restore
     dotnet build
     dotnet run
     ```

6. **Run the Frontend:**
   - Navigate to the `client` directory and run the following commands:
     ```bash
     npm install
     npm start
     ```

7. **View in the Browser:**
   - Open your web browser and visit [http://localhost:3000](http://localhost:3000) to access the EPC Dashboard.

## Additional Resources
For more information and detailed installation guides, you can refer to the following resources:

- [Installing .NET 6](https://dotnet.microsoft.com/en-us/download/dotnet/6.0)
- [Installing Git](https://git-scm.com/downloads)
- [Installing npm with Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [How to Clone a GitHub Repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
