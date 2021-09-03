#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { TogglesStack } from '../lib/toggles-stack';

const app = new cdk.App();
new TogglesStack(app, 'TogglesStack');
