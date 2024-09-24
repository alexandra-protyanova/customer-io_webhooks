import { Module } from '@nestjs/common';
import { EventModule } from "./event/event.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Connection } from "typeorm";
import {
  CreateUsersTable1720275859478
} from "./migrations/user-service/src/migrations/1720275859478-create-webhooks-table";
import {WebhookEntity} from "./entities/webhook.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal: true,
    }),
    EventModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        url: configService.get<string>('DATABASE_URL'),
        type: 'postgres',
        entities: [WebhookEntity],
        migrations: [CreateUsersTable1720275859478],
        synchronize: false,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}

  async onModuleInit() {
    await this.connection.runMigrations();
  }
}
