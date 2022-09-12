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
    body: "Hello from delete",
  };
  const id = event.queryStringParameters?.id;
  if (id) {
    try {
      await dbClient
        .delete({
          TableName: "TodoTable",
          Key: {
            id,
          },
        })
        .promise();
      response.body = "item was successfully deleted";
    } catch (error: any) {
      response.statusCode = 500;
      response.body = error.message;
    }
  } else {
    response.body = `provide id`;
  }
  return response;
}

export { handler };
