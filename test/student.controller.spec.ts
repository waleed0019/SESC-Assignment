// student.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './../src/student/student.controller';
import { StudentService } from './../src/student/student.service';
import { CreateStudentDto } from './../src/student/dto/create-student.dto';
import { UpdateStudentDto } from './../src/student/dto/update-student.dto';

describe('StudentController', () => {
  let controller: StudentController;
  let service: StudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [
        {
          provide: StudentService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<StudentController>(StudentController);
    service = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call student service to create a student', async () => {
      const createStudentDto: CreateStudentDto = {
          firstname: 'Test Student',
          password: 'password123',
          lastname: '',
          email: '',
          DOB: '',
          courses: []
      };

      await controller.create(createStudentDto);

      expect(service.create).toHaveBeenCalledWith(createStudentDto);
    });
  });

  // Add more tests for other controller methods (findAll, findOne, update, remove) if necessary
});
