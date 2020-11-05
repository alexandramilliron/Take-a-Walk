CREATE TABLE "User" (
  "user_id" SERIAL PRIMARY KEY,
  "username" varchar,
  "email" varchar,
  "password" varchar
);

CREATE TABLE "Trail" (
  "trail_id" SERIAL PRIMARY KEY,
  "latitude" float NOT NULL,
  "longitude" float NOT NULL,
  "name" varchar,
  "length" float,
  "location" varchar
);

CREATE TABLE "Restaurant" (
  "rest_id" SERIAL PRIMARY KEY,
  "latitude" float NOT NULL,
  "longitude" float NOT NULL,
  "price" varchar,
  "name" varchar, 
  "location" varchar 
);

CREATE TABLE "TrailRating" (
  "trail_rating_id" SERIAL PRIMARY KEY,
  "user_id" int,
  "trail_id" int,
  "trail_comment" text,
  "trail_star" int,
  "difficulty_level" int,
  "crowded" boolean
);

CREATE TABLE "RestRating" (
  "rest_rating_id" SERIAL PRIMARY KEY,
  "user_id" int,
  "rest_id" int,
  "rest_comment" text,
  "rest_star" int,
  "masks_worn" boolean,
  "socially_distanced" boolean,
  "outdoor_seating" boolean
);

CREATE TABLE "Itinerary" (
  "itin_id" SERIAL PRIMARY KEY,
  "user_id" int,
  "itin_date" datetime
);

CREATE TABLE "ItineraryTrail" (
  "itin_trail_id" SERIAL PRIMARY KEY,
  "itin_id" int,
  "trail_id" int
);

CREATE TABLE "ItineraryRest" (
  "itin_rest_id" SERIAL PRIMARY KEY,
  "itin_id" int,
  "rest_id" int
);

-- ALTER TABLE "TrailRating" ADD FOREIGN KEY ("user_id") REFERENCES "User" ("user_id");

-- ALTER TABLE "TrailRating" ADD FOREIGN KEY ("trail_id") REFERENCES "Trail" ("trail_id");

-- ALTER TABLE "RestRating" ADD FOREIGN KEY ("user_id") REFERENCES "User" ("user_id");

-- ALTER TABLE "RestRating" ADD FOREIGN KEY ("rest_id") REFERENCES "Restaurant" ("rest_id");

-- ALTER TABLE "Itinerary" ADD FOREIGN KEY ("user_id") REFERENCES "User" ("user_id");

-- ALTER TABLE "ItineraryTrail" ADD FOREIGN KEY ("itin_id") REFERENCES "Itinerary" ("itin_id");

-- ALTER TABLE "ItineraryTrail" ADD FOREIGN KEY ("trail_id") REFERENCES "Trail" ("trail_id");

-- ALTER TABLE "ItineraryRest" ADD FOREIGN KEY ("itin_id") REFERENCES "Itinerary" ("itin_id");

-- ALTER TABLE "ItineraryRest" ADD FOREIGN KEY ("rest_id") REFERENCES "Restaurant" ("rest_id");
