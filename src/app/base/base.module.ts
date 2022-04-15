import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { BaseComponent } from "./base.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { ValuesComponent } from "./values/values.component";
import { GalleryComponent } from "./gallery/gallery.component";
import { ReviewsComponent } from "./reviews/reviews.component";
import { MentorsComponent } from "./mentors/mentors.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { Redirection } from "../authentication.guard";

const routes: Routes = [
  {
    path: "",
    component: BaseComponent,
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full",
      },
      {
        path: "home",
        component: HomeComponent,
        canActivate: [Redirection],
      },
      {
        path: "values",
        component: ValuesComponent,
      },
      {
        path: "gallery",
        component: GalleryComponent,
      },
      {
        path: "mentor",
        component: MentorsComponent,
      },
      {
        path: "reviews",
        component: ReviewsComponent,
      },
      {
        path: "contact",
        component: ContactUsComponent,
      },
      {
        path: "test",
        loadChildren: () =>
          import("./test/test.module").then((mod) => mod.TestModule),
      },
      {
        path: "admin",
        loadChildren: () =>
          import("./admin/admin.module").then((mod) => mod.AdminModule),
      },
      {
        path: "**",
        redirectTo: "home",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "**",
    redirectTo: "base",
    pathMatch: "full",
  },
];

@NgModule({
  declarations: [
    HomeComponent,
    BaseComponent,
    NavbarComponent,
    ValuesComponent,
    GalleryComponent,
    MentorsComponent,
    ReviewsComponent,
    ContactUsComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    FormsModule,
  ],
})
export class BaseModule {}
