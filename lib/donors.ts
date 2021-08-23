import {
  DynamoDBClient,
  ScanCommand,
  PutItemCommand,
  DeleteItemCommand,
} from '@aws-sdk/client-dynamodb';
import { Credentials } from 'aws-sdk';
export default class Donors {
  dynamodb: DynamoDBClient;
  tableName: string;

  constructor(accessKeyId: string, secretAccessKey: string) {
    const credentials = new Credentials({
      accessKeyId,
      secretAccessKey,
    });

    this.dynamodb = new DynamoDBClient({ region: 'eu-central-1', credentials });
    this.tableName = 'beer-donors';
  }

  async addName(id: string, name: string) {
    const command = new PutItemCommand({
      TableName: this.tableName,
      Item: {
        id: { S: id },
        name: { S: name },
      },
    });

    try {
      await this.dynamodb.send(command);
    } catch (error) {
      console.log(`Could not add donor "${name}". error=`, error);
    }
  }

  async removeName(id: string) {
    const command = new DeleteItemCommand({
      TableName: this.tableName,
      Key: {
        id: { S: id },
      },
    });

    try {
      await this.dynamodb.send(command);
    } catch (error) {
      console.log(`Could not delete donor "${id}". error=`, error);
    }
  }

  async getNames(): Promise<string[]> {
    const command = new ScanCommand({ TableName: this.tableName });

    try {
      const result = await this.dynamodb.send(command);
      return result.Items.map((item) => item.name.S);
    } catch (error) {
      console.log('Could not fetch beer donors from DB. error=', error);
      return [];
    }
  }
}
