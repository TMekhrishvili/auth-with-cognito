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
    body: "Hello from get",
  };
  const id = event.queryStringParameters?.id;
  try {
    if (id) {
      const queryResponse = await dbClient
        .query({
          TableName: "TodoTable",
          KeyConditionExpression: "#zz = :zzzz",
          ExpressionAttributeNames: {
            "#zz": "id",
          },
          ExpressionAttributeValues: {
            ":zzzz": id,
          },
        })
        .promise();
      response.body = JSON.stringify(queryResponse);
    } else {
      const queryResponse = await dbClient
        .scan({
          TableName: "TodoTable",
        })
        .promise();
      response.body = JSON.stringify(queryResponse);
    }
  } catch (error: any) {
    response.statusCode = 500;
    response.body = error.message;
  }
  return response;
}

export { handler };
