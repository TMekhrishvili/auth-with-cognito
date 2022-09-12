import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { v4 } from "uuid";
import { DynamoDB } from "aws-sdk";
import { ValidationError, validator } from "../shared/ValidationError";

const dbClient = new DynamoDB.DocumentClient();

async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: "Hello from create",
  };

  try {
    let item = JSON.parse(event.body!);
    if (item.completed === undefined) item.completed = false;
    item.id = v4();
    validator(item);
    await dbClient
      .put({
        TableName: "TodoTable",
        Item: item,
      })
      .promise();

    response.body = `Todo was created, id: ${item.id}`;
  } catch (error: any) {
    if (error instanceof ValidationError) {
      response.statusCode = 403;
    } else {
      response.statusCode = 500;
    }
    response.body = error.message;
  }
  return response;
}

export { handler };
