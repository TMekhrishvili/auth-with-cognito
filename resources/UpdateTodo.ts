import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { DynamoDB } from "aws-sdk";

const dbClient = new DynamoDB.DocumentClient();

async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: "Hello from update",
  };
  const requestBody = JSON.parse(event.body!);
  const id = event.queryStringParameters?.id || "";
  const requestBodyKey = Object.keys(requestBody)[0];
  const requestBodyValue = requestBody[requestBodyKey];
  if (id) {
    try {
      const updatedResult = await dbClient
        .update({
          TableName: "TodoTable",
          Key: {
            id,
          },
          UpdateExpression: "set #zzzNew = :new",
          ExpressionAttributeValues: {
            ":new": requestBodyValue,
          },
          ExpressionAttributeNames: {
            "#zz": requestBodyKey,
          },
          ReturnValues: "UPDATED_NEW",
        })
        .promise();

      response.body = JSON.stringify(updatedResult);
    } catch (error: any) {
      response.statusCode = 500;
      response.body = error.message;
    }
  }
  return response;
}

export { handler };
