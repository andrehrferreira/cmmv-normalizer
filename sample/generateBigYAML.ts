import * as fs from 'fs';
import { faker } from '@faker-js/faker';
import { stringify } from 'yaml';

interface Customer {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    registrationDate: string;
}

const generateCustomerData = (id: number): Customer => ({
    id,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number({ style: 'national' }),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    registrationDate: faker.date.past().toISOString(),
});

const generateLargeYAML = async (
    filePath: string,
    totalRecords: number,
): Promise<void> => {
    const writeStream = fs.createWriteStream(filePath);

    for (let i = 1; i <= totalRecords; i++) {
        const customer = generateCustomerData(i);
        const yamlData = stringify([customer]).trim();

        writeStream.write(`${yamlData}\n`);

        if (i % 10000 === 0) console.log(`Generated ${i} records...`);
    }

    writeStream.end();
    console.log(
        `YAML file with ${totalRecords} records generated at ${filePath}`,
    );
};

generateLargeYAML('./sample/large-customers.yml', 1000);