import { Component , OnInit } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';
import { AuthService } from '../../auth/auth.service';
import { Router, ActivatedRoute } from "@angular/router";


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit{
    user:any;
    userName:string;
    FB_User:any;
    constructor(public sidebarservice: SidebarService, private auth:AuthService, private router:Router,private route: ActivatedRoute,) { }
        
    toggleSidebar() {
        this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
        
        if ($("#wrapper").hasClass("nav-collapsed")) {
            // unpin sidebar when hovered
            $("#wrapper").removeClass("nav-collapsed");
            $("#sidebar-wrapper").unbind( "hover");
        } else {
            $("#wrapper").addClass("nav-collapsed");
            $("#sidebar-wrapper").hover(
                function () {
                    $("#wrapper").addClass("sidebar-hovered");
                },
                function () {
                    $("#wrapper").removeClass("sidebar-hovered");
                }
            )
      
        }
    }
    
    getSideBarState() {
        return this.sidebarservice.getSidebarState();
    }

    hideSidebar() {
        this.sidebarservice.setSidebarState(true);
    }

    
    ngOnInit() {
        /* user auth  */

        this.auth.user_.subscribe(user =>{
            this.user = user;
            this.userName = this.user.userName;
        })

        /* Search Bar */
        $(document).ready(function () {
            $(".search-btn-mobile").on("click", function () {
                $(".search-bar").addClass("full-search-bar");
            });
            $(".search-arrow-back").on("click", function () {
                $(".search-bar").removeClass("full-search-bar");
            });
        });

    }
pro(){
    this.router.navigate(['user-profile']);
}


    logout(){
        this.auth.logout()
      }
}
