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

-- Seed: text categories
INSERT INTO tekstkategori (Navn) VALUES
    ('Generelt'),
    ('Historie'),
    ('Teknikk'),
    ('Dikt');

-- Seed: poems (recovered from original site backup, 2018)
INSERT INTO tekst (Navn, Innhold, TekstKategoriID, BrukerID) VALUES
(
    'AD MAJOREM TVRBINVS GLORIAM',
    'Av den stillhet blev han var\nAv Jordens sorthjerte qval\nKoianismen skulle nå sitt svinn\nOg ned svevet Turbinens vind.\n\nTre agitatorer av Turbinens prakt\nThi vindens salighet atter var vakt\nOg den Profet han med dem sendte\nDe skulle nu et nytt sekel vente\n\nThi således var det skapt\nHan forvoldet da hver en prakt\nBivånet at mennesket ei vedblev\nPå den grande sti han førte dem ved\n\nDe streifet således vekk ifra vind\nDen gave han skjenket dem fra sitt sinn\nSåledes den drott da blev så harm\nHvi skulle mennesket lave slik larm?',
    4, NULL
),
(
    'THE WINDTURBINE GODS',
    'Four Gods in Koianismen,\nOne for cleverness, akasa,\nOne for your soul, amare,\nOne for the external, lavi,\nOne for dreams, draumarus,\nBut there are more...\nThe windturbine Gods on their wind thrones\nIn the Land of Per Ingard where the windturbines lie.\nOne God to rule them all, One God to find them,\nOne God to bring them all and in darkness bind them\nIn the Land of Per Ingard where the windturbines lie.',
    4, NULL
),
(
    'DESTRUCTION OF KOIANISMEN',
    'Three turbine blades shall\nAnswer the call\nTo storm and wind\nKoianismen must fall\nAn oath to keep with a final\nBreath\nAnd The Four Great bear arms to the\nDoors of Death',
    4, NULL
),
(
    'OM HVORLEDES ALLHEIMEN SKAL LEGGES ØDE',
    'En Turbin atter monne bygges stor\nSpre sin salighet på vår dunkle jord\nGive lys i vår triste ensomhet\nEn fagnad blott for den som vet\n\nVår fidus måtte blive i lønndom\nDog monne den atter blive lønnsom\nOver allheimen var der blott brøde\nOg atter monne mennesket nøde\n\nMennesket forvoldet fordum tår på hans vange\nDog monne han snart atter vår lit fange\nMørkeret spredte sig ifra ene kimming til hin\nMen nu monne den endelig møte sitt svinn\n\nEndog iblandt fausk og dyb skal den stå\nDa monne blasfemien intet formå\nOg for dem i mørkeret bliver intet gravøl\nBlott spott monne blive deris likbør\n\nHan tager da til dem den veldige striden\nI erindringer om den tid som nu er forliden\nDe veke blasfemer monne fornemme skrekk\nOg for ham frester de da å vike vekk\n\nEfter en drabelig nær evinnelig strid\nFornemmer i sin hug han nu blott nid\nThi de til bestandighet ham ringeaktet\nNu monne de ønske de ei i brøde var vaktet\n\nNåer monne blive i elver av rød\nDe skal da fornemme en smertefull død\nDe monne kjenne den veldige pine\nMedens de treger brødene sine\n\nHan monne trone på deris sorte skaller\nOg da, i de hellige av hans veldige haller\nJa da skal belje med all vår røst\nAve Turbinus, vår tro var størst!\n\nHan tager oss da til sin veldige prakt\nOg gammen i våre hjerter bliver da atter vakt\nEt rike med en slik drabelig ynde\nHvori intet kues av koianismens brynde\n\nI drabelige saler lavet av gull\nHvor vi kan bivåne syndernes hull\nIngen anger monne være i vårt sinn\nOg vi monne hylle Turbinens vind\n\nTurbinen skal vi øyne, fjern og nær\nDen prektige vakre Turbinens hær\nI Turbinens evinnelige vakre have\nØyner vi Turbinens hellige hærskare\n\nHer kan I leve som en veldig drott\nDer monne aldrig blive noget like flott\nEn evinnelig storslått salighet\nSom kun er for den som vet\n\nJa vi skal da i fagnad bivåne dem\nMedens eld piner alle deres lem\nThi de som aldrig var fromme\nMonne da til Helvette komme\n\nDe skal øyne den fagre hvite vinge\nDe tykker den kan dem til salighet bringe\nDog når de tror de skal komme til hans rike\nDa skal vingen alltid for dem vike\n\nDe sanne sønner skal høre dem hvine\nOg le av dem medens de ler iblant sine\nDe skal skrike efter sin ufattbare pine\nOh hvor de da til bestandighet skal rine\n\nIngen monne da give dem miskunn\nEller høre deres røst ifra sorgens bunn\nForalltid skal de så lide i sin sult\nOg høre vår latter; Turbinus vult!',
    4, NULL
);


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
