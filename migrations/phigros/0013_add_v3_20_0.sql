INSERT INTO Composer (ComposerName) VALUES ("Knighthood");
INSERT INTO Song (SongName, ComposerId, Bpm, SongLength, AddVersion, ChapterId) VALUES ("[NWAD]", 257, 210, 160, "3.20.0", 24);
INSERT INTO Chart (SongId, DiffEZ, DiffHD, DiffIN, DiffAT, NoteEZ, NoteHD, NoteIN, NoteAT) VALUES (312, 5, 9, 15, NULL, 343, 782, 1259, NULL);

INSERT INTO Composer (ComposerName) VALUES ("NAMV");
INSERT INTO Song (SongName, ComposerId, Bpm, SongLength, AddVersion, ChapterId) VALUES ("Devastating History", 258, 110, 142, "3.20.0", 32);
INSERT INTO Chart (SongId, DiffEZ, DiffHD, DiffIN, DiffAT, NoteEZ, NoteHD, NoteIN, NoteAT) VALUES (313, 6, 11, 15, NULL, 288, 620, 1432, NULL);

UPDATE Chart SET DiffAT = 16, NoteAT = 1351 WHERE SongId = 286;