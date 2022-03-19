import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsersComponent } from "./users/users.component";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { ReportComponent } from "./report/report.component";
import { GraphsComponent } from './graphs/graphs.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        redirectTo: "users",
        pathMatch: "full",
      },
      {
        path: "users",
        component: UsersComponent,
      },
      {
        path: "**",
        redirectTo: "users",
        pathMatch: "full",
      },
    ],
  },

  {
    path: "**",
    redirectTo: "admin",
    pathMatch: "full",
  },
];

@NgModule({
  declarations: [UsersComponent, ReportComponent, GraphsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class AdminModule {}
