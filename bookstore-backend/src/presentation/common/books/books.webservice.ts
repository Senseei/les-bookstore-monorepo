import { Injectable } from '@nestjs/common';

import { BooksService } from '@/application/books/services/books.service';
import { CreateBook } from '@/application/books/use-cases/create-book.usecase';
import { BookDTO } from '@/presentation/common/books/dtos/book.dto';
import { PaginatedResultDTO } from '@/presentation/dtos/paginated-result.dto';
import { PaginationParamsDTO } from '@/presentation/dtos/pagination-params.dto';

import { CreateBookDTO } from './dtos/create-book.dto';

@Injectable()
export class BooksWebService {
  constructor(
    private readonly service: BooksService,
    private readonly createBook: CreateBook,
  ) {}

  public async findAll(
    params: PaginationParamsDTO,
    filters: Record<string, any> = {},
  ): Promise<PaginatedResultDTO<BookDTO>> {
    const result = await this.service.findAll(
      params.page,
      params.limit,
      filters,
      params.orderBy,
    );

    return new PaginatedResultDTO(
      result.items.map((item) => new BookDTO(item)),
      result.count,
      params.limit,
      params.page,
    );
  }

  public async newBook(dto: CreateBookDTO): Promise<BookDTO> {
    return new BookDTO(await this.createBook.execute(dto));
  }

  public async findBookByIsbn(isbn: string): Promise<BookDTO> {
    return new BookDTO(await this.service.findByIsbnOrThrow(isbn));
  }

  public async findById(id: string): Promise<BookDTO> {
    return new BookDTO(await this.service.findByIdOrThrow(id));
  }
}
