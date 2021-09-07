import {App, CfnOutput, Stack, StackProps, RemovalPolicy} from '@aws-cdk/core';
import { Runtime, Function, Code, DockerImageFunction, DockerImageCode } from '@aws-cdk/aws-lambda';
import { Table, AttributeType, BillingMode } from '@aws-cdk/aws-dynamodb';
import apigw = require('@aws-cdk/aws-apigatewayv2');
import integrations = require('@aws-cdk/aws-apigatewayv2-integrations');
import * as path from 'path'

export class TogglesStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    //DynamoDB Table
    const toggleTable = new Table(this, 'Toggles', {
      tableName: 'toggles-table',
      partitionKey: { name: 'feature', type: AttributeType.STRING },
      serverSideEncryption: true, 
      timeToLiveAttribute: 'ttl',
      billingMode: BillingMode.PAY_PER_REQUEST, 
      removalPolicy: RemovalPolicy.DESTROY,
    })

    // defines AWS Lambda
    const getToggleLambda = new Function(this, 'GetToggleHandler', {
      runtime: Runtime.NODEJS_12_X,      
      code: Code.fromAsset('./lambdas'),  
      handler: './lib/app.getToggle',                
      environment: {
        TOGGLE_TABLE_NAME: toggleTable.tableName
      }
    })
    toggleTable.grantReadWriteData(getToggleLambda);

    const setToggleLambda = new Function(this, 'SetToggleHandler', {
      runtime: Runtime.NODEJS_12_X,      
      code: Code.fromAsset('./lambdas'),  
      handler: './lib/app.setToggle',                
      environment: {
        TOGGLE_TABLE_NAME: toggleTable.tableName
      }
    })
    toggleTable.grantReadWriteData(setToggleLambda);

    // defines an API Gateway Http API resource backed by our "dynamoLambda" function.
    let api = new apigw.HttpApi(this, 'Toggle-API', {
      defaultIntegration: new integrations.LambdaProxyIntegration({
        handler: getToggleLambda
      })
    })

   new CfnOutput(this, 'HTTP API Url', {
     value: api.url ?? 'Something went wrong with the deploy'
   })
  }
}
