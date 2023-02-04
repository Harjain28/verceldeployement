import { Routes } from '@angular/router';
import { InfluencerComponent } from '../influencer/influencer.component';
import { JobsComponent } from '../jobs/jobs.component';

export const InfluencerRoutes: Routes = [
  {
    path: '',
    redirectTo: 'influencer',
  },
  {
    path: '',
    component: InfluencerComponent
  },
  {
    path: 'jobs',
    component: JobsComponent
  },
];
