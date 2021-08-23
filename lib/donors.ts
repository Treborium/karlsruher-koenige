import {
  DynamoDBClient,
  ScanCommand,
  PutItemCommand,
  AttributeValue,
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

  async addName(name: string) {
    const command = new PutItemCommand({
      TableName: this.tableName,
      Item: {
        id: { S: `${name}-${Date.now()}` },
        name: { S: name },
      },
    });

    try {
      await this.dynamodb.send(command);
    } catch (error) {
      console.log('Could not fetch beer donors from DB. error=', error);
    }
  }

  async removeName(name: string): Promise<string[]> {
    return [];
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
