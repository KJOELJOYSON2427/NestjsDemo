import { Test, TestingModule } from '@nestjs/testing';
import { FileUploadModuleController } from './file-upload-module.controller';

describe('FileUploadModuleController', () => {
  let controller: FileUploadModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileUploadModuleController],
    }).compile();

    controller = module.get<FileUploadModuleController>(FileUploadModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
