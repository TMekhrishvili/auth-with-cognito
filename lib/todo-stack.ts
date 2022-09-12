import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { LambdaIntegrations } from "./LambdaIntegrations";
import { RestApi } from "aws-cdk-lib/aws-apigateway";

export class TodoStack extends cdk.Stack {
  private api = new RestApi(this, "todo-api");
  private lambdaIntegrations = new LambdaIntegrations(this);

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // lambda-api integration
    this.api.root.addMethod("POST", this.lambdaIntegrations.create());
    this.api.root.addMethod("GET", this.lambdaIntegrations.get());
    this.api.root.addMethod("PUT", this.lambdaIntegrations.update());
    this.api.root.addMethod("DELETE", this.lambdaIntegrations.delete());
  }
}
