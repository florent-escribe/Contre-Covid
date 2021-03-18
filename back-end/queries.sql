-- SQL queries to be fed to anosdb
-- Use the :param syntax for portability and readability.




-- USER INFO

-- name : set_user!
INSERT INTO Utilisateur(uid, unom, uprenom, umail, utel, aid)
  VALUES ((SELECT 1 + max(uid) FROM Utilisateur), :unom, :uprenom, :umail, :utel, (           -- possible mistake for Next Value For as 'For' is not in blue
    SELECT aid FROM Adresse WHERE ville = :ville AND departement = :departement AND region = :region
  ));

-- name : get_user_uid
SELECT uid FROM Utilisateur WHERE unom= :unom;


-- name : set_position_utilisateur!
INSERT INTO Position_Utilisateur(uid, longitude, latitude) VALUES(:uid, NULL, NULL);

UPDATE Position_Utilisateur SET longitude = :longitude WHERE current_time = TIMESTAMPADD(SQL_TSI_SECOND, 5, date_pos);
UPDATE Position_Utilisateur SET latitude = :latitude WHERE current_time = TIMESTAMPADD(SQL_TSI_SECOND, 5, date_pos);

-- name : get_infos_utilisateur_all
SELECT unom, uprenom, umail, utel, ville, departement, region,
CASE etat_covid
  WHEN '0' THEN 'Rien'
  WHEN '1' THEN 'Cas contact'
  WHEN '2' THEN 'Cas confirmé'
  END AS etat_covid
FROM Utilisateur 
JOIN Adresse USING(aid)
JOIN Santé USING(uid)
WHERE uid = :uid;

-- name : get_user_covid_state
SELECT etat_covid FROM Santé WHERE uid = :uid;

-- name : get_region
SELECT DISTINCT region FROM Adresse

-- name : get_position_user
SELECT latitude, longitude FROM Position_Utilisateur
WHERE date_pos = '2020-02-01 16:00:00'; --normally we use 'current_time'

-- name : get_user_test
SELECT * FROM Test WHERE uid = :uid;

-- name : get_user_contact
SELECT * FROM Contact WHERE uid = :uid;

-- name : conflict_utel!
BEGIN;
IF utel IN (SELECT utel FROM Utilisateur)
  RETURN ('Ce numéro de téléphone est déjà attribué');
COMMIT;

-- name : conflict_umail!
BEGIN;
IF umail IN (SELECT umail FROM Utilisateur)
  RETURN ('Cette adresse email est déjà utilisée');
COMMIT;

-- name : update_user_mail!
UPDATE Utilisateur SET umail=:umail WHERE uid = :uid;

-- name : update_utilisateur_utel!
UPDATE Utilisateur SET utel=:utel WHERE uid = :uid;

-- name : update_utilisateur_aid!
UPDATE Utilisateur SET aid=:(SELECT aid FROM Adresse WHERE ville = :ville AND departement = :departement AND region = :region) WHERE uid = :uid;

-- name : update_utilisateur_travail!
UPDATE Utilisateur SET trid=:(SELECT trid FROM Travail JOIN Commerce USING(cid) WHERE cnomn =:cnom AND cid = :cid) WHERE uid = :uid;

-- name : update_utilisateur_add!
UPDATE Commerce SET aid=:(SELECT aid FROM Adresse WHERE ville = :ville AND departement =:departement AND region =:region) WHERE cid = :cid;

-- name : del_utilisateur!
DELETE FROM Utilisateur WHERE uid = :uid;






-- SHOP INFO

-- name : get_type_retail_all
SELECT tnom FROM Type;

-- name : get_infos_retail_all
SELECT cnom, surface, tnom, ville, departement, region 
FROM Utilisateur JOIN Adresse USING(aid) JOIN Type USING (tyid)
WHERE cid = :cid;

-- name : get_infos_employees_retail
SELECT cnom, uprenom, unom, umail
FROM Commerce
JOIN Travail USING(cid)
JOIN Utilisateur USING(tyid)
WHERE cid = :cid;

-- name : set_retail!
INSERT INTO Commerce(cid, cnom, surface, tyid, aid)
  VALUES ((SELECT 1 + max(cid) FROM Commerce), :cnom, :surface, (SELECT tyid FROM Type WHERE tnom =:tnom), (SELECT aid FROM Adresse WHERE ville = :ville AND departement = :departement AND region = :region));


-- name : add_retail!
INSERT INTO Commerce(cid, cnom, surface, tyid, aid)
  VALUES ((SELECT 1 + max(cid) FROM Commerce), :cnom, :surface, (SELECT tyid FROM Type WHERE tnom =:tnom),
          (SELECT aid FROM Adresse WHERE ville = :ville AND departement = :departement AND region = :region));




-- name : set_travail!
INSERT INTO Travail(trid, cid)
  VALUES ((SELECT 1 +(SELECT max(trid) FROM Travail)), :cid);

-- name : update_retail_surface!
UPDATE Commerce SET surface=:surface WHERE cid = :cid;

-- name : update_retail_type!
UPDATE Commerce SET tyid=:(SELECT tyid FROM Type WHERE tnom = :tnom) WHERE cid = :cid;

-- name : del_retail!
DELETE FROM Commerce WHERE cid = :cid;




-- FREQUENCY INFO

-- name : get_fréquentation_all_group_by_cid
SELECT cnom, cid, creneaux_horaires, nb_client, nb_contact FROM Fréquentation JOIN Commerce USING(cid) GROUP BY cnom;

-- name : get_fréquentation_all_group_by_tyid
SELECT tnom, creneaux_horaires, nb_client, nb_contact FROM Fréquentation JOIN Commerce USING(cid) JOIN Type USING(tyid) GROUP BY tnom;

-- name : set_fréquentation!
INSERT INTO Fréquentation(fid, creneaux_horaires, date_f, nb_client, nb_contact, cid)  VALUES((SELECT 1 +(SELECT max(fid) FROM Fréquentation), '9h-10h', date(current_time),
  SELECT COUNT(uid) FROM Utilisateur WHERE --position within commerce--
  AND date(date_pos)= date(current_time) AND (SELECT DATEPART(hh,date_pos)) = 9,
  SELECT COUNT(conid) FROM Contact WHERE --position within commerce--
  AND date(date_pos)= date(current_time) AND (SELECT DATEPART(hh,date_pos)) = 9,
  SELECT cid FROM Commerce WHERE cnom =: cnom);

INSERT INTO Fréquentation(fid, creneaux_horaires, date_f, nb_client, nb_contact, cid)  VALUES((SELECT 1 +(SELECT max(fid) FROM Fréquentation), '10h-11h', date(current_time),
  SELECT COUNT(uid) FROM Utilisateur WHERE --position within commerce--
  AND date(date_pos)= date(current_time) AND (SELECT DATEPART(hh,date_pos)) = 10,
  SELECT COUNT(conid) FROM Contact WHERE --position within commerce--
  AND date(date_pos)= date(current_time) AND (SELECT DATEPART(hh,date_pos)) = 10,
  SELECT cid FROM Commerce WHERE cnom =: cnom);

INSERT INTO Fréquentation(fid, creneaux_horaires, date_f, nb_client, nb_contact, cid)  VALUES((SELECT 1 +(SELECT max(fid) FROM Fréquentation), '11h-12h', date(current_time),
  SELECT COUNT(uid) FROM Utilisateur WHERE --position within commerce--
  AND date(date_pos)= date(current_time) AND (SELECT DATEPART(hh,date_pos)) = 11,
  SELECT COUNT(conid) FROM Contact WHERE --position within commerce--
  AND date(date_pos)= date(current_time) AND (SELECT DATEPART(hh,date_pos)) = 11,
  SELECT cid FROM Commerce WHERE cnom =: cnom);

INSERT INTO Fréquentation(fid, creneaux_horaires, date_f, nb_client, nb_contact, cid)  VALUES((SELECT 1 +(SELECT max(fid) FROM Fréquentation), '12h-13h', date(current_time),
  SELECT COUNT(uid) FROM Utilisateur WHERE --position within commerce--
  AND date(date_pos)= date(current_time) AND (SELECT DATEPART(hh,date_pos)) = 12,
  SELECT COUNT(conid) FROM Contact WHERE --position within commerce--
  AND date(date_pos)= date(current_time) AND (SELECT DATEPART(hh,date_pos)) = 12,
  SELECT cid FROM Commerce WHERE cnom =: cnom);

INSERT INTO Fréquentation(fid, creneaux_horaires, date_f, nb_client, nb_contact, cid)  VALUES((SELECT 1 +(SELECT max(fid) FROM Fréquentation), '13h-14h', date(current_time),
  SELECT COUNT(uid) FROM Utilisateur WHERE --position within commerce--
  AND date(date_pos)= date(current_time) AND (SELECT DATEPART(hh,date_pos)) = 13,
  SELECT COUNT(conid) FROM Contact WHERE --position within commerce--
  AND date(date_pos)= date(current_time) AND (SELECT DATEPART(hh,date_pos)) = 13,
  SELECT cid FROM Commerce WHERE cnom =: cnom);

INSERT INTO Fréquentation(fid, creneaux_horaires, date_f, nb_client, nb_contact, cid)  VALUES((SELECT 1 +(SELECT max(fid) FROM Fréquentation), '14h-15h', date(current_time),
  SELECT COUNT(uid) FROM Utilisateur WHERE --position within commerce--
  AND date(date_pos)= date(current_time) AND (SELECT DATEPART(hh,date_pos)) = 14,
  SELECT COUNT(conid) FROM Contact WHERE --position within commerce--
  AND date(date_pos)= date(current_time) AND (SELECT DATEPART(hh,date_pos)) = 14,
  SELECT cid FROM Commerce WHERE cnom =: cnom);

INSERT INTO Fréquentation(fid, creneaux_horaires, date_f, nb_client, nb_contact, cid)  VALUES((SELECT 1 +(SELECT max(fid) FROM Fréquentation), '15h-16h', date(current_time),
  SELECT COUNT(uid) FROM Utilisateur WHERE --position within commerce--
  AND date(date_pos)= date(current_time) AND (SELECT DATEPART(hh,date_pos)) = 15,
  SELECT COUNT(conid) FROM Contact WHERE --position within commerce--
  AND date(date_pos)= date(current_time) AND (SELECT DATEPART(hh,date_pos)) = 15,
  SELECT cid FROM Commerce WHERE cnom =: cnom);

INSERT INTO Fréquentation(fid, creneaux_horaires, date_f, nb_client, nb_contact, cid)  VALUES((SELECT 1 +(SELECT max(fid) FROM Fréquentation), '16h-17h', date(current_time),
  SELECT COUNT(uid) FROM Utilisateur WHERE --position within commerce--
  AND date(date_pos)= date(current_time) AND (SELECT DATEPART(hh,date_pos)) = 16,
  SELECT COUNT(conid) FROM Contact WHERE --position within commerce--
  AND date(date_pos)= date(current_time) AND (SELECT DATEPART(hh,date_pos)) = 16,
  SELECT cid FROM Commerce WHERE cnom =: cnom);

INSERT INTO Fréquentation(fid, creneaux_horaires, date_f, nb_client, nb_contact, cid)  VALUES((SELECT 1 +(SELECT max(fid) FROM Fréquentation), '17h-18h', date(current_time),
  SELECT COUNT(uid) FROM Utilisateur WHERE --position within commerce--
  AND date(date_pos)= date(current_time) AND (SELECT DATEPART(hh,date_pos)) = 17,
  SELECT COUNT(conid) FROM Contact WHERE --position within commerce--
  AND date(date_pos)= date(current_time) AND (SELECT DATEPART(hh,date_pos)) = 17,
  SELECT cid FROM Commerce WHERE cnom =: cnom);

-- name : del-fréquentation!
DELETE Fréquentation WHERE DATEDIFF(day, date_f, date(current_time)) >= 7;



-- CONTACT INFO

-- name : update_contact
WITH normal_contact_less_than_2 AS
(
     SELECT DISTINCT user1.uid AS user_1,  
       user2.uid AS user_2, 
       pos1.date_pos AS date_de_contact,
       pos1.longitude AS longitude,
       pos1.latitude AS latitude,
       (6371*ACOS(SIN(RADIANS(pos1.latitude))*SIN(RADIANS(pos2.latitude)) + COS(RADIANS(pos1.latitude))*COS(RADIANS(pos2.latitude))*COS(RADIANS(pos1.longitude)-RADIANS(pos2.longitude)))) as distance_in_km
    FROM Utilisateur AS user1 
    CROSS JOIN Utilisateur AS user2
    JOIN Position_Utilisateur AS pos1 ON pos1.uid = user1.uid
    JOIN Position_Utilisateur AS pos2 ON pos2.uid = user2.uid
    WHERE user1.uid <> user2.uid AND distance_in_km < 0.002
    ORDER BY distance_in_km DESC
)

--WITH duree_of_contact AS 
--(
--  SELECT 5*COUNT(*)AS duree_in_sec ,user_1,user_2 
--  FROM normal_contact_less_than_2
--  GROUP BY user_1, user_2
--)
UPDATE Contact 
SET uid = (SELECT user_1 FROM normal_contact_less_than_2 ),
uid_1 =(SELECT user_2 FROM normal_contact_less_than_2),
longitude =(SELECT longitude FROM normal_contact_less_than_2),
latitude =(SELECT latitude FROM normal_contact_less_than_2);
--duree = (SELECT duree_in_sec FROM duree_of_contact);
