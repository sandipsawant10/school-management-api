CREATE DATABASE IF NOT EXISTS school_db

USE school_db;

CREATE TABLE IF NOT EXISTS schools (
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   address VARCHAR(255) NOT NULL,
   latitude FLOAT NOT NULL,
   longitude FLOAT NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO schools (name, address, latitude, longitude) VALUES
('Delhi Public School', 'New Delhi, India', 28.6139, 77.2090),
('The Doon School', 'Mall Road, Dehradun', 30.3165, 78.0322),
('Ryan International School', 'Bannerghatta Road, Bangalore', 12.8456, 77.6012),
('Kendriya Vidyalaya', 'IIT Campus, Powai', 'Mumbai', 19.1289, 72.9141),
('St. Xavier High School', 'Park Street', 'Kolkata', 22.5513, 88.3517);