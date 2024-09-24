import { Module } from '@nestjs/common';
import {EventsController} from "./event.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {WebhookEntity} from "../entities/webhook.entity";

@Module({
    imports: [TypeOrmModule.forFeature([WebhookEntity])],
    controllers: [EventsController],
    providers: [],
})
export class EventModule {}
