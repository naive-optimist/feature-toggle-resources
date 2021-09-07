import { Service } from 'typedi';
import { ToggleDao } from './ToggleDao';

@Service()
export class ToggleService {

    constructor(private toggleDao: ToggleDao){}

    public getToggle(name: string){
        return this.toggleDao.getToggle(name)
    }

    public getTogglesByProduct(name: string){
        return { message: 'Not yet implemented' }
    }
}