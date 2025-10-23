import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

import { UserRole } from '@/domain/user/enums/role.enum';
import { Roles } from '@/infrastructure/auth/decorators/roles.decorator';
import { JwtAuthGuard, RolesGuard } from '@/infrastructure/auth/guards';
import { AuthenticatedRequest } from '@/presentation/auth/interfaces';

import { ValidateTicketDTO } from './dtos/validate-ticket.dto';
import { TicketsSiteWebService } from './tickets-site.webservice';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.USER)
@Controller('tickets')
export class TicketsSiteController {
  constructor(private readonly webService: TicketsSiteWebService) {}

  @Post('validate')
  public async validateTicket(
    @Body() dto: ValidateTicketDTO,
    @Request() req: AuthenticatedRequest,
  ) {
    const userId = req.user.userId;
    return await this.webService.validateTicket(dto, userId);
  }
}
