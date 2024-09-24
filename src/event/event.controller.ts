import {Body, Controller, Logger, Post} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {WebhookEntity} from "../entities/webhook.entity";
import {Repository} from "typeorm";

// @UseGuards(AuthGuard)
@Controller('api/events')
export class EventsController {
    constructor(
      @InjectRepository(WebhookEntity)
        private readonly webhookEntityRepository: Repository<WebhookEntity>
    ) {}

    @Post()
    async consumeEvent(@Body() payload: any) {
        console.log('Event received:', payload);

        const webhook = this.webhookEntityRepository.create({
          email: payload?.data?.identifiers?.email,
          data: payload,
        });

        await this.webhookEntityRepository.save(webhook);
    }
}
