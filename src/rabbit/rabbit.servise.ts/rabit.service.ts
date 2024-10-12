import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { environment } from 'src/environment/environment';



@Injectable()
export class RabitService {

  constructor() {

  }

  public async sendMessage(eventName:string,message: any) {
    const client: ClientProxy = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [environment.rabbitMqUrl],
        queue: 'product_queue',
        queueOptions: {
          durable: false
        },
      },
   
    });
    await client.emit({event:eventName}, message);
  }
}
