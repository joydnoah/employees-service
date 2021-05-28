export const createMessageTable = `
DROP TABLE IF EXISTS employees;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS employees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR,
  title VARCHAR,
  userName VARCHAR,
  hireDate date,
  age integer
  )
  `;

export const insertMessages = `
INSERT INTO employees(name, userName, title, age, hireDate)
VALUES ('Giacomo Guilizzoni', 'Peldi', 'Founder & CEO', 40, '2017-10-01'),
      ('Marco Botton', 'Marcopolo', 'Tuttofare', 38, '2001-01-10'),
      ('Mariah Maclachlan', 'Patata', 'Better Half', 41, '2016-02-01'),
      ('Valerine Liberty', 'val', 'Head Chef', 30, '2018-03-02')
`;

export const dropMessagesTable = 'DROP TABLE employees';
