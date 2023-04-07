CREATE TABLE patients (
    id int(11) NOT NULL AUTO_INCREMENT,
    age int(3) NOT NULL,
    gender varchar(50) NOT NULL,
    ethnicity varchar(50) NOT NULL,
    test_taken varchar(50) NOT NULL,
    medical_condition varchar(50) NOT NULL,
    treatment varchar(50),
    diagnosis varchar(50) NOT NULL,
    outcome varchar(50) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO patients (age, gender, ethnicity, test_taken, medical_condition, treatment, diagnosis, outcome)
SELECT
    FLOOR(RAND() * 85) + 10,
    CASE WHEN RAND() < 0.5 THEN 'Male' ELSE 'Female' END,
    CASE FLOOR(RAND() * 4) 
        WHEN 0 THEN 'Other'
        WHEN 1 THEN 'African American'
        WHEN 2 THEN 'Hispanic'
        ELSE 'Caucasian'
    END,
    CASE FLOOR(RAND() * 4)
        WHEN 0 THEN 'Computed Tomography scan'
        WHEN 1 THEN 'Magnetic Resonance Imaging'
        WHEN 2 THEN 'Electrocardiogram'
        ELSE 'Urinalysis'
    END,
    CASE FLOOR(RAND() * 4)
        WHEN 0 THEN 'Diabetes'
        WHEN 1 THEN 'Hypertension'
        WHEN 2 THEN 'Asthma'
        ELSE 'Hyperlipidemia '
    END,
    CASE FLOOR(RAND() * 3)
        WHEN 0 THEN 'Medication A'
        WHEN 1 THEN 'Medication B'
        WHEN 2 THEN 'Surgery'
        ELSE 'Other'
    END,
    CASE FLOOR(RAND() * 4)
        WHEN 0 THEN 'Positive'
        WHEN 1 THEN 'Negative'
        WHEN 2 THEN 'Inconclusive'
        ELSE 'Unknown'
    END,
    CASE FLOOR(RAND() * 4)
        WHEN 0 THEN 'Recovered'
        WHEN 1 THEN 'Improved'
        WHEN 2 THEN 'Worsen'
        ELSE 'No change'
    END
FROM
    (SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5) a,
    (SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5) b
LIMIT 100;
