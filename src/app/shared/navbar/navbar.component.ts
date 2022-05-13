import { Component , OnInit } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';
import { AuthService } from '../../auth/auth.service';
import { Router, ActivatedRoute } from "@angular/router";
import { DBService } from '../../dashboard/api/DB.service';
import { User, Task, FirebaseUser, KStatus, KstatusOption,createddate,Deadline } from '../../dashboard/Classes';
import { ObjectId } from 'bson';
import { FirebaseService } from 'src/app/auth/firebase.service';
import { SearchdataService } from 'src/app/dashboard/api/searchdata.service';
import { event } from 'jquery';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit{
    user:any;
    userName:string;
    FB_User:any;
    searchText;
    user_remove;
    constructor(private searchdata:SearchdataService,public sidebarservice: SidebarService, private auth:AuthService, private router:Router,private route: ActivatedRoute,  private DBService_: DBService,  private firebaseService:FirebaseService,  ) {

        
     }
        
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
    search(data){
        this.searchdata.getsearchdata(data);     
       
    }

    Search(event){
        this.DBService_.findToDolist(event).subscribe((list_) => {
            console.log("Find : " + JSON.stringify(event));            
          })
    }



pro(){
    this.router.navigate(['user-profile']);
}







    logout(){
        this.auth.logout();
        //local storage remove item       
        localStorage.removeItem("user");
        //local storage Remove All 
        //localStorage.clear();
      }
}
