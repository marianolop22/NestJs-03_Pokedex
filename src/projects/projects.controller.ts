import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, StreamableFile, Res } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('rfp')
export class ProjectsController {

  private index = 0;
  private resp = [
    'llm_processing',
    'llm_processing',
    'llm_processing',
    'failed',
  ]


  constructor(private readonly projectsService: ProjectsService) {}

  
  // @UseInterceptors(FilesInterceptor('file'))
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'file', maxCount: 1 },
    { name: 'background-document', maxCount: 1 }
  ]))
  @Post()
  create(
    @Body() body: any,
    // @UploadedFiles() file: File[],
    @UploadedFiles() file: { file?: File[], bgDocument?: File[] },
    // @Res() res
    ) {

    console.log('RECIBI EL ARCHIVO', body, file[0], file[1]);
    const myFile = createReadStream(join(process.cwd(), 'dummy.pdf'));
    // console.log('ACA', myFile);

    // res.set({
    //   'Content-Type': 'image/pdf',
    // });
    // return new StreamableFile(myFile);
    // myFile.pipe(res);
    return {
        'processId': '658b4fa1f01d762cad0edf01',
        'message': 'process has been initiated'
    }

  }

  @Get(':id')
  findAll(@Param('id') id: string) {

    if (this.index < 4) {
      this.index++;
      return {
        '_id': id,
        'status': 'llm_processing'
      };
    } else {
      return {
        '_id': id,
        'status': 'document_ready'
      };
    
    }
  }

  @Get('/document/:id')
  findOne(@Param('id') id: string, @Res() res) {


    const myFile = createReadStream(join(process.cwd(), 'dummy.pdf'));
    console.log('ACA', myFile);

    res.set({
      'Content-Type': 'image/pdf',
    });
    // return new StreamableFile(myFile);
    myFile.pipe(res);

  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
