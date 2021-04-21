import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Survey } from "./survey";
import { User } from "./user";

@Entity("userSurvey")
class SurveyUser {
  @PrimaryColumn()
  readonly id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  user: User

  @Column()
  userId: string;

  @ManyToOne(() => Survey)
  @JoinColumn({ name: "surveyId" })
  survey: Survey

  @Column()
  surveyId: string;

  @Column()
  value: number;

  @CreateDateColumn()
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { SurveyUser };
