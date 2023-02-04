import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 
import { InfluencerComponent } from '../influencer/influencer/influencer.component'; 
import { RouterModule } from '@angular/router';
import { InfluencerRoutes } from './routes/influencer-routing.module';
import { JobsComponent } from './jobs/jobs.component';

@NgModule({
  declarations: [InfluencerComponent, JobsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(InfluencerRoutes),
  ],
  providers: []
})
export class InfluencerModule {}
