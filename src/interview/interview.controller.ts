import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('interview')
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post('getoneday')
  getOneDay(){
    return this.interviewService.getOneDay()
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('getallday')
  getAllDay(){
    return this.interviewService.getAllDay()
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('addInterview')
  addInterview(@Req() req){
    return this.interviewService.addInterview(req.user)
  }
}
