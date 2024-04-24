// student.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from './../src/student/student.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from './../src/student/schema/student.schema';
import { CreateStudentDto } from './../src/student/dto/create-student.dto';
import { UpdateStudentDto } from './../src/student/dto/update-student.dto';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashedPassword'),
}));

describe('StudentService', () => {
  let service: StudentService;
  let model: Model<Student>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: getModelToken(Student.name),
          useValue: {
            new: jest.fn(),
            constructor: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
            findOne: jest.fn(),
            updateOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            findOneAndUpdate: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findOneAndRemove: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<StudentService>(StudentService);
    model = module.get<Model<Student>>(getModelToken(Student.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a student with hashed password', async () => {
      const createStudentDto: CreateStudentDto = {
          firstname: 'Test Student',
          password: 'password123',
          lastname: '',
          email: '',
          DOB: '',
          courses: []
      };

      await service.create(createStudentDto);

      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(model.prototype.save).toHaveBeenCalledWith({
        ...createStudentDto,
        password: 'hashedPassword',
      });
    });
  });

  // Add more tests for other methods (findAll, findOne, update, remove) if necessary
});
