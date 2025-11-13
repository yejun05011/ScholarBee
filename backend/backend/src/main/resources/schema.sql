CREATE TABLE students (
    student_id BIGINT(19) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(10) NOT NULL,
    department VARCHAR(10) NOT NULL,
    grade INTEGER(4) NOT NULL,
    disabled TINYINT(1) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL
);

CREATE TABLE scholarships (
    scholar_id BIGINT(19) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    foundation VARCHAR(255) NOT NULL,
    amount BIGINT(19) NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    apply_start DATE NOT NULL,
    apply_end DATE NOT NULL
);

CREATE TABLE qualifications (
    min_gpa decimal(3, 2),
    allowed_grade tinyint(3),
    major VARCHAR(255),
    max_income integer(10),
    created_at DATE,
    updated_at DATE,
    scholar_id BIGINT(19) PRIMARY KEY,
    FOREIGN KEY (scholar_id) REFERENCES scholarships (scholar_id) ON DELETE CASCADE
);

CREATE TABLE academic_records (
    student_id BIGINT(19) PRIMARY KEY,
    semester INTEGER(1) NOT NULL,
    credits INTEGER(3) NOT NULL,
    score DECIMAL(3, 2) NOT NULL,
    created_at DATE,
    updated_at DATE,
    FOREIGN KEY (student_id) REFERENCES students (student_id) ON DELETE CASCADE
);

CREATE TABLE wish_lists (
    wish_id BIGINT(19) PRIMARY KEY AUTO_INCREMENT,
    scholar_id BIGINT(19),
    student_id BIGINT(19),
    created_at DATE,
    updated_at DATE,
    FOREIGN KEY (scholar_id) REFERENCES scholarships (scholar_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students (student_id) ON DELETE CASCADE
);

CREATE TABLE recommendations (
    rec_id BIGINT(19) PRIMARY KEY,
    student_id BIGINT(19),
    scholar_id BIGINT(19),
    match_score TINYINT(3),
    generated_at DATE NOT NULL,
    apply_end DATE NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students (student_id) ON DELETE CASCADE,
    FOREIGN KEY (scholar_id) REFERENCES scholarships (scholar_id) ON DELETE CASCADE
);

CREATE TABLE volunteers (
    volunteer_id BIGINT(19) AUTO_INCREMENT,
    student_id BIGINT(19),
    organization VARCHAR(255) NOT NULL,
    activity VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    hours INTEGER(5) NOT NULL,
    description VARCHAR(1024),
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    PRIMARY KEY (volunteer_id, student_id),
    FOREIGN KEY (student_id) REFERENCES students (student_id) ON DELETE CASCADE
);

CREATE TABLE certificates (
    certificate_id BIGINT(19) AUTO_INCREMENT,
    student_id BIGINT(19),
    name VARCHAR(255) NOT NULL,
    authority VARCHAR(255) NOT NULL,
    issue_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    score INTEGER(10),
    PRIMARY KEY (certificate_id, student_id),
    FOREIGN KEY (student_id) REFERENCES students (student_id) ON DELETE CASCADE
);