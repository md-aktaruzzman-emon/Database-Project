// ==========================================================================
// DISASTER RELIEF MANAGEMENT SYSTEM (DRMS)
// Interactive Dashboard Logic
// ==========================================================================

// --- Database Schema Specifications Catalog ---
const schemaCatalog = {
    Location: {
        group: "Disaster Tracking",
        description: "Geographic classification of disaster zones and operational centers.",
        ddl: `CREATE TABLE Location (
    Location_ID VARCHAR(50) PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Division VARCHAR(100) NOT NULL,
    District VARCHAR(100) NOT NULL
);`,
        columns: [
            { name: "Location_ID", type: "VARCHAR(50)", key: "PK", notes: "Primary key. Unique location code." },
            { name: "Name", type: "VARCHAR(100)", key: "", notes: "NOT NULL. City, municipal, or point name." },
            { name: "Division", type: "VARCHAR(100)", key: "", notes: "NOT NULL. Administrative state/province division." },
            { name: "District", type: "VARCHAR(100)", key: "", notes: "NOT NULL. District region categorizations." }
        ]
    },
    Disaster: {
        group: "Disaster Tracking",
        description: "Central logs of registered disaster events tracking timelines and general regions.",
        ddl: `CREATE TABLE Disaster (
    Disaster_ID VARCHAR(50) PRIMARY KEY,
    DisasterName VARCHAR(150) NOT NULL,
    DisasterType VARCHAR(50) NOT NULL,
    StartDate DATE NOT NULL,
    EndDate DATE,
    Location_ID VARCHAR(50) NOT NULL,
    FOREIGN KEY (Location_ID) REFERENCES Location(Location_ID) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT chk_DisasterDate CHECK (EndDate IS NULL OR EndDate >= StartDate)
);`,
        columns: [
            { name: "Disaster_ID", type: "VARCHAR(50)", key: "PK", notes: "Primary key. Unique disaster code." },
            { name: "DisasterName", type: "VARCHAR(150)", key: "", notes: "NOT NULL. Official classification (e.g. Cyclone Amphan)." },
            { name: "DisasterType", type: "VARCHAR(50)", key: "", notes: "NOT NULL. Category (e.g. Flood, Earthquake, Wildfire)." },
            { name: "StartDate", type: "DATE", key: "", notes: "NOT NULL. Initial strike date." },
            { name: "EndDate", type: "DATE", key: "", notes: "Nullable. Date when operations subsided." },
            { name: "Location_ID", type: "VARCHAR(50)", key: "FK", notes: "References Location(Location_ID). Cascade updates, restrict deletes." }
        ]
    },
    Occurrence: {
        group: "Disaster Tracking",
        description: "Checkpoints cataloging stages, critical severity levels, and resolution states.",
        ddl: `CREATE TABLE Occurrence (
    Occurrence_ID VARCHAR(50) PRIMARY KEY,
    Disaster_ID VARCHAR(50) NOT NULL,
    OccurrenceType VARCHAR(100) NOT NULL,
    Level VARCHAR(50),
    ReportedTime TIMESTAMP NOT NULL,
    ResolvedTime TIMESTAMP,
    FOREIGN KEY (Disaster_ID) REFERENCES Disaster(Disaster_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT chk_OccurrenceTime CHECK (ResolvedTime IS NULL OR ResolvedTime >= ReportedTime)
);`,
        columns: [
            { name: "Occurrence_ID", type: "VARCHAR(50)", key: "PK", notes: "Primary key." },
            { name: "Disaster_ID", type: "VARCHAR(50)", key: "FK", notes: "References Disaster(Disaster_ID). Cascade deletes/updates." },
            { name: "OccurrenceType", type: "VARCHAR(100)", key: "", notes: "NOT NULL. Nature of occurrence or development phase." },
            { name: "Level", type: "VARCHAR(50)", key: "", notes: "Severity tier (e.g. Critical, High, Medium, Low)." },
            { name: "ReportedTime", type: "TIMESTAMP", key: "", notes: "NOT NULL. Precise alert timestamp." },
            { name: "ResolvedTime", type: "TIMESTAMP", key: "", notes: "Nullable. Resolution timestamp." }
        ]
    },
    Warning: {
        group: "Disaster Tracking",
        description: "Official bulletins and public announcements generated for active disaster threats.",
        ddl: `CREATE TABLE Warning (
    Warning_ID VARCHAR(50) PRIMARY KEY,
    Disaster_ID VARCHAR(50) NOT NULL,
    WarningType VARCHAR(100) NOT NULL,
    Message TEXT NOT NULL,
    WarningDate DATE NOT NULL,
    WarningTime TIME NOT NULL,
    FOREIGN KEY (Disaster_ID) REFERENCES Disaster(Disaster_ID) ON DELETE CASCADE ON UPDATE CASCADE
);`,
        columns: [
            { name: "Warning_ID", type: "VARCHAR(50)", key: "PK", notes: "Primary key." },
            { name: "Disaster_ID", type: "VARCHAR(50)", key: "FK", notes: "References Disaster(Disaster_ID). Cascade deletes/updates." },
            { name: "WarningType", type: "VARCHAR(100)", key: "", notes: "NOT NULL. Warning category (e.g. Red Alert, Evacuation Order)." },
            { name: "Message", type: "TEXT", key: "", notes: "NOT NULL. Content text detailing emergency actions." },
            { name: "WarningDate", type: "DATE", key: "", notes: "NOT NULL. Issuing date." },
            { name: "WarningTime", type: "TIME", key: "", notes: "NOT NULL. Issuing time." }
        ]
    },
    RescueTeam: {
        group: "Rescue & Operations",
        description: "Emergency responders, disaster management personnel, and military rescue teams.",
        ddl: `CREATE TABLE RescueTeam (
    Team_ID VARCHAR(50) PRIMARY KEY,
    TeamName VARCHAR(100) NOT NULL,
    TeamLeader VARCHAR(100),
    ContactNumber VARCHAR(20),
    Equipments TEXT,
    Specialization VARCHAR(150)
);`,
        columns: [
            { name: "Team_ID", type: "VARCHAR(50)", key: "PK", notes: "Primary Key." },
            { name: "TeamName", type: "VARCHAR(100)", key: "", notes: "NOT NULL. Squad name identifier." },
            { name: "TeamLeader", type: "VARCHAR(100)", key: "", notes: "Commanding officer or point of contact." },
            { name: "ContactNumber", type: "VARCHAR(20)", key: "", notes: "Emergency communication line." },
            { name: "Equipments", type: "TEXT", key: "", notes: "Summarized list of heavy equipment assigned (e.g. Boats, Drones)." },
            { name: "Specialization", type: "VARCHAR(150)", key: "", notes: "Primary capability (e.g. Flood Extraction, Hazmat)." }
        ]
    },
    DisasterAction: {
        group: "Rescue & Operations",
        description: "Junction table mapping operational tasks assigned to specific Rescue Teams for disasters.",
        ddl: `CREATE TABLE DisasterAction (
    Disaster_ID VARCHAR(50) NOT NULL,
    Team_ID VARCHAR(50) NOT NULL,
    Task VARCHAR(255) NOT NULL,
    ResponseDate DATE NOT NULL,
    PRIMARY KEY (Disaster_ID, Team_ID),
    FOREIGN KEY (Disaster_ID) REFERENCES Disaster(Disaster_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Team_ID) REFERENCES RescueTeam(Team_ID) ON DELETE RESTRICT ON UPDATE CASCADE
);`,
        columns: [
            { name: "Disaster_ID", type: "VARCHAR(50)", key: "PK, FK", notes: "Part of composite PK. References Disaster(Disaster_ID)." },
            { name: "Team_ID", type: "VARCHAR(50)", key: "PK, FK", notes: "Part of composite PK. References RescueTeam(Team_ID)." },
            { name: "Task", type: "VARCHAR(255)", key: "", notes: "NOT NULL. Specific assignment (e.g. Search & Rescue, Debris Clearance)." },
            { name: "ResponseDate", type: "DATE", key: "", notes: "NOT NULL. Deployment date." }
        ]
    },
    Volunteer: {
        group: "Rescue & Operations",
        description: "Registered civilian volunteers who support active rescue operations.",
        ddl: `CREATE TABLE Volunteer (
    Volunteer_ID VARCHAR(50) PRIMARY KEY,
    Team_ID VARCHAR(50),
    Name VARCHAR(100) NOT NULL,
    Age INT CHECK (Age >= 18),
    Gender VARCHAR(20),
    Skills TEXT,
    ContactNumber VARCHAR(20),
    FOREIGN KEY (Team_ID) REFERENCES RescueTeam(Team_ID) ON DELETE SET NULL ON UPDATE CASCADE
);`,
        columns: [
            { name: "Volunteer_ID", type: "VARCHAR(50)", key: "PK", notes: "Primary key." },
            { name: "Team_ID", type: "VARCHAR(50)", key: "FK", notes: "Nullable. References RescueTeam(Team_ID). Set NULL on delete." },
            { name: "Name", type: "VARCHAR(100)", key: "", notes: "NOT NULL. Full name." },
            { name: "Age", type: "INT", key: "", notes: "CHECK: Age must be >= 18." },
            { name: "Gender", type: "VARCHAR(20)", key: "", notes: "Gender classification." },
            { name: "Skills", type: "TEXT", key: "", notes: "E.g., First Aid, Driving, Translation, Cooking." },
            { name: "ContactNumber", type: "VARCHAR(20)", key: "", notes: "Emergency contact line." }
        ]
    },
    ReliefCamp: {
        group: "Relief & Shelter",
        description: "Designated safe houses, shelters, or camps established for sheltering victims.",
        ddl: `CREATE TABLE ReliefCamp (
    ReliefCamp_ID VARCHAR(50) PRIMARY KEY,
    Disaster_ID VARCHAR(50) NOT NULL,
    Name VARCHAR(150) NOT NULL,
    Capacity INT CHECK (Capacity >= 0),
    Address VARCHAR(255),
    ContactNumber VARCHAR(20),
    FOREIGN KEY (Disaster_ID) REFERENCES Disaster(Disaster_ID) ON DELETE RESTRICT ON UPDATE CASCADE
);`,
        columns: [
            { name: "ReliefCamp_ID", type: "VARCHAR(50)", key: "PK", notes: "Primary key." },
            { name: "Disaster_ID", type: "VARCHAR(50)", key: "FK", notes: "References Disaster(Disaster_ID). Restrict delete, cascade update." },
            { name: "Name", type: "VARCHAR(150)", key: "", notes: "NOT NULL. Camp name." },
            { name: "Capacity", type: "INT", key: "", notes: "CHECK: Max capacity >= 0." },
            { name: "Address", type: "VARCHAR(255)", key: "", notes: "Physical street address / geo description." },
            { name: "ContactNumber", type: "VARCHAR(20)", key: "", notes: "Camp management hotline." }
        ]
    },
    Victim: {
        group: "Relief & Shelter",
        description: "Registered details of affected civilians seeking support.",
        ddl: `CREATE TABLE Victim (
    Victim_ID VARCHAR(50) PRIMARY KEY,
    ReliefCamp_ID VARCHAR(50),
    Name VARCHAR(100) NOT NULL,
    Age INT CHECK (Age >= 0),
    Gender VARCHAR(20),
    HealthStatus VARCHAR(100),
    FOREIGN KEY (ReliefCamp_ID) REFERENCES ReliefCamp(ReliefCamp_ID) ON DELETE SET NULL ON UPDATE CASCADE
);`,
        columns: [
            { name: "Victim_ID", type: "VARCHAR(50)", key: "PK", notes: "Primary key." },
            { name: "ReliefCamp_ID", type: "VARCHAR(50)", key: "FK", notes: "Nullable. References ReliefCamp(ReliefCamp_ID). Set NULL on delete." },
            { name: "Name", type: "VARCHAR(100)", key: "", notes: "NOT NULL. Full name." },
            { name: "Age", type: "INT", key: "", notes: "CHECK: Age >= 0." },
            { name: "Gender", type: "VARCHAR(20)", key: "", notes: "Gender categorization." },
            { name: "HealthStatus", type: "VARCHAR(100)", key: "", notes: "E.g., Stable, Injured, Critical, Medical Isolation." }
        ]
    },
    ImpactedBy: {
        group: "Relief & Shelter",
        description: "Bridging entity detailing active medical status and support type for victims of a disaster.",
        ddl: `CREATE TABLE ImpactedBy (
    Disaster_ID VARCHAR(50) NOT NULL,
    Victim_ID VARCHAR(50) NOT NULL,
    ReliefCamp_ID VARCHAR(50),
    InjuryStatus VARCHAR(100),
    ReliefType VARCHAR(100),
    PRIMARY KEY (Disaster_ID, Victim_ID),
    FOREIGN KEY (Disaster_ID) REFERENCES Disaster(Disaster_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Victim_ID) REFERENCES Victim(Victim_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (ReliefCamp_ID) REFERENCES ReliefCamp(ReliefCamp_ID) ON DELETE SET NULL ON UPDATE CASCADE
);`,
        columns: [
            { name: "Disaster_ID", type: "VARCHAR(50)", key: "PK, FK", notes: "Part of composite PK. References Disaster(Disaster_ID)." },
            { name: "Victim_ID", type: "VARCHAR(50)", key: "PK, FK", notes: "Part of composite PK. References Victim(Victim_ID)." },
            { name: "ReliefCamp_ID", type: "VARCHAR(50)", key: "FK", notes: "Nullable. References ReliefCamp(ReliefCamp_ID). Set NULL on delete." },
            { name: "InjuryStatus", type: "VARCHAR(100)", key: "", notes: "Medical details (e.g. Fracture, Minor, None)." },
            { name: "ReliefType", type: "VARCHAR(100)", key: "", notes: "Relief kit assigned (e.g. Hygiene Kit, Trauma Care)." }
        ]
    },
    Donor: {
        group: "Logistics & Finance",
        description: "Benefactors contributing funding or relief materials.",
        ddl: `CREATE TABLE Donor (
    Donor_ID VARCHAR(50) PRIMARY KEY,
    Name VARCHAR(150) NOT NULL,
    Type VARCHAR(50),
    ContactNumber VARCHAR(20),
    Email VARCHAR(100)
);`,
        columns: [
            { name: "Donor_ID", type: "VARCHAR(50)", key: "PK", notes: "Primary key." },
            { name: "Name", type: "VARCHAR(150)", key: "", notes: "NOT NULL. Donor Name / Corporate brand." },
            { name: "Type", type: "VARCHAR(50)", key: "", notes: "E.g., Corporate, Individual, NGO, Government." },
            { name: "ContactNumber", type: "VARCHAR(20)", key: "", notes: "Contact line." },
            { name: "Email", type: "VARCHAR(100)", key: "", notes: "Donor email account." }
        ]
    },
    Resource: {
        group: "Logistics & Finance",
        description: "Registered inventory items kept in emergency distribution hubs.",
        ddl: `CREATE TABLE Resource (
    Resource_ID VARCHAR(50) PRIMARY KEY,
    ResourceName VARCHAR(100) NOT NULL,
    ResourceType VARCHAR(50),
    QuantityAvailable INT NOT NULL DEFAULT 0 CHECK (QuantityAvailable >= 0),
    Unit VARCHAR(20),
    UnitCost DECIMAL(10, 2) NOT NULL DEFAULT 0.00 CHECK (UnitCost >= 0)
);`,
        columns: [
            { name: "Resource_ID", type: "VARCHAR(50)", key: "PK", notes: "Primary key." },
            { name: "ResourceName", type: "VARCHAR(100)", key: "", notes: "NOT NULL. E.g. Dry Food, Water Bottles, Heavy Tents." },
            { name: "ResourceType", type: "VARCHAR(50)", key: "", notes: "E.g., Medical, Food, Shelter, Sanitation." },
            { name: "QuantityAvailable", type: "INT", key: "", notes: "NOT NULL DEFAULT 0. CHECK >= 0." },
            { name: "Unit", type: "VARCHAR(20)", key: "", notes: "Measurement unit (e.g. liters, boxes, tons)." },
            { name: "UnitCost", type: "DECIMAL(10,2)", key: "", notes: "NOT NULL DEFAULT 0.00. CHECK >= 0." }
        ]
    },
    Donation: {
        group: "Logistics & Finance",
        description: "Specific donation logs, tracking financial transfers or resource drops.",
        ddl: `CREATE TABLE Donation (
    Donation_ID VARCHAR(50) PRIMARY KEY,
    Donor_ID VARCHAR(50) NOT NULL,
    Disaster_ID VARCHAR(50),
    Resource_ID VARCHAR(50),
    DonationType VARCHAR(50) NOT NULL,
    Amount DECIMAL(12, 2) DEFAULT 0.00 CHECK (Amount >= 0),
    DonationDate DATE NOT NULL,
    FOREIGN KEY (Donor_ID) REFERENCES Donor(Donor_ID) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (Disaster_ID) REFERENCES Disaster(Disaster_ID) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (Resource_ID) REFERENCES Resource(Resource_ID) ON DELETE SET NULL ON UPDATE CASCADE
);`,
        columns: [
            { name: "Donation_ID", type: "VARCHAR(50)", key: "PK", notes: "Primary key." },
            { name: "Donor_ID", type: "VARCHAR(50)", key: "FK", notes: "References Donor(Donor_ID). Restrict delete, cascade update." },
            { name: "Disaster_ID", type: "VARCHAR(50)", key: "FK", notes: "Nullable. References Disaster(Disaster_ID). Set NULL on delete." },
            { name: "Resource_ID", type: "VARCHAR(50)", key: "FK", notes: "Nullable. References Resource(Resource_ID) for material donations." },
            { name: "DonationType", type: "VARCHAR(50)", key: "", notes: "NOT NULL. (E.g. Financial, Material, Service)." },
            { name: "Amount", type: "DECIMAL(12,2)", key: "", notes: "Financial worth check >= 0." },
            { name: "DonationDate", type: "DATE", key: "", notes: "NOT NULL. Date donated." }
        ]
    },
    ResourceRequest: {
        group: "Logistics & Finance",
        description: "Orders placed by managers requesting specific logistics items to handle a disaster.",
        ddl: `CREATE TABLE ResourceRequest (
    Disaster_ID VARCHAR(50) NOT NULL,
    Resource_ID VARCHAR(50) NOT NULL,
    Quantity INT NOT NULL CHECK (Quantity > 0),
    RequestDate DATE NOT NULL,
    TotalValue DECIMAL(12, 2) DEFAULT 0.00 CHECK (TotalValue >= 0),
    PRIMARY KEY (Disaster_ID, Resource_ID),
    FOREIGN KEY (Disaster_ID) REFERENCES Disaster(Disaster_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Resource_ID) REFERENCES Resource(Resource_ID) ON DELETE RESTRICT ON UPDATE CASCADE
);`,
        columns: [
            { name: "Disaster_ID", type: "VARCHAR(50)", key: "PK, FK", notes: "Part of composite PK. References Disaster(Disaster_ID)." },
            { name: "Resource_ID", type: "VARCHAR(50)", key: "PK, FK", notes: "Part of composite PK. References Resource(Resource_ID)." },
            { name: "Quantity", type: "INT", key: "", notes: "NOT NULL. CHECK: Quantity > 0." },
            { name: "RequestDate", type: "DATE", key: "", notes: "NOT NULL. Date request made." },
            { name: "TotalValue", type: "DECIMAL(12,2)", key: "", notes: "Calculated cost value. Check >= 0." }
        ]
    }
};

// --- DOM Navigation & Controls ---
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Tab Switching
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");
    const sidebarPanel = document.getElementById("sidebar-panel");

    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetTab = btn.getAttribute("data-tab");
            
            // Toggle buttons
            tabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            // Toggle panels
            tabContents.forEach(content => {
                content.classList.remove("active");
                if (content.id === `tab-${targetTab}`) {
                    content.classList.add("active");
                }
            });

            // Adjust sidebar layout based on context
            if (targetTab === "sql") {
                sidebarPanel.style.display = "none";
                document.querySelector(".app-container").style.gridTemplateColumns = "1fr";
            } else {
                sidebarPanel.style.display = "flex";
                if (window.innerWidth > 768) {
                    document.querySelector(".app-container").style.gridTemplateColumns = "280px 1fr";
                }
            }

            // Force Mermaid render when switching back to diagrams
            if (targetTab === "diagrams") {
                // Ensure diagrams render
                setTimeout(() => {
                    mermaid.run({
                        nodes: document.querySelectorAll('.mermaid')
                    });
                }, 100);
            }
        });
    });

    // 2. Sidebar Table Clicking
    const tableItems = document.querySelectorAll(".table-item");
    let currentSelectedTable = "Location"; // default

    function selectTable(tableName) {
        currentSelectedTable = tableName;
        
        // Update active list selection
        tableItems.forEach(item => {
            if (item.getAttribute("data-table") === tableName) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });

        // Load Dictionary Tab Content
        const meta = schemaCatalog[tableName];
        if (meta) {
            document.getElementById("dict-table-title").textContent = tableName;
            document.getElementById("dict-table-group").innerHTML = `<i class="fa-solid fa-tag"></i> ${meta.group}`;
            document.getElementById("table-ddl-code").textContent = meta.ddl;

            // Load columns mapping
            const tableBody = document.getElementById("metadata-table-body");
            tableBody.innerHTML = ""; // clear

            meta.columns.forEach(col => {
                const tr = document.createElement("tr");

                // Check key status for icons
                let keyStyle = "";
                let keyText = col.key;
                if (col.key.includes("PK")) {
                    keyStyle = "col-key-pk";
                    keyText = `<i class="fa-solid fa-key"></i> PK`;
                } else if (col.key.includes("FK")) {
                    keyStyle = "col-key-fk";
                    keyText = `<i class="fa-solid fa-link"></i> FK`;
                }

                tr.innerHTML = `
                    <td class="col-name">${col.name}</td>
                    <td class="col-type">${col.type}</td>
                    <td class="${keyStyle}">${keyText}</td>
                    <td>${col.notes}</td>
                `;
                tableBody.appendChild(tr);
            });
        }

        // Highlight visual table in SVG diagram if available
        highlightSvgTable(tableName);
    }

    tableItems.forEach(item => {
        item.addEventListener("click", () => {
            const table = item.getAttribute("data-table");
            selectTable(table);

            // Automatically switch to dictionary tab if click occurs from full code mode
            const activeTab = document.querySelector(".tab-btn.active").getAttribute("data-tab");
            if (activeTab === "sql") {
                document.querySelector('.tab-btn[data-tab="dictionary"]').click();
            }
        });
    });

    // 3. Search Filter Sidebar
    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();

        tableItems.forEach(item => {
            const name = item.getAttribute("data-table").toLowerCase();
            const cols = schemaCatalog[item.getAttribute("data-table")].columns.map(c => c.name.toLowerCase());
            
            // Match table name or columns
            const matchesTable = name.includes(query);
            const matchesColumns = cols.some(col => col.includes(query));

            if (matchesTable || matchesColumns) {
                item.style.display = "flex";
                // If query matched columns, highlight temporarily
                if (query && matchesColumns && !matchesTable) {
                    item.style.borderColor = "var(--accent-blue)";
                } else {
                    item.style.borderColor = "transparent";
                }
            } else {
                item.style.display = "none";
            }
        });

        // Hide group sections if they have no visible list items
        const groupSections = document.querySelectorAll(".group-section");
        groupSections.forEach(section => {
            const visibleItems = Array.from(section.querySelectorAll(".table-item")).filter(i => i.style.display !== "none");
            if (visibleItems.length === 0) {
                section.style.display = "none";
            } else {
                section.style.display = "flex";
            }
        });
    });

    // 4. Diagram Switcher (ER vs Relational)
    const btnEr = document.getElementById("btn-er");
    const btnRelational = document.getElementById("btn-relational");
    const wrapEr = document.getElementById("er-diagram-container");
    const wrapRelational = document.getElementById("relational-diagram-container");

    btnEr.addEventListener("click", () => {
        btnEr.classList.add("active");
        btnRelational.classList.remove("active");
        wrapEr.classList.add("active");
        wrapRelational.classList.remove("active");
        resetZoom();
    });

    btnRelational.addEventListener("click", () => {
        btnRelational.classList.add("active");
        btnEr.classList.remove("active");
        wrapRelational.classList.add("active");
        wrapEr.classList.remove("active");
        resetZoom();
    });

    // 5. Diagram Zooming Logic
    let currentScale = 1.0;
    const btnZoomIn = document.getElementById("btn-zoom-in");
    const btnZoomOut = document.getElementById("btn-zoom-out");
    const btnZoomReset = document.getElementById("btn-zoom-reset");

    function updateZoom() {
        const activeContainer = document.querySelector(".mermaid-wrap.active");
        if (activeContainer) {
            activeContainer.style.transform = `scale(${currentScale})`;
        }
    }

    function resetZoom() {
        currentScale = 1.0;
        updateZoom();
    }

    btnZoomIn.addEventListener("click", () => {
        if (currentScale < 2.0) {
            currentScale += 0.1;
            updateZoom();
        }
    });

    btnZoomOut.addEventListener("click", () => {
        if (currentScale > 0.5) {
            currentScale -= 0.1;
            updateZoom();
        }
    });

    btnZoomReset.addEventListener("click", resetZoom);

    // 6. Highlight Table node in Mermaid SVG
    function highlightSvgTable(tableName) {
        // Remove previous highlights
        document.querySelectorAll(".mermaid g.node").forEach(node => {
            node.style.filter = "none";
            const rect = node.querySelector("rect");
            if (rect) rect.style.stroke = "";
        });

        // Add glow highlight to matches
        // Find nodes matching text identifier
        document.querySelectorAll(".mermaid g.node").forEach(node => {
            const textNodes = Array.from(node.querySelectorAll("text"));
            const matchesText = textNodes.some(tn => tn.textContent.trim().toLowerCase() === tableName.toLowerCase());
            
            if (matchesText) {
                node.style.filter = "drop-shadow(0 0 8px rgba(88, 166, 255, 0.8))";
                const rect = node.querySelector("rect");
                if (rect) {
                    rect.style.stroke = "var(--accent-blue)";
                    rect.style.strokeWidth = "2px";
                }
            }
        });
    }

    // 7. DDL Clipboard Copy Buttons
    const btnCopyTableSql = document.getElementById("btn-copy-table-sql");
    btnCopyTableSql.addEventListener("click", () => {
        const ddlText = schemaCatalog[currentSelectedTable]?.ddl;
        if (ddlText) {
            navigator.clipboard.writeText(ddlText).then(() => {
                const originalHtml = btnCopyTableSql.innerHTML;
                btnCopyTableSql.innerHTML = `<i class="fa-solid fa-check text-green"></i> Copied!`;
                btnCopyTableSql.style.borderColor = "var(--accent-green)";
                setTimeout(() => {
                    btnCopyTableSql.innerHTML = originalHtml;
                    btnCopyTableSql.style.borderColor = "";
                }, 2000);
            });
        }
    });

    // Load full SQL code
    const fullSql = `-- ==========================================
-- DISASTER RELIEF MANAGEMENT SYSTEM SCHEMA
-- SQL DDL (Standard PostgreSQL / MySQL Compatible)
-- Generated for professional GitHub repository
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

-- 1. Location
CREATE TABLE Location (
    Location_ID VARCHAR(50) PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Division VARCHAR(100) NOT NULL,
    District VARCHAR(100) NOT NULL
);

-- 2. Disaster
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

-- 3. Occurrence
CREATE TABLE Occurrence (
    Occurrence_ID VARCHAR(50) PRIMARY KEY,
    Disaster_ID VARCHAR(50) NOT NULL,
    OccurrenceType VARCHAR(100) NOT NULL,
    Level VARCHAR(50),
    ReportedTime TIMESTAMP NOT NULL,
    ResolvedTime TIMESTAMP,
    FOREIGN KEY (Disaster_ID) REFERENCES Disaster(Disaster_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT chk_OccurrenceTime CHECK (ResolvedTime IS NULL OR ResolvedTime >= ReportedTime)
);

-- 4. Warning
CREATE TABLE Warning (
    Warning_ID VARCHAR(50) PRIMARY KEY,
    Disaster_ID VARCHAR(50) NOT NULL,
    WarningType VARCHAR(100) NOT NULL,
    Message TEXT NOT NULL,
    WarningDate DATE NOT NULL,
    WarningTime TIME NOT NULL,
    FOREIGN KEY (Disaster_ID) REFERENCES Disaster(Disaster_ID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- 5. ReliefCamp
CREATE TABLE ReliefCamp (
    ReliefCamp_ID VARCHAR(50) PRIMARY KEY,
    Disaster_ID VARCHAR(50) NOT NULL,
    Name VARCHAR(150) NOT NULL,
    Capacity INT CHECK (Capacity >= 0),
    Address VARCHAR(255),
    ContactNumber VARCHAR(20),
    FOREIGN KEY (Disaster_ID) REFERENCES Disaster(Disaster_ID) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- 6. RescueTeam
CREATE TABLE RescueTeam (
    Team_ID VARCHAR(50) PRIMARY KEY,
    TeamName VARCHAR(100) NOT NULL,
    TeamLeader VARCHAR(100),
    ContactNumber VARCHAR(20),
    Equipments TEXT,
    Specialization VARCHAR(150)
);

-- 7. DisasterAction
CREATE TABLE DisasterAction (
    Disaster_ID VARCHAR(50) NOT NULL,
    Team_ID VARCHAR(50) NOT NULL,
    Task VARCHAR(255) NOT NULL,
    ResponseDate DATE NOT NULL,
    PRIMARY KEY (Disaster_ID, Team_ID),
    FOREIGN KEY (Disaster_ID) REFERENCES Disaster(Disaster_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Team_ID) REFERENCES RescueTeam(Team_ID) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- 8. Volunteer
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

-- 9. Victim
CREATE TABLE Victim (
    Victim_ID VARCHAR(50) PRIMARY KEY,
    ReliefCamp_ID VARCHAR(50),
    Name VARCHAR(100) NOT NULL,
    Age INT CHECK (Age >= 0),
    Gender VARCHAR(20),
    HealthStatus VARCHAR(100),
    FOREIGN KEY (ReliefCamp_ID) REFERENCES ReliefCamp(ReliefCamp_ID) ON DELETE SET NULL ON UPDATE CASCADE
);

-- 10. ImpactedBy
CREATE TABLE ImpactedBy (
    Disaster_ID VARCHAR(50) NOT NULL,
    Victim_ID VARCHAR(50) NOT NULL,
    ReliefCamp_ID VARCHAR(50),
    InjuryStatus VARCHAR(100),
    ReliefType VARCHAR(100),
    PRIMARY KEY (Disaster_ID, Victim_ID),
    FOREIGN KEY (Disaster_ID) REFERENCES Disaster(Disaster_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Victim_ID) REFERENCES Victim(Victim_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (ReliefCamp_ID) REFERENCES ReliefCamp(ReliefCamp_ID) ON DELETE SET NULL ON UPDATE CASCADE
);

-- 11. Donor
CREATE TABLE Donor (
    Donor_ID VARCHAR(50) PRIMARY KEY,
    Name VARCHAR(150) NOT NULL,
    Type VARCHAR(50),
    ContactNumber VARCHAR(20),
    Email VARCHAR(100)
);

-- 12. Resource
CREATE TABLE Resource (
    Resource_ID VARCHAR(50) PRIMARY KEY,
    ResourceName VARCHAR(100) NOT NULL,
    ResourceType VARCHAR(50),
    QuantityAvailable INT NOT NULL DEFAULT 0 CHECK (QuantityAvailable >= 0),
    Unit VARCHAR(20),
    UnitCost DECIMAL(10, 2) NOT NULL DEFAULT 0.00 CHECK (UnitCost >= 0)
);

-- 13. Donation
CREATE TABLE Donation (
    Donation_ID VARCHAR(50) PRIMARY KEY,
    Donor_ID VARCHAR(50) NOT NULL,
    Disaster_ID VARCHAR(50),
    Resource_ID VARCHAR(50),
    DonationType VARCHAR(50) NOT NULL,
    Amount DECIMAL(12, 2) DEFAULT 0.00 CHECK (Amount >= 0),
    DonationDate DATE NOT NULL,
    FOREIGN KEY (Donor_ID) REFERENCES Donor(Donor_ID) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (Disaster_ID) REFERENCES Disaster(Disaster_ID) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (Resource_ID) REFERENCES Resource(Resource_ID) ON DELETE SET NULL ON UPDATE CASCADE
);

-- 14. ResourceRequest
CREATE TABLE ResourceRequest (
    Disaster_ID VARCHAR(50) NOT NULL,
    Resource_ID VARCHAR(50) NOT NULL,
    Quantity INT NOT NULL CHECK (Quantity > 0),
    RequestDate DATE NOT NULL,
    TotalValue DECIMAL(12, 2) DEFAULT 0.00 CHECK (TotalValue >= 0),
    PRIMARY KEY (Disaster_ID, Resource_ID),
    FOREIGN KEY (Disaster_ID) REFERENCES Disaster(Disaster_ID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Resource_ID) REFERENCES Resource(Resource_ID) ON DELETE RESTRICT ON UPDATE CASCADE
);`;

    document.getElementById("full-sql-code").textContent = fullSql;

    const btnCopyFullSql = document.getElementById("btn-copy-full-sql");
    btnCopyFullSql.addEventListener("click", () => {
        navigator.clipboard.writeText(fullSql).then(() => {
            const originalHtml = btnCopyFullSql.innerHTML;
            btnCopyFullSql.innerHTML = `<i class="fa-solid fa-check text-green"></i> Copied Full Script!`;
            btnCopyFullSql.style.borderColor = "var(--accent-green)";
            setTimeout(() => {
                btnCopyFullSql.innerHTML = originalHtml;
                btnCopyFullSql.style.borderColor = "";
            }, 2000);
        });
    });

    // Initialize Default State
    selectTable(currentSelectedTable);

    // Initial Diagram rendering
    setTimeout(() => {
        mermaid.run({
            nodes: document.querySelectorAll('.mermaid')
        });
    }, 500);
});
