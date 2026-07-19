-- =====================================================
-- DISASTER RELIEF MANAGEMENT SYSTEM (DRMS)
-- Seed Data script (Standard ANSI SQL / VARCHAR Keys)
-- =====================================================

-- 1. Insert values into Location Table
INSERT INTO Location (Location_ID, Name, Division, District)
VALUES
('LOC001', 'Dhaka Central Area', 'Dhaka', 'Dhaka'),
('LOC002', 'Chattogram Coastal Area', 'Chattogram', 'Chattogram'),
('LOC003', 'Sylhet Flood Zone', 'Sylhet', 'Sylhet'),
('LOC004', 'Khulna Coastal Belt', 'Khulna', 'Khulna'),
('LOC005', 'Barisal River Side', 'Barisal', 'Barisal'),
('LOC006', 'Rajshahi Urban Area', 'Rajshahi', 'Rajshahi'),
('LOC007', 'Rangpur Rural Area', 'Rangpur', 'Rangpur');

-- 2. Insert values into Disaster Table
INSERT INTO Disaster (Disaster_ID, DisasterName, DisasterType, StartDate, EndDate, Location_ID)
VALUES
('DIS001', 'Sylhet Flood 2024', 'Flood', '2024-06-15', '2024-06-30', 'LOC003'),
('DIS002', 'Khulna Cyclone 2024', 'Cyclone', '2024-05-25', '2024-05-29', 'LOC004'),
('DIS003', 'Barisal River Erosion', 'River Erosion', '2024-07-10', '2024-07-20', 'LOC005'),
('DIS004', 'Dhaka Market Fire', 'Fire', '2024-03-12', '2024-03-13', 'LOC001'),
('DIS005', 'Chattogram Earthquake', 'Earthquake', '2024-09-01', '2024-09-02', 'LOC002'),
('DIS006', 'Rajshahi Heatwave', 'Heatwave', '2024-04-20', '2024-04-28', 'LOC006'),
('DIS007', 'Rangpur Cold Wave', 'Cold Wave', '2024-01-05', '2024-01-15', 'LOC007');

-- 3. Insert values into Resource Table
INSERT INTO Resource (Resource_ID, ResourceName, ResourceType, QuantityAvailable, Unit, UnitCost)
VALUES
('RES001', 'Rice', 'Food', 5000, 'KG', 70.00),
('RES002', 'Drinking Water', 'Water', 10000, 'Liter', 20.00),
('RES003', 'Medicine Kit', 'Medical', 800, 'Box', 550.00),
('RES004', 'Tent', 'Shelter', 300, 'Piece', 2500.00),
('RES005', 'Blanket', 'Clothing', 1200, 'Piece', 450.00),
('RES006', 'Dry Food Pack', 'Food', 2000, 'Pack', 120.00),
('RES007', 'Rescue Boat', 'Rescue Equipment', 25, 'Piece', 75000.00);

-- 4. Insert values into ResourceRequest Table
INSERT INTO ResourceRequest (Disaster_ID, Resource_ID, Quantity, RequestDate, TotalValue)
VALUES
('DIS001', 'RES002', 4000, '2024-06-20', 80000.00),
('DIS002', 'RES004', 80, '2024-05-28', 200000.00),
('DIS003', 'RES006', 900, '2024-07-12', 108000.00),
('DIS004', 'RES003', 150, '2024-03-15', 82500.00),
('DIS005', 'RES001', 2000, '2024-09-05', 140000.00),
('DIS006', 'RES002', 2500, '2024-04-22', 50000.00),
('DIS007', 'RES005', 700, '2024-01-10', 315000.00);

-- 5. Insert values into Donor Table
INSERT INTO Donor (Donor_ID, Name, Type, ContactNumber, Email)
VALUES
('DNR001', 'BRAC', 'NGO', '01710000001', 'brac@example.com'),
('DNR002', 'Bangladesh Red Crescent Society', 'NGO', '01710000002', 'redcrescent@example.com'),
('DNR003', 'Bashundhara Group', 'Private Company', '01710000003', 'bashundhara@example.com'),
('DNR004', 'City Bank', 'Corporate', '01710000004', 'citybank@example.com'),
('DNR005', 'Rahim Uddin', 'Individual', '01710000005', 'rahim@example.com'),
('DNR006', 'UNICEF Bangladesh', 'International Organization', '01710000006', 'unicef@example.com'),
('DNR007', 'Local Community Group', 'Community Organization', '01710000007', 'community@example.com');

-- 6. Insert values into Donation Table
INSERT INTO Donation (Donation_ID, Donor_ID, Disaster_ID, Resource_ID, DonationType, Amount, DonationDate)
VALUES
('DON001', 'DNR001', 'DIS001', 'RES002', 'Resource Donation', 150000.00, '2024-06-21'),
('DON002', 'DNR002', 'DIS002', 'RES004', 'Resource Donation', 250000.00, '2024-05-28'),
('DON003', 'DNR003', 'DIS003', 'RES006', 'Resource Donation', 120000.00, '2024-07-13'),
('DON004', 'DNR004', 'DIS004', NULL, 'Cash Donation', 500000.00, '2024-03-14'),
('DON005', 'DNR005', 'DIS005', 'RES001', 'Resource Donation', 70000.00, '2024-09-03'),
('DON006', 'DNR006', 'DIS006', NULL, 'Cash Donation', 800000.00, '2024-04-23'),
('DON007', 'DNR007', 'DIS007', 'RES005', 'Resource Donation', 315000.00, '2024-01-08');

-- 7. Insert values into RescueTeam Table
INSERT INTO RescueTeam (Team_ID, TeamName, TeamLeader, ContactNumber, Equipments, Specialization)
VALUES
('TEAM001', 'Alpha Rescue Team', 'Masud Rana', '01810000001', 'Boat, Life Jacket, Rope', 'Flood Rescue'),
('TEAM002', 'Cyclone Response Team', 'Nusrat Jahan', '01810000002', 'First Aid Kit, Rescue Van', 'Cyclone Rescue'),
('TEAM003', 'River Safety Team', 'Imran Hossain', '01810000003', 'Speed Boat, Rope, Life Buoy', 'River Rescue'),
('TEAM004', 'Fire Control Team', 'Sabbir Ahmed', '01810000004', 'Fire Extinguisher, Helmet, Hose Pipe', 'Fire Rescue'),
('TEAM005', 'Earthquake Response Team', 'Tanvir Islam', '01810000005', 'Cutter, Helmet, Search Camera', 'Earthquake Rescue'),
('TEAM006', 'Medical Support Team', 'Dr. Farhana Akter', '01810000006', 'Medicine, Stretcher, Ambulance', 'Medical Support'),
('TEAM007', 'Winter Relief Team', 'Mizanur Rahman', '01810000007', 'Blankets, Warm Clothes, Medical Kit', 'Cold Wave Support');

-- 8. Insert values into Volunteer Table
INSERT INTO Volunteer (Volunteer_ID, Team_ID, Name, Age, Gender, Skills, ContactNumber)
VALUES
('VOL001', 'TEAM001', 'Karim Ahmed', 25, 'Male', 'Swimming, First Aid', '01910000001'),
('VOL002', 'TEAM002', 'Ayesha Rahman', 23, 'Female', 'First Aid, Communication', '01910000002'),
('VOL003', 'TEAM003', 'Jahid Hasan', 28, 'Male', 'Boat Driving, Rescue Operation', '01910000003'),
('VOL004', 'TEAM004', 'Sadia Islam', 24, 'Female', 'Fire Safety, Emergency Support', '01910000004'),
('VOL005', 'TEAM005', 'Rafiq Hossain', 30, 'Male', 'Search and Rescue', '01910000005'),
('VOL006', 'TEAM006', 'Nabila Akter', 27, 'Female', 'Medical Support, Nursing', '01910000006'),
('VOL007', 'TEAM007', 'Hasan Mahmud', 26, 'Male', 'Relief Distribution', '01910000007');

-- 9. Insert values into DisasterAction Table
INSERT INTO DisasterAction (Disaster_ID, Team_ID, Task, ResponseDate)
VALUES
('DIS001', 'TEAM001', 'Rescue flood affected people and distribute drinking water', '2024-06-21'),
('DIS002', 'TEAM002', 'Evacuate people from cyclone affected area', '2024-05-26'),
('DIS003', 'TEAM003', 'Shift families from river erosion area', '2024-07-12'),
('DIS004', 'TEAM004', 'Control fire and rescue injured people', '2024-03-12'),
('DIS005', 'TEAM005', 'Search damaged buildings and rescue victims', '2024-09-01'),
('DIS006', 'TEAM006', 'Provide medical treatment for heatwave victims', '2024-04-21'),
('DIS007', 'TEAM007', 'Distribute blankets and warm clothes', '2024-01-06');

-- 10. Insert values into ReliefCamp Table
INSERT INTO ReliefCamp (ReliefCamp_ID, Disaster_ID, Name, Capacity, Address, ContactNumber)
VALUES
('CAMP001', 'DIS001', 'Sylhet Govt School Camp', 500, 'Sylhet Sadar, Sylhet', '01610000001'),
('CAMP002', 'DIS002', 'Khulna Cyclone Shelter', 700, 'Koyra, Khulna', '01610000002'),
('CAMP003', 'DIS003', 'Barisal High School Camp', 400, 'Mehendiganj, Barisal', '01610000003'),
('CAMP004', 'DIS004', 'Dhaka Community Center Camp', 300, 'Gulistan, Dhaka', '01610000004'),
('CAMP005', 'DIS005', 'Chattogram College Camp', 600, 'Agrabad, Chattogram', '01610000005'),
('CAMP006', 'DIS006', 'Rajshahi Medical Camp', 350, 'Shaheb Bazar, Rajshahi', '01610000006'),
('CAMP007', 'DIS007', 'Rangpur Union Parishad Camp', 450, 'Pirganj, Rangpur', '01610000007');

-- 11. Insert values into Victim Table
INSERT INTO Victim (Victim_ID, ReliefCamp_ID, Name, Age, Gender, HealthStatus)
VALUES
('VIC001', 'CAMP001', 'Abdul Karim', 45, 'Male', 'Injured'),
('VIC002', 'CAMP002', 'Mst. Rina Begum', 35, 'Female', 'Safe'),
('VIC003', 'CAMP003', 'Jamal Uddin', 52, 'Male', 'Sick'),
('VIC004', 'CAMP004', 'Shila Akter', 22, 'Female', 'Burn Injury'),
('VIC005', 'CAMP005', 'Mamun Hossain', 40, 'Male', 'Minor Injury'),
('VIC006', 'CAMP006', 'Parvin Akter', 30, 'Female', 'Heat Stroke'),
('VIC007', 'CAMP007', 'Rashed Mia', 60, 'Male', 'Cold Fever');

-- 12. Insert values into ImpactedBy Table
INSERT INTO ImpactedBy (Disaster_ID, Victim_ID, ReliefCamp_ID, InjuryStatus, ReliefType)
VALUES
('DIS001', 'VIC001', 'CAMP001', 'Leg Injury', 'Food and Water'),
('DIS002', 'VIC002', 'CAMP002', 'No Injury', 'Shelter'),
('DIS003', 'VIC003', 'CAMP003', 'Fever', 'Dry Food'),
('DIS004', 'VIC004', 'CAMP004', 'Burn Injury', 'Medical Treatment'),
('DIS005', 'VIC005', 'CAMP005', 'Minor Injury', 'Food and Medicine'),
('DIS006', 'VIC006', 'CAMP006', 'Heat Stroke', 'Medical Support'),
('DIS007', 'VIC007', 'CAMP007', 'Cold Fever', 'Blanket and Medicine');

-- 13. Insert values into Warning Table
INSERT INTO Warning (Warning_ID, Disaster_ID, WarningType, Message, WarningDate, WarningTime)
VALUES
('WRN001', 'DIS001', 'Flood Warning', 'Water level is rising. Move to nearest shelter immediately.', '2024-06-14', '08:30:00'),
('WRN002', 'DIS002', 'Cyclone Warning', 'Cyclone may hit coastal areas. Evacuate immediately.', '2024-05-24', '18:00:00'),
('WRN003', 'DIS003', 'River Erosion Warning', 'River bank is unstable. Avoid risky areas.', '2024-07-09', '10:15:00'),
('WRN004', 'DIS004', 'Fire Alert', 'Fire reported in market area. Avoid the location.', '2024-03-12', '14:20:00'),
('WRN005', 'DIS005', 'Earthquake Alert', 'Aftershock may happen. Stay in open area.', '2024-09-01', '06:45:00'),
('WRN006', 'DIS006', 'Heatwave Warning', 'Temperature is very high. Drink water and avoid sunlight.', '2024-04-19', '12:00:00'),
('WRN007', 'DIS007', 'Cold Wave Warning', 'Severe cold wave expected. Use warm clothes.', '2024-01-04', '20:00:00');

-- 14. Insert values into Occurrence Table
INSERT INTO Occurrence (Occurrence_ID, Disaster_ID, OccurrenceType, Level, ReportedTime, ResolvedTime)
VALUES
('OCC001', 'DIS001', 'Heavy Rainfall and Flooding', 'High', '2024-06-15 07:30:00', '2024-06-30 18:00:00'),
('OCC002', 'DIS002', 'Cyclone Landfall', 'Severe', '2024-05-25 22:00:00', '2024-05-29 10:00:00'),
('OCC003', 'DIS003', 'River Bank Collapse', 'Medium', '2024-07-10 09:15:00', '2024-07-20 16:30:00'),
('OCC004', 'DIS004', 'Market Fire', 'High', '2024-03-12 13:45:00', '2024-03-13 02:00:00'),
('OCC005', 'DIS005', 'Earthquake Shock', 'Medium', '2024-09-01 05:40:00', '2024-09-02 12:00:00'),
('OCC006', 'DIS006', 'Extreme Temperature', 'Medium', '2024-04-20 11:00:00', '2024-04-28 17:00:00'),
('OCC007', 'DIS007', 'Low Temperature', 'Low', '2024-01-05 06:00:00', '2024-01-15 09:00:00');
