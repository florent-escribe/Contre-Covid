-- create application stuff

CREATE TABLE Adresse(
   aid SERIAL,
   ville VARCHAR(50) NOT NULL,
   departement VARCHAR(50) NOT NULL,
   region VARCHAR(50) NOT NULL,
   PRIMARY KEY(aid)
);

CREATE TABLE Type(
   tyid SERIAL,
   tnom VARCHAR(50) NOT NULL,
   PRIMARY KEY(tyid),
   UNIQUE(tnom)
);

CREATE TABLE Commerce(
   cid SERIAL,
   cnom VARCHAR(50) NOT NULL,
   surface DECIMAL(15,2) NOT NULL,
   tyid INT NOT NULL,
   aid INT NOT NULL,
   PRIMARY KEY(cid),
   FOREIGN KEY(tyid) REFERENCES Type(tyid),
   FOREIGN KEY(aid) REFERENCES Adresse(aid)
);

CREATE TABLE Travail(
   trid SERIAL,
   cid INT NOT NULL,
   PRIMARY KEY(trid),
   UNIQUE(cid),
   FOREIGN KEY(cid) REFERENCES Commerce(cid)
);

CREATE TABLE Fréquentation(
   fid SERIAL,
   creneaux_horaires VARCHAR(50) NOT NULL,
   date_f  date NOT NULL,
   nb_client INT,
   nb_contact INT,
   cid INT NOT NULL,
   PRIMARY KEY(fid),
   FOREIGN KEY(cid) REFERENCES Commerce(cid)
);

CREATE TABLE Utilisateur(
   uid SERIAL,
   unom VARCHAR(50) NOT NULL,
   uprenom VARCHAR(50) NOT NULL,
   umail VARCHAR(50) NOT NULL,
   utel VARCHAR(50) NOT NULL,
   trid INT,
   mdp VARCHAR(50),
   aid INT NOT NULL,
   PRIMARY KEY(uid),
   UNIQUE(umail),
   UNIQUE(utel),
   FOREIGN KEY(trid) REFERENCES Travail(trid),
   FOREIGN KEY(aid) REFERENCES Adresse(aid)
);

CREATE TABLE Position_Utilisateur(
   uid INT NOT NULL,
   latitude FLOAT8 NOT NULL,
   longitude FLOAT8 NOT NULL,
   date_pos TIMESTAMP NOT NULL,
   FOREIGN KEY(uid) REFERENCES Utilisateur(uid)
);

CREATE TABLE Test(
   teid SERIAL,
   quand DATE NOT NULL,
   type VARCHAR(50) NOT NULL,
   res BOOLEAN NOT NULL,
   uid INT NOT NULL,
   PRIMARY KEY(teid),
   FOREIGN KEY(uid) REFERENCES Utilisateur(uid)
);


-- convention état covid : (0,rien) (1,contact) (2,confirmé)
CREATE TABLE Santé(
   nsecu VARCHAR(50),
   etat_covid VARCHAR(50) NOT NULL,
   uid INT NOT NULL,
   PRIMARY KEY(nsecu),
   UNIQUE(uid, etat_covid),
   FOREIGN KEY(uid) REFERENCES Utilisateur(uid)
);

CREATE TABLE Contact(
   uid_1 INT NOT NULL,
   conid SERIAL NOT NULL,
   longitude VARCHAR(50) NOT NULL,
   latitude VARCHAR(50) NOT NULL,
   date_début DATE NULL,
   date_fin DATE NULL,
   duree TIME NULL,
   uid INT NOT NULL,
   cid INT NULL,
   PRIMARY KEY(conid),
   FOREIGN KEY(uid_1) REFERENCES Utilisateur(uid),
   FOREIGN KEY(uid) REFERENCES Utilisateur(uid),
   FOREIGN KEY(cid) REFERENCES Commerce(cid)
);
