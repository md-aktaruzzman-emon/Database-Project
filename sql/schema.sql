-- ==========================================
-- DISASTER RELIEF MANAGEMENT SYSTEM 
-- ==========================================

-- -----------------------------------------------------
-- Drop Tables if they exist (in reverse dependency order)
-- -----------------------------------------------------
DROP TABLE IF EXISTS ResourceRequest;
DROP TABLE IF EXISTS Donation;
DROP TABLE IF EXISTS Donor;
DROP TABLE IF EXISTS ImpactedBy;
DROP TABLE IF EXISTS Victim;
DROP TABLE IF EXISTS ReliefCamp;
DROP TABLE IF EXISTS Volunteer;
DROP TABLE IF EXISTS DisasterAction;
DROP TABLE IF EXISTS RescueTeam;
DROP TABLE IF EXISTS Warning;
DROP TABLE IF EXISTS Occurrence;
DROP TABLE IF EXISTS Disaster;
DROP TABLE IF EXISTS Location;
DROP TABLE IF EXISTS Resource;

-- -----------------------------------------------------
-- Table: Location
-- -----------------------------------------------------
CREATE TABLE Location (
    Location_ID VARCHAR(50) PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Division VARCHAR(100) NOT NULL,
    District VARCHAR(100) NOT NULL
);

-- -----------------------------------------------------
-- Table: Disaster
-- -----------------------------------------------------
CREATE TABLE Disaster (
    Disaster_ID VARCHAR(50) PRIMARY KEY,
    DisasterName VARCHAR(150) NOT NULL,
    DisasterType VARCHAR(50) NOT NULL,
    StartDate DATE NOT NULL,
    EndDate DATE,
    Location_ID VARCHAR(50) NOT NULL,
    FOREIGN KEY (Location_ID) REFERENCES Location(Location_ID) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT chk_DisasterDate CHECK (EndDate IS NULL OR EndDate >= StartDate)
);

-- -----------------------------------------------------
-- Table: Occurrence
-- -----------------------------------------------------
CREATE TABLE Occurrence (
    Occurrence_ID VARCHAR(50) PRIMARY KEY,
    Disaster_ID VARCHAR(50) NOT NULL,
    OccurrenceType VARCHAR(100) NOT NULL,
    Level VARCHAR(50), -- e.g., Low, Medium, High, Critical
    ReportedTime TIMESTAMP NOT NULL,
    ResolvedTime TIMESTAMP,
    FOREIGN KEY (Disaster_ID) REFERENCES Disaster(Disaster_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT chk_OccurrenceTime CHECK (ResolvedTime IS NULL OR ResolvedTime >= ReportedTime)
);

-- -----------------------------------------------------
-- Table: Warning
-- -----------------------------------------------------
CREATE TABLE Warning (
    Warning_ID VARCHAR(50) PRIMARY KEY,
    Disaster_ID VARCHAR(50) NOT NULL,
    WarningType VARCHAR(100) NOT NULL,
    Message TEXT NOT NULL,
    WarningDate DATE NOT NULL,
    WarningTime TIME NOT NULL,
    FOREIGN KEY (Disaster_ID) REFERENCES Disaster(Disaster_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table: ReliefCamp
-- -----------------------------------------------------
CREATE TABLE ReliefCamp (
    ReliefCamp_ID VARCHAR(50) PRIMARY KEY,
    Disaster_ID VARCHAR(50) NOT NULL,
    Name VARCHAR(150) NOT NULL,
    Capacity INT CHECK (Capacity >= 0),
    Address VARCHAR(255),
    ContactNumber VARCHAR(20),
    FOREIGN KEY (Disaster_ID) REFERENCES Disaster(Disaster_ID) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table: RescueTeam
-- -----------------------------------------------------
CREATE TABLE RescueTeam (
    Team_ID VARCHAR(50) PRIMARY KEY,
    TeamName VARCHAR(100) NOT NULL,
    TeamLeader VARCHAR(100),
    ContactNumber VARCHAR(20),
    Equipments TEXT,
    Specialization VARCHAR(150)
);

-- -----------------------------------------------------
-- Table: DisasterAction (Junction/Bridge Table)
-- -----------------------------------------------------
CREATE TABLE DisasterAction (
    Disaster_ID VARCHAR(50) NOT NULL,
    Team_ID VARCHAR(50) NOT NULL,
    Task VARCHAR(255) NOT NULL,
    ResponseDate DATE NOT NULL,
    PRIMARY KEY (Disaster_ID, Team_ID),
    FOREIGN KEY (Disaster_ID) REFERENCES Disaster(Disaster_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Team_ID) REFERENCES RescueTeam(Team_ID) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table: Volunteer
-- -----------------------------------------------------
CREATE TABLE Volunteer (
    Volunteer_ID VARCHAR(50) PRIMARY KEY,
    Team_ID VARCHAR(50),
    Name VARCHAR(100) NOT NULL,
    Age INT CHECK (Age >= 18),
    Gender VARCHAR(20),
    Skills TEXT,
    ContactNumber VARCHAR(20),
    FOREIGN KEY (Team_ID) REFERENCES RescueTeam(Team_ID) ON DELETE SET NULL ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table: Victim
-- -----------------------------------------------------
CREATE TABLE Victim (
    Victim_ID VARCHAR(50) PRIMARY KEY,
    ReliefCamp_ID VARCHAR(50),
    Name VARCHAR(100) NOT NULL,
    Age INT CHECK (Age >= 0),
    Gender VARCHAR(20),
    HealthStatus VARCHAR(100),
    FOREIGN KEY (ReliefCamp_ID) REFERENCES ReliefCamp(ReliefCamp_ID) ON DELETE SET NULL ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table: ImpactedBy (Junction/Bridge Table)
-- -----------------------------------------------------
CREATE TABLE ImpactedBy (
    Disaster_ID VARCHAR(50) NOT NULL,
    Victim_ID VARCHAR(50) NOT NULL,
    ReliefCamp_ID VARCHAR(50),
    InjuryStatus VARCHAR(100),
    ReliefType VARCHAR(100), -- e.g., Food, Shelter, Medical
    PRIMARY KEY (Disaster_ID, Victim_ID),
    FOREIGN KEY (Disaster_ID) REFERENCES Disaster(Disaster_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Victim_ID) REFERENCES Victim(Victim_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (ReliefCamp_ID) REFERENCES ReliefCamp(ReliefCamp_ID) ON DELETE SET NULL ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table: Donor
-- -----------------------------------------------------
CREATE TABLE Donor (
    Donor_ID VARCHAR(50) PRIMARY KEY,
    Name VARCHAR(150) NOT NULL,
    Type VARCHAR(50), -- e.g., Individual, Corporate, NGO
    ContactNumber VARCHAR(20),
    Email VARCHAR(100)
);

-- -----------------------------------------------------
-- Table: Resource
-- -----------------------------------------------------
CREATE TABLE Resource (
    Resource_ID VARCHAR(50) PRIMARY KEY,
    ResourceName VARCHAR(100) NOT NULL,
    ResourceType VARCHAR(50), -- e.g., Food, Medicine, Water, Clothing
    QuantityAvailable INT NOT NULL DEFAULT 0 CHECK (QuantityAvailable >= 0),
    Unit VARCHAR(20), -- e.g., kg, liters, boxes, units
    UnitCost DECIMAL(10, 2) NOT NULL DEFAULT 0.00 CHECK (UnitCost >= 0)
);

-- -----------------------------------------------------
-- Table: Donation
-- -----------------------------------------------------
CREATE TABLE Donation (
    Donation_ID VARCHAR(50) PRIMARY KEY,
    Donor_ID VARCHAR(50) NOT NULL,
    Disaster_ID VARCHAR(50),
    Resource_ID VARCHAR(50), -- NULL if financial donation
    DonationType VARCHAR(50) NOT NULL, -- e.g., Financial, Material, Services
    Amount DECIMAL(12, 2) DEFAULT 0.00 CHECK (Amount >= 0),
    DonationDate DATE NOT NULL,
    FOREIGN KEY (Donor_ID) REFERENCES Donor(Donor_ID) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (Disaster_ID) REFERENCES Disaster(Disaster_ID) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (Resource_ID) REFERENCES Resource(Resource_ID) ON DELETE SET NULL ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table: ResourceRequest (Junction/Bridge Table)
-- -----------------------------------------------------
CREATE TABLE ResourceRequest (
    Disaster_ID VARCHAR(50) NOT NULL,
    Resource_ID VARCHAR(50) NOT NULL,
    Quantity INT NOT NULL CHECK (Quantity > 0),
    RequestDate DATE NOT NULL,
    TotalValue DECIMAL(12, 2) DEFAULT 0.00 CHECK (TotalValue >= 0),
    PRIMARY KEY (Disaster_ID, Resource_ID),
    FOREIGN KEY (Disaster_ID) REFERENCES Disaster(Disaster_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Resource_ID) REFERENCES Resource(Resource_ID) ON DELETE RESTRICT ON UPDATE CASCADE
);
