<p align="center">
  <img src="images/Banner.png" alt="Disaster Relief Resource Management System Banner" width="100%">
</p>

# Disaster Relief Resource Management System

<p align="center">
  <img src="https://img.shields.io/badge/Database-Microsoft%20SQL%20Server-CC2927?style=for-the-badge&logo=microsoft-sql-server&logoColor=white" alt="Microsoft SQL Server Badge">
  <img src="https://img.shields.io/badge/Language-SQL-0078D4?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQL Language Badge">
  <img src="https://img.shields.io/badge/Domain-Emergency%20Response-red?style=for-the-badge" alt="Emergency Response Domain Badge">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="MIT License Badge">
</p>

---

## 📖 About the Project

The **Disaster Relief Resource Management System** is an enterprise-grade relational database design developed to coordinate and optimize disaster response operations. From large-scale natural disasters (such as floods, cyclones, and earthquakes) to localized emergencies, this system acts as a centralized operational database. 

It manages the complete lifecycle of emergency relief, including real-time disaster tracking, relief camp logistics, victim medical records, rescue team deployment, volunteer coordination, donor contributions, and critical resource allocations.

---

## ⚠️ Problem Statement

Modern disaster management operations suffer from fragmented coordination and data silos. During an emergency:
* **Resource Mismatches:** Critical supplies (medical kits, blankets, water) are often sent to camps that do not need them, while other camps face severe shortages.
* **Coordination Delays:** First responders and volunteer teams are deployed without real-time tracking of their specialization or current assignments.
* **Lack of Transparency:** Donations are difficult to trace to specific relief efforts, reducing donor trust.
* **Communication Bottlenecks:** Warning dissemination lacks structure, failing to associate alerts directly with active occurrences.

Implementing a structured, relational database system solves these challenges by providing a single source of truth, enforcing data integrity constraints, and generating real-time analytics to guide emergency decision-makers.

---

## 🎯 Objectives

* **Optimize Resource Distribution:** Track inventory levels and calculate request values to prevent supply chain bottlenecks.
* **Coordinate Personnel:** Map volunteers to specialized rescue teams (e.g., flood rescue, medical support) and assign them to specific disaster zones.
* **Ensure Operational Transparency:** Maintain audit trails for financial and material donations from NGOs, corporations, and individual donors.
* **Track Victim Well-being:** Record the location, health status, injury details, and shelter occupancy of affected citizens.
* **Establish Early Warning Pipelines:** Connect natural disaster occurrences with targeted warnings and rapid-response actions.

---

## 🛠️ System Features

| Feature Area | Technical Description | Operational Impact |
| :--- | :--- | :--- |
| **Disaster Tracking** | Records start/end dates, location indices, and types of active disasters. | Provides situational awareness and chronological disaster logs. |
| **Resource Logistics** | Tracks available quantities, unit measurements, and cost metrics of critical goods. | Prevents resource hoarding and shortages in camp networks. |
| **Relief Camp Management** | Monitors shelter capacity, occupancy rates, and geographical addresses. | Identifies over-capacity shelters and guides new evacuations. |
| **Victim Registry** | Stores demographic profiles, injury status, and camp assignments. | Enables family reunifications and targeted relief delivery. |
| **Emergency Response** | Manages rescue team allocations, specialized equipment, and volunteer skills. | Streamlines first-responder deployments and task dispatching. |
| **Donation Auditing** | Links financial/resource donations directly to donors and specific disasters. | Restores public and corporate trust through verifiable allocation logs. |
| **Warning Pipeline** | Disseminates message payloads linked to disaster severity levels. | Drives early evacuations and reduces casualties. |

---

## 🏗️ Project Architecture

The database design follows a rigorous conceptual-to-physical implementation pipeline. 

### 1. Entity Relationship (ER) Diagram
The Entity Relationship (ER) Diagram illustrates the conceptual design of the Disaster Relief Resource Management System, showing how entities interact to support emergency response operations. It maps the complex relationships between victims, locations, resources, and coordinators.

<p align="center">
  <img src="images/ER-Diagram.png" alt="Entity Relationship Diagram" width="100%">
</p>

### 2. Database Schema
The Schema Diagram represents the physical implementation of the database, illustrating table structures, primary keys, foreign keys, and relational dependencies. It demonstrates 3NF-compliant design aimed at minimizing redundancy while maintaining referential integrity.

<p align="center">
  <img src="images/Schema-Diagram.png" alt="Database Schema" width="100%">
</p>

> [!TIP]
> **Diagram Styling & Aesthetics:** The diagrams are styled with rounded tables (8px radius), modern typography (Segoe UI), a premium corporate palette (Deep Navy `#1E3A5F`, Slate Blue `#334155`, and Soft Gray borders), and clean orthogonal elbow connectors to ensure maximum readability and professional presentation.

---

## 🗄️ Database Entities & Schema Registry

The database is built on 14 highly normalized tables. Below is the data registry detailing the keys and roles of each entity:

| Table Name | Primary Key | Foreign Keys | Description |
| :--- | :--- | :--- | :--- |
| **`Location`** | `Location_ID` | None | Stores geographical coordinates (Division, District, Name). |
| **`Disaster`** | `Disaster_ID` | `Location_ID` | Records the profile, dates, and region of a disaster event. |
| **`Resource`** | `Resource_ID` | None | Inventory of relief materials (Food, Water, Medical kits, Tents). |
| **`ResourceRequest`** | `(Disaster_ID, Resource_ID)` | `Disaster_ID`, `Resource_ID` | Tracks material requests, quantities, and calculated costs. |
| **`Donor`** | `Donor_ID` | None | Profile of supporting entities (NGOs, Corporates, Individuals). |
| **`Donation`** | `Donation_ID` | `Donor_ID`, `Disaster_ID`, `Resource_ID` | Records cash or material donations linked to specific relief campaigns. |
| **`RescueTeam`** | `Team_ID` | None | Emergency units containing contact data and equipment listings. |
| **`Volunteer`** | `Volunteer_ID` | `Team_ID` | Demographics and special skills of volunteers assigned to teams. |
| **`DisasterAction`** | `(Disaster_ID, Team_ID)` | `Disaster_ID`, `Team_ID` | Tracks response actions, tasks, and team response dates. |
| **`ReliefCamp`** | `ReliefCampID` | `DisasterID` | Shelters opened to support victims of specific disasters. |
| **`Victim`** | `Victim_ID` | `ReliefCamp_ID` | Stores personal profiles and general health statuses of victims. |
| **`ImpactedBy`** | `(Disaster_ID, Victim_ID, ReliefCamp_ID)` | `Disaster_ID`, `Victim_ID`, `ReliefCamp_ID` | Records specific injuries and relief types provided to victims. |
| **`Warning`** | `Warning_ID` | `Disaster_ID` | Stores early warnings, timestamps, and message payloads. |
| **`Occurrence`** | `Occurrence_ID` | `Disaster_ID` | Tracks meteorological or localized disaster occurrences. |

---

## ⚡ SQL Core Features & Implementations

This project implements advanced SQL features to ensure fast execution and data consistency.

### 1. Database Objects
* **Tables & Constraints:** Formed using primary keys, identity columns, and foreign keys with cascading options to enforce referential integrity.
* **Views:** Encapsulates complex JOIN operations to expose simplified, read-only representations of operational data.
* **Triggers:** Automated event listeners running post DML operations (`INSERT`, `UPDATE`) to enforce temporal constraints and integrity rules.
* **Stored Procedures:** Parametric routines to fetch customized transaction reports while shielding underlying tables.

### 2. DDL & DML Operations Included
* **Advanced Joins:** `INNER JOIN` operations to compile multi-table datasets (e.g., matching disasters with locations).
* **Aggregation & Grouping:** Usage of `SUM`, `AVG`, `COUNT`, `MIN`, `MAX` alongside `GROUP BY` and `HAVING` clauses for resource auditing.
* **Correlated Subqueries & Exists:** Optimizes checking routines (e.g., verifying if a disaster has open camps).
* **Set Operations:** `UNION` queries to merge datasets (e.g., volunteer lists with individual donor lists).

---

## ⚙️ Advanced Database Objects

### View: Disaster Location Details
```sql
CREATE VIEW Disaster_Location_Details_View AS
SELECT 
    D.DisasterName,
    D.DisasterType,
    D.StartDate,
    D.EndDate,
    L.Name AS Location_Name,
    L.Division,
    L.District
FROM Disaster D
JOIN Location L
ON D.Location_ID = L.Location_ID;
