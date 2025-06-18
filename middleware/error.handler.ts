import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Logger } from "@nestjs/common";
import { timeStamp } from "console";

@Catch(HttpException)
export class Errorhandler implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        let context= host.switchToHttp()
        let req = context.getRequest()
        let res= context.getResponse()
        let satus = exception.getStatus()

        Logger.error(`${req.url}__${req.method}`)

        res.status(satus).json({
            status:satus,
            path:req.url,
            timeStamp:new Date().toISOString()

        })
    }
}