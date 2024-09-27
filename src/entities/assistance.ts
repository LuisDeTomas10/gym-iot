import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('assistances')
export class Assistance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ type: 'varchar', length: 100 })
  activity_type: string;

  @Column({ type: 'int' })
  repetitions: number;

  @Column({ type: 'text' })
  activity: string;

  @Column({ type: 'time' })
  check_in_time: string;

  @Column({ type: 'time', nullable: true })
  check_out_time: string | null;

  @Column({ type: 'date' })
  assistance_date: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
