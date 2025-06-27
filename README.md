# 🏅 OlympicGamesStarter

This application displays Olympic Games data with visualizations and statistics.

## Project Overview

OlympicGamesStarter is a dashboard built with Angular that visualizes countries' participation in the Olympic Games, including medal counts and participation history.

## 🛠️ Technologies Used

- **Angular 18**
- **SCSS**
- **[ngx-charts](https://swimlane.github.io/ngx-charts/)** – for interactive charts and graphs

## How it works

The app loads a list of Olympic participations per country and displays:

- 🥇 **A pie chart** showing the number of medals per country
- 📊 **Global statistics**, including:
  - Total number of Olympic Games (JOs)
  - Total number of participating countries

When a country is selected from the chart:

- 🗂️ A **detailed view** shows:
  - The years the country participated
  - Number of athletes
  - Medals earned per year (in a line chart)

## 🚀 How to run the application

### 1. Install dependencies

Run this command in the root folder:
`npm install`

### 2. Start the application

`ng serve`

### 3. Open the application in your browser

At : `http://localhost:4200`
