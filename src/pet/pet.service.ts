import 'dotenv/config';
import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';

import { CreatePetDto, UpdatePetDto } from './dto/pet.dto';
import { dynamoDBClient } from '../commons/aws/dynamoClient';

const { PET_TABLE_NAME } = process.env;

@Injectable()
export class PetService {
  async create(createPetDto: CreatePetDto) {
    return await dynamoDBClient()
      .put({
        TableName: PET_TABLE_NAME,
        Item: {
          petId: uuid(),
          name: createPetDto.name,
          species: createPetDto.species,
          birthYear: createPetDto.birthYear,
        },
      })
      .promise();
  }

  async findAll() {
    const results = await dynamoDBClient()
      .scan({
        TableName: PET_TABLE_NAME,
      })
      .promise();

    return results.Items;
  }

  async findOne(petId: string) {
    const result = await dynamoDBClient()
      .get({
        TableName: PET_TABLE_NAME,
        Key: { petId },
      })
      .promise();

    return result.Item;
  }

  async update(petId: string, updatePetDto: UpdatePetDto) {
    const updated = await dynamoDBClient()
      .update({
        TableName: PET_TABLE_NAME,
        Key: { petId },
        UpdateExpression:
          'set #name = :name, species = :species, birthYear = :birthYear',
        ExpressionAttributeNames: {
          '#name': 'name',
        },
        ExpressionAttributeValues: {
          ':name': updatePetDto.name,
          ':species': updatePetDto.species,
          ':birthYear': updatePetDto.birthYear,
        },
        ReturnValues: 'ALL_NEW',
      })
      .promise();

    return updated.Attributes;
  }

  async remove(petId: string) {
    return await dynamoDBClient()
      .delete({
        TableName: PET_TABLE_NAME,
        Key: { petId },
      })
      .promise();
  }
}
