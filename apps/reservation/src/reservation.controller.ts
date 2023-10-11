import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto, UpdateReservationDto } from './dto';
import { CurrentUserInterface, JwtAuthGuard, currentUser } from '@app/common';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @currentUser() user : CurrentUserInterface,
    @Body() createReservationDto: CreateReservationDto) {

    return this.reservationService.create(user ,createReservationDto);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @currentUser() user : CurrentUserInterface
  ) {
    console.log(user)
    return this.reservationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationService.update(id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationService.remove(id);
  }
}
