import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Student } from './entities/student.entity';
import { StudentSchema } from './schema/student.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
