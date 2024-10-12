import * as dotenv from 'dotenv'
dotenv.config();
export const environment = {
    mongoDBUrl:process.env.MONGODB_URL,
    rabbitMqUrl:process.env.RABBITMQ_URL
    
}
