import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UsePipes
} from '@nestjs/common'
import { AuthenticatedRequest } from '../commons'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto, ReadCategoryDto, RestResponse } from 'dtos'
import { createCategorySchema } from './schemas/create-category-schema'
import { JoiValidationPipe } from '../common/joi-validation-pipe'

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createCategorySchema))
  async create(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateCategoryDto
  ): Promise<RestResponse<ReadCategoryDto>> {
    return {
      message: `Created ${dto.type} category '${dto.name}' successfully`,
      data: await this.categoriesService.createCategory(req.user, dto)
    }
  }

  @Get()
  async getAllCategories(@Req() req: AuthenticatedRequest): Promise<RestResponse<ReadCategoryDto[]>> {
    return {
      message: 'Got all categories successfully',
      data: await this.categoriesService.getAllCategories(req.user)
    }
  }

  @Get(':id')
  async findOne(
    @Req() req: AuthenticatedRequest,
    @Param('id') categoryId: number
  ) {
    return await this.categoriesService.findCategoryById(req.user, categoryId)
  }
}
