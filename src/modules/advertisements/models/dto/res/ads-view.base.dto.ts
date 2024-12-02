import { ApiProperty } from '@nestjs/swagger';

export class AdsViewsResDto {
  @ApiProperty({ example: 100, description: 'Total number of views' })
  totalViews: number;

  @ApiProperty({ example: 10, description: 'Number of views today' })
  dailyViews: number;

  @ApiProperty({ example: 50, description: 'Number of views this week' })
  weeklyViews: number;

  @ApiProperty({ example: 80, description: 'Number of views this month' })
  monthlyViews: number;
}
