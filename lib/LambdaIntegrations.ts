import { Stack } from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { AttributeType, Table } from "aws-cdk-lib/aws-dynamodb";

export class LambdaIntegrations {
  private table: Table;

  constructor(private stack: Stack) {
    this.table = new Table(this.stack, "TodoTable", {
      tableName: "TodoTable",
      partitionKey: {
        name: "id",
        type: AttributeType.STRING,
      },
    });
  }

  // methods
  public create() {
    const createFunc = new NodejsFunction(this.stack, "create-todo", {
      entry: "resources/CreateTodo.ts",
      handler: "handler",
      functionName: "createTodoLambda",
    });
    this.table.grantWriteData(createFunc);
    return new LambdaIntegration(createFunc);
  }

  public get() {
    const getFunc = new NodejsFunction(this.stack, "get-todo", {
      entry: "resources/GetTodo.ts",
      handler: "handler",
      functionName: "getTodoLambda",
    });
    this.table.grantReadData(getFunc);
    return new LambdaIntegration(getFunc);
  }

  public update() {
    const updateFunc = new NodejsFunction(this.stack, "update-todo", {
      entry: "resources/UpdateTodo.ts",
      handler: "handler",
      functionName: "updateTodoLambda",
    });
    this.table.grantWriteData(updateFunc);
    return new LambdaIntegration(updateFunc);
  }

  public delete() {
    const deleteFunc = new NodejsFunction(this.stack, "delete-todo", {
      entry: "resources/DeleteTodo.ts",
      handler: "handler",
      functionName: "deleteTodoLambda",
    });
    this.table.grantWriteData(deleteFunc);
    return new LambdaIntegration(deleteFunc);
  }
}
