import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  HttpCode,
  Query
} from '@nestjs/common'
import { AuthenticatedRequest } from '../commons'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(
    @Req() req: AuthenticatedRequest,
    @Body() createCategoryDto: CreateCategoryDto
  ) {
    return await this.categoriesService.create(req.user, createCategoryDto)
  }

  @Patch(':id')
  async update(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: number,
    @Body() updateCategoryDto: Omit<UpdateCategoryDto, 'id'>
  ) {
    const updatedCategory = await this.categoriesService.update(req.user, {
      id,
      ...updateCategoryDto
    })

    return {
      code: 200,
      message: 'Updated category successfully',
      data: updatedCategory
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Req() req: AuthenticatedRequest, @Param('id') id: number) {
    await this.categoriesService.delete(req.user, id)
  }

  @Get()
  async findAll(
    @Req() req: AuthenticatedRequest,
    @Query('includes-deleted') includesDeleted?: boolean
  ) {
    return await this.categoriesService.findAll(req.user, includesDeleted)
  }

  @Get(':id')
  async findOne(
    @Req() req: AuthenticatedRequest,
    @Param('id') categoryId: number
  ) {
    return await this.categoriesService.findOne(req.user, categoryId)
  }
}
