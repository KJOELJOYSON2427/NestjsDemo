import { Test, TestingModule } from '@nestjs/testing';
import { FileUploadModuleService } from './file-upload-module.service';

describe('FileUploadModuleService', () => {
  let service: FileUploadModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileUploadModuleService],
    }).compile();

    service = module.get<FileUploadModuleService>(FileUploadModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
