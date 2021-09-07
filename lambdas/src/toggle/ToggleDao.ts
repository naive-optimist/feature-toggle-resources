import AWS from 'aws-sdk'
import { Service } from 'typedi';

@Service()
export class ToggleDao {

  public getToggle(name: string) {
    console.log(`ToggleDao.getToggle(${name})`)
    return [
      {
        feature: 'lmig.acee.policy.graph',
        toggle: 'OFF'
      },{
        feature: 'lmig.acee.policy.entitlement_store',
        toggle: 'ON'
      }
    ]
  }
}



