import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'webhooks' })
export class WebhookEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar' })
    email: string;

    @Column({ type: 'json'})
    data: object;

    @CreateDateColumn({
      name: 'created_at',
    })
    createdAt: Date;
}