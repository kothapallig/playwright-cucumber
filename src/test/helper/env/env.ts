import * as dotenv from 'dotenv'
import path = require('path')

export const getEnv = ()=>{
    dotenv.config({
        override: true,
        path: `src/test/helper/env/.env.${process.env.ENV}`
    })
}