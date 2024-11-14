'use strict';
import { MongoClient } from 'mongodb';
import { faker } from '@faker-js/faker';

const generateEmployeesAndTags = async () => {
  const mongoClient = new MongoClient('mongodb://localhost/');
  await mongoClient.connect();
  const dataBase = mongoClient.db('employees');
  const employeesCollection = dataBase.collection('employees');
  const tagsCollection = dataBase.collection('tags');
  console.log('Connection to database successful!');

  await employeesCollection.deleteMany({});
  await tagsCollection.deleteMany({});
  console.log('All existing employees and tags deleted!');

  const tags = [];
  console.log('Start of tag generation');
  for (let i = 0; i < 20; i++) {
    const tag = {
      name: faker.lorem.word(),
    };
    tags.push(tag);
  }

  try {
    const insertTagsData = tags.map((tag) => ({
      insertOne: {
        document: tag,
      },
    }));
    await tagsCollection.bulkWrite(insertTagsData);
    console.log('Tags generation was successful!');
  } catch (err) {
    console.error('Error during tag generation:', err);
  }
  const offices = ['Riga', 'Tallinn', 'Vilnius'];
  const employees = [];

  console.log('Start of employee generation');
  for (let i = 0; i < 20; i++) {
    const employeeTags = Array.from(
      { length: faker.number.int({ min: 5, max: 8 }) },
      () => {
        const randomIndex = faker.number.int({ min: 0, max: tags.length - 1 });
        return tags[randomIndex].name;
      },
    );

    const employee = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      office: offices[i % offices.length],
      phoneNumber: faker.phone.number({ style: 'national' }),
      tags: employeeTags,
    };
    employees.push(employee);
  }

  try {
    const insertEmployeesData = employees.map((employee) => ({
      insertOne: {
        document: employee,
      },
    }));
    await employeesCollection.bulkWrite(insertEmployeesData);
    console.log('Employee generation was successful!');
  } catch (err) {
    console.error('Error during employee generation:', err);
  }

  await mongoClient.close();
  console.log('Database connection closed.');
};

generateEmployeesAndTags();
