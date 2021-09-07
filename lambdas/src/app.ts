import 'reflect-metadata'
import {Container} from 'typedi'
import { ToggleService } from './toggle/ToggleService'

const toggleService = Container.get(ToggleService);

exports.getToggle = async function (event: any) {
    console.log("request:", JSON.stringify(event, undefined, 2))
    return sendRes(200, toggleService.getToggle('lmig...'))
}

exports.setToggle = async function(event: any) {
    return sendRes(200, { message: 'not yet implemented' })
}

const sendRes = (status: number, body: any) => {
    var response = {
        statusCode: status,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }
    return response
}