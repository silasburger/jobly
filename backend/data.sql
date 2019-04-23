DROP DATABASE IF EXISTS "jobly";

CREATE DATABASE "jobly";

\c "jobly"  

  CREATE TABLE companies (
    handle TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    num_employees INTEGER, 
    description TEXT, 
    logo_url TEXT
  ); 

 CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    salary FLOAT NOT NULL, 
    equity FLOAT NOT NULL CHECK (equity<=1), 
    company_handle TEXT REFERENCES companies ON DELETE CASCADE,
    date_posted timestamp without time zone NOT NULL
  );

 CREATE TABLE users (
    username TEXT PRIMARY KEY,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    photo_url TEXT, 
    is_admin BOOLEAN NOT NULL DEFAULT false
  );

  INSERT INTO users (username, password, first_name, last_name, email, photo_url, is_admin) 
  VALUES ('silas', 'silas', 'Hasier', 'Pastor', 'pastor@hasier.com', 'http://pix.com/gross.jpeg', true) 
  RETURNING username, first_name, last_name, email, photo_url;

  INSERT INTO companies (handle, name, num_employees, description, logo_url) 
  VALUES ('LLL', 'lululemon', 13000, 'the dopest yoga clothes', 'https://hillsdale.com/wp-content/uploads/2018/05/lululemon-logo-for-web.jpg') 
  RETURNING handle, name, num_employees, description, logo_url;

  INSERT INTO companies (handle, name, num_employees, description, logo_url) 
  VALUES ('MCD', 'McDonalds', 1000000, 'put a smile on', 'http://webneel.com/daily/sites/default/files/images/daily/06-2013/3-mcdonalds-mcdiabetes-logo-parody.jpg') 
  RETURNING handle, name, num_employees, description, logo_url;

  INSERT INTO companies (handle, name, num_employees, description, logo_url) 
  VALUES ('VOL', 'Volunteers', 0, 'put a smile on!', 'http://webneel.com/daily/sites/default/files/images/daily/06-2013/3-mcdonalds-mcdiabetes-logo-parody.jpg') 
  RETURNING handle, name, num_employees, description, logo_url;

  INSERT INTO jobs (title, salary, equity, company_handle, date_posted) 
  VALUES ('bluntroller', 3000000, 1, 'VOL', LOCALTIMESTAMP) 
  RETURNING id, title, salary, equity, company_handle, date_posted;

  INSERT INTO jobs (title, salary, equity, company_handle, date_posted) 
  VALUES ('SWE', 300000, 0.5, 'LLL', LOCALTIMESTAMP) 
  RETURNING id, title, salary, equity, company_handle, date_posted;