BEGIN;

INSERT INTO "user" ("first_name", "last_name", "email", "password", "img_url", "is_admin") VALUES
('alex', 'viard', 'alex-viard@hotmail.fr', 'Trucbidule3+', 'https://zupimages.net/up/21/30/m72v.jpg', true),
('Louis', 'Villain', 'villainl@hotmail.com', 'Azerty1&', 'https://zupimages.net/up/21/30/m72v.jpg', true),
('tata', 'totonom', 'tata@email.fr', 'tatapass', 'https://i54.servimg.com/u/f54/20/18/37/31/img_0310.jpg', false),
('plop', 'totonom', 'plop@email.fr', 'plop', 'urlimg3.com', false),
('coucou', 'totonom', 'coucou@email.fr', 'coucou', 'urlimg4.com', false);

INSERT INTO "activity" ("name", "photo_url", "formatted_address", "lat", "lng") VALUES
('Musée du Louvre', 'https://lh3.googleusercontent.com/p/AF1QipP5NKq1lfp-fpMXGkXdhwy_EJHLtfe_droiY2pC=s1600-w400', 'Rue de Rivoli, 75001 Paris, France', 48.8606111, 2.337644),
('Cathédrale Notre-Dame de Paris', 'https://lh3.googleusercontent.com/p/AF1QipNifFPRzb_5UpiJZvVicihgck6bHh6bVP3KR4Rj=s1600-w400', '6 Parvis Notre-Dame - Pl. Jean-Paul II, 75004 Paris, France', 48.85296820000001, 2.3499021),
('Jardin des Tuileries', 'https://lh3.googleusercontent.com/p/AF1QipMb68F8afdnG3lsIX-ZQYtMNx74J04IaFIdGJzc=s1600-w400', 'Place de la Concorde, 75001 Paris, France', 48.8634916, 2.3274943);

INSERT INTO "user_has_activity" ("user_id", "activity_id") VALUES
(1, 1),
(1, 2),
(2, 3);

INSERT INTO "activity_used" ("title", "start_date", "end_date", "lat", "lng", "user_id") VALUES 
('Musée du Louvre', '2021-07-28T09:35', '2021-07-28T11:00', 48.8606111, 2.337644, 1),
('Jardin des Tuileries', '2021-07-28T12:00', '2021-07-28T13:30', 48.8634916, 2.3274943, 2),
('Cathédrale Notre-Dame de Paris', '2021-07-27T12:00','2021-07-27T13:30', 48.85296820000001, 2.3499021, 1),
('Musée du Louvre', '2021-07-28T09:35', '2021-07-28T11:30', 48.8606111, 2.337644, 2);

COMMIT;
