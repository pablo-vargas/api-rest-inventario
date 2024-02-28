import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrencyEntity } from './entity/currency.entity';
import { Repository } from 'typeorm';
import { convertToMilliseconds, totalRequestTime } from './util/convert-millisecond';
import { SchedulerRegistry } from '@nestjs/schedule';
import { AxiosRequestConfig } from 'axios';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
@Injectable()
export class CurrenciesService {

    URL = "https://api.currencyapi.com/v3/latest"
    APIKEY = "cur_live_z8P2P2QdXXmPmF1Bv0NR1HbDXVJp5Puqx0S6Ajz5"
    TIMEOUT=5000//5segundos
    
    constructor(
        @InjectRepository(CurrencyEntity)
        private entity: Repository<CurrencyEntity>,
        private schedulerRegistry: SchedulerRegistry,
        private httpService: HttpService
    ) {
        try {
            let timeMilliseconds = convertToMilliseconds(process.env.JOB || "")
            this.getCurrenciesLatest("currency", timeMilliseconds)
         //   this.mapData(this.CURRENCIES)
        } catch (error) {
            Logger.log("Error en el formato del tiempo")
        }

    }

    async getAll() {
        return await this.entity.find();
    }

    async getCurrenciesLatest(name: string, milliseconds: number) {
        const callback = async () => {

            let startTime = new Date().getTime();//tiempo en milisegundos

            const config: AxiosRequestConfig = {
                headers: {
                    'APIKEY': this.APIKEY,
                },
                timeout: this.TIMEOUT, 
            };
            this.httpService.get(this.URL, config)
                .pipe(map(response => response.data))
                .subscribe(
                    data => {
                        let endTime = new Date().getTime();
                        let timeRequest =endTime-startTime
                        console.log(totalRequestTime(timeRequest));
                        this.mapData(data.data)
                    },
                    error => {
                        console.error(error.message);
                    }
                )
        };

        const interval = setInterval(callback, milliseconds);
        this.schedulerRegistry.addInterval(name, interval);
    }

    async mapData(responseHttp:any){
        for (const key in responseHttp.data) {
            let obj = responseHttp.data[key]
            await this.saveDivisa({currency:obj.code,value:obj.value})
        }
    }
    
    async saveDivisa(data:{currency:string,value:number}){
        let exist = await this.entity.findOne({where:{currency:data.currency}})
        if(exist){
            let update = await this.entity.update({id:exist.id},data)
            if(update.affected== 1){
                exist.value = data.value
            }else{
                throw new Error("Error al actualizar la divisa")
            }
        }else{
            exist = await this.entity.save(data)
            if(!exist)  throw new Error("Error al crear la divisa")
        }
        return exist
    }
}
