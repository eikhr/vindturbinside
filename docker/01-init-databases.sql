-- ============================================================
-- turbin database (created automatically by MYSQL_DATABASE env)
-- ============================================================
USE turbin;

CREATE TABLE bilde (
    BildeID INT AUTO_INCREMENT PRIMARY KEY,
    Filnavn VARCHAR(255) NOT NULL,
    Dato DATETIME NOT NULL,
    BrukerID INT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE bruker (
    BrukerID INT AUTO_INCREMENT PRIMARY KEY,
    Navn VARCHAR(100) NOT NULL UNIQUE,
    Epost VARCHAR(255) NOT NULL UNIQUE,
    Passord VARCHAR(255) NOT NULL,
    OpprettetDato DATETIME NOT NULL,
    Poeng INT NOT NULL DEFAULT 0,
    Admin TINYINT NOT NULL DEFAULT 0,
    BildeID INT NOT NULL,
    FOREIGN KEY (BildeID) REFERENCES bilde(BildeID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- back-reference from bilde to bruker (nullable, for user-uploaded images)
ALTER TABLE bilde ADD FOREIGN KEY (BrukerID) REFERENCES bruker(BrukerID);

CREATE TABLE husketinnlogging (
    HusketInnloggingID INT AUTO_INCREMENT PRIMARY KEY,
    BrukerID INT NOT NULL,
    Hash VARCHAR(255) NOT NULL,
    Dato DATETIME NOT NULL,
    FOREIGN KEY (BrukerID) REFERENCES bruker(BrukerID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE innlogging (
    InnloggingID INT AUTO_INCREMENT PRIMARY KEY,
    BrukerID INT NOT NULL,
    IP VARCHAR(45) NOT NULL,
    Dato DATETIME NOT NULL,
    Husket TINYINT NOT NULL DEFAULT 0,
    FOREIGN KEY (BrukerID) REFERENCES bruker(BrukerID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE tekstkategori (
    TekstKategoriID INT AUTO_INCREMENT PRIMARY KEY,
    Navn VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE tekst (
    TekstID INT AUTO_INCREMENT PRIMARY KEY,
    Navn VARCHAR(255) NOT NULL,
    Innhold TEXT NOT NULL,
    TekstKategoriID INT NOT NULL,
    BrukerID INT NULL,
    FOREIGN KEY (TekstKategoriID) REFERENCES tekstkategori(TekstKategoriID),
    FOREIGN KEY (BrukerID) REFERENCES bruker(BrukerID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE forumkategori (
    ForumKategoriID INT AUTO_INCREMENT PRIMARY KEY,
    Navn VARCHAR(100) NOT NULL,
    Beskrivelse VARCHAR(500) NULL,
    BildeID INT NOT NULL,
    FOREIGN KEY (BildeID) REFERENCES bilde(BildeID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE forumemne (
    ForumEmneID INT AUTO_INCREMENT PRIMARY KEY,
    Navn VARCHAR(255) NOT NULL,
    ForumKategoriID INT NOT NULL,
    BrukerID INT NOT NULL,
    FOREIGN KEY (ForumKategoriID) REFERENCES forumkategori(ForumKategoriID),
    FOREIGN KEY (BrukerID) REFERENCES bruker(BrukerID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE foruminnlegg (
    ForumInnleggID INT AUTO_INCREMENT PRIMARY KEY,
    Innhold TEXT NOT NULL,
    OpprettetDato DATETIME NOT NULL,
    EndretDato DATETIME NOT NULL,
    ForumEmneID INT NOT NULL,
    BrukerID INT NOT NULL,
    FOREIGN KEY (ForumEmneID) REFERENCES forumemne(ForumEmneID),
    FOREIGN KEY (BrukerID) REFERENCES bruker(BrukerID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE liktinnlegg (
    ForumInnleggID INT NOT NULL,
    BrukerID INT NOT NULL,
    PRIMARY KEY (ForumInnleggID, BrukerID),
    FOREIGN KEY (ForumInnleggID) REFERENCES foruminnlegg(ForumInnleggID),
    FOREIGN KEY (BrukerID) REFERENCES bruker(BrukerID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed: 3 default profile images (bruker.js:46 picks random BildeID 1-3)
INSERT INTO bilde (Filnavn, Dato, BrukerID) VALUES
    ('default1.png', NOW(), NULL),
    ('default2.png', NOW(), NULL),
    ('default3.png', NOW(), NULL);


-- ============================================================
-- ordbok database
-- ============================================================
CREATE DATABASE IF NOT EXISTS ordbok CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ordbok;

CREATE TABLE ordType (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    navn VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE sterkBoying (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    boying VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE vindturbinskOrd (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    ord VARCHAR(255) NOT NULL,
    beskrivelse TEXT NOT NULL,
    ordTypeID INT NOT NULL,
    sterkBoyingID INT NULL,
    FOREIGN KEY (ordTypeID) REFERENCES ordType(ID),
    FOREIGN KEY (sterkBoyingID) REFERENCES sterkBoying(ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE norskOrd (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    ord VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE oversettelse (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    norskOrdID INT NOT NULL,
    vindturbinskOrdID INT NOT NULL,
    FOREIGN KEY (norskOrdID) REFERENCES norskOrd(ID),
    FOREIGN KEY (vindturbinskOrdID) REFERENCES vindturbinskOrd(ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
