
import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { isThisMonth, startOfDay } from 'date-fns';
import { User, Profile, Item, Workspace, Group, Board, Column, KDate, FirebaseUser, KStatus, KDropdown, Column_Types, KTimeline, KPeople, KText, KNumber, KCheck_Box, KFormula, Item_Update, dummy, KDropdownOption, Item_Data } from '../Classes1';
import { FirebaseService } from '../../auth/firebase.service';
import { DBService } from '../api/DB.service';
import { Z_DATA_ERROR } from 'zlib';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { event } from 'jquery';
import { group, timeStamp } from 'console';
import { AuthService } from 'src/app/auth/auth.service';
import { ObjectID, ObjectId } from 'bson';
import { DropdownPosition } from '@ng-select/ng-select';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ItemsList } from '@ng-select/ng-select/lib/items-list';
import { Db } from 'mongodb';
import { Color } from 'highcharts';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss']
})
export class ProductionComponent implements OnInit {
  @ViewChild('imgRenderer') imgRenderer: ElementRef;
  @ViewChild('f') myNgForm;
  image: string;
  name: string;

  Dropdown_Name: string;
  Workspace_Name: string;
  color: Color;
  rgba: Color;
  searchText:string;

  ktimeline_end_date;
  //stackbliz
  Global_UserList: FirebaseUser[];
  KTimeline_: KTimeline;

  KPeople_: KPeople;

  FB_User: any;
  FirebaseUser_: FirebaseUser;

  selectedFile: File
  Name: string;
  FirstName: string;

  Column_Types_Date_: Column_Types;
  Column_Types_Status: Column_Types;
  Column_Types_Dropdown: Column_Types;
  Column_Types_Timeline: Column_Types;
  Column_Types_People: Column_Types;
  Column_Types_Text: Column_Types;
  Column_Types_Number: Column_Types;
  Column_Types_Check: Column_Types;
  Column_Types_Formula: Column_Types;
  Column_Types_dummy: Column_Types;

  List_Of_Items = [];
  List_Of_Groups =[];
  List_Of_Workspace_Access_index =[];

  newStrategyname: string;

  User_: User;
  Temp: Item;

  Loaded_Wrokspaces: Workspace[] = [];


  tempgroup: Group = new Group("tempgroup");
  tempboard: Board = new Board("tempboard");
  //tempWorkspace:Workspace=new Workspace("tempworkspace");

  Selected_Item: Item;
  Temp_Item_Update: Item_Update;
  Temp_Item_Content: string;
  Temp_Item_Files: File[];

  Temp_Drop: KDropdownOption;

  Temp_Group: Group;
  Group_Title: string;

  Board_Title: string

  Selected_Workspace_Index: number;
  Selected_Board_Index: number;
  Selected_Group_Index: number;


  images = [];




  sidenave: HTMLElement;

  constructor(private firebaseService: FirebaseService,private toast:ToastrService, private DBService_: DBService, private modalService: NgbModal, private auth: AuthService) {
  }




  ngOnInit(): void {

    this.Loaded_Wrokspaces.push(new Workspace("Default", this.FirebaseUser_));


    //Loading User data from DB


    //Loading Workspaces

    //Loading Boards

    //Loading Groups



    this.Selected_Workspace_Index = 0;
    this.Selected_Board_Index = 0;
    this.Selected_Group_Index = 0

    this.Selected_Item = new Item("Default", 0);





    this.Board_Title = "";
    this.Group_Title = "";
    this.Group_Title = "";

    this.Temp_Item_Content = "";


    this.Temp_Item_Files = [];
    this.Temp_Item_Update = new Item_Update("Temp", this.Temp_Item_Files);


    this.sidenave = document.getElementById('mySidenav');


    this.getFirebaseUsers();

    //dummy people
    this.KPeople_ = new KPeople("Users");

    this.auth.user_.subscribe(user => {
      this.FB_User = user;
      console.log("this.FB_User : " + this.FB_User.userId);

      this.Global_UserList.forEach(element => {
        if (this.FB_User.userId == element.id) {
          this.FirebaseUser_ = element;
        }
      });

      this.User_ = new User(this.FirebaseUser_);
      this.UpdateUserFristime(this.User_);

    })



    this.Column_Types_Date_ = Column_Types.date;
    this.Column_Types_Status = Column_Types.status;
    this.Column_Types_Timeline = Column_Types.timeline;
    this.Column_Types_Dropdown = Column_Types.dropdown;
    this.Column_Types_People = Column_Types.kpeople;
    this.Column_Types_Text = Column_Types.ktext;
    this.Column_Types_Number = Column_Types.number;
    this.Column_Types_Check = Column_Types.check;
    this.Column_Types_Formula = Column_Types.formula;
    this.Column_Types_dummy = Column_Types.dummy;





    this.DBService_.LoadWorkspace().subscribe((Data_: Workspace[]) => {
      this.Loaded_Wrokspaces = Data_;
      console.log("Loaded Workspaces");
      console.log(Data_);

      if(Data_.length==0){
        this.create_workspace("Default");       
       }
       
      
      // this.tempgroup.List_Of_Items=Data_;
    })
    this.DBService_.LoadTasks().subscribe((Data_: Item[]) => {
      // this.tempgroup.List_Of_Items=Data_;
    })
  }



 




  UpdateUserFristime(User_: User) {
    this.DBService_.updateUserFirsttime(User_).subscribe((Data_: any) => {
      console.log("updated User : ");
      console.log(Data_);
      //Load Data from server
      this.LoadUserDataFromServer(User_);
    })
  }


  LoadUserDataFromServer(User_: User) {
    this.DBService_.LoadUserData(User_).subscribe((Data_: any) => {
      console.log("Loaded User Data");
      console.log(Data_);
    })
  }



  openNav(item_) {
    console.log(item_);
    this.Selected_Item = item_;
    this.sidenave.classList.add('sidenav_Open');
    this.sidenave.classList.remove('sidenav_Close');
  }
  closeNav() {
    this.sidenave.classList.add('sidenav_Close');
    this.sidenave.classList.remove('sidenav_Open');
  }


  getFirebaseUsers() {
    this.firebaseService.read_users().subscribe(data => {
      this.Global_UserList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          FirstName: e.payload.doc.data()['FirstName'],
          filepath: e.payload.doc.data()['filepath'],
        };
      })
      console.log(this.Global_UserList);
    });
    return this.Global_UserList;
  }


  create_Task(group_Index: number): void {

    var tempItem: Item;

    tempItem = new Item("New Item", group_Index);

    tempItem.Item_Updates.push(new Item_Update(this.Temp_Item_Update.Item_Update_Content, this.Temp_Item_Update.Item_Update_files));

    //add all date from templeate
    for (var i = 0; i < this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].Board_Template.List_Of_Columns.length; i++) {

      switch (this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].Board_Template.List_Of_Columns[i].Column_Type) {
        case Column_Types.date:
          tempItem.List_Of_Date_columns.push(new KDate(this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].Board_Template.List_Of_Columns[i].Column_Title));
          break;

        case Column_Types.status:
          tempItem.List_Of_Status_columns.push(new KStatus("Sample samplestatus"));
          break;

        case Column_Types.timeline:
          tempItem.List_Of_Timeline_columns.push(new KTimeline("Sample Timeline"));
          break;

        case Column_Types.dropdown:
          tempItem.List_Of_Dropdown_columns.push(new KDropdown("Sample Dropdown"));
          break;

        case Column_Types.kpeople:
          tempItem.List_Of_People_columns.push(new KPeople("People"));
          break;

        case Column_Types.ktext:
          tempItem.List_Of_Text_columns.push(new KText("Text"));
          break;

        case Column_Types.number:
          tempItem.List_Of_Number_columns.push(new KNumber("Number"));
          break;

        case Column_Types.check:
          tempItem.List_Of_Check_Box_columns.push(new KCheck_Box("Check Box"));
          break;

        case Column_Types.formula:
          tempItem.List_Of_Formula.push(new KFormula("Formula"));
          break;

        case Column_Types.dummy:
          tempItem.List_Of_dummy_name_columns.push(new dummy("dummy"));
          break;
      }
    }



    //create task in DB
    this.DBService_.createTask(tempItem).subscribe((Data_: ObjectId) => {
      tempItem._id = Data_;      
      this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups[tempItem.Group_Index].List_Of_Items_id_Index.push(new Item_Data(Data_));
      this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups[tempItem.Group_Index].List_Of_Items.push(tempItem);
      console.log('temp test');
      console.log(tempItem);
      this.toast.success('New Item Create Success!', 'Success!', {
        timeOut:1500
      }); 
    })
    

  }

  DeleteTask(Item_: Item) 
  {
    const index: number = this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups[this.Selected_Group_Index].List_Of_Items.indexOf(Item_);
    if (index !== -1) {
      this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups[this.Selected_Group_Index].List_Of_Items.splice(index, 1);
    }         
    this.DBService_.DeleteTask(Item_).subscribe((list_) => {
      console.log("Delete Task_item : " + JSON.stringify(list_));
     
     this.toast.success('Task Delete Item Success!', 'Success!', {
       timeOut:1500
     });
    })
  }

  


  createTask(Item_: Item) {
    this.DBService_.createTask(Item_).subscribe((Data_: ObjectId) => {
      Item_._id = Data_;

      
    })
  }

  UpdateTask(Item_) {
    this.DBService_.UpdateTask(Item_).subscribe(Data_ => {
      console.log(Data_);
    })
  }

  UpdateUser_Database() {
    this.DBService_.updateUser(this.User_).subscribe((Data_: any) => {
      console.log("User Updated..");
    })
  }

  create_workspace(wsname: string) {

    var tempworkspace = new Workspace(wsname, this.FirebaseUser_);

    this.Loaded_Wrokspaces.push(tempworkspace);
    this.Selected_Workspace_Index = this.Loaded_Wrokspaces.length - 1;

    this.DBService_.createWorkspace(tempworkspace).subscribe((Data_: ObjectId) => {
      console.log("Created Workspace ID:");
      console.log(Data_);      
      this.User_.List_Of_Workspace_Access_index.push(new ObjectId(Data_));      
      this.UpdateUser_Database();
      this.toast.success('Workspace Create Success!', 'Success!', {
        timeOut:1500
      });
     
    })
  }

  onChange(event) {
    this.Selected_Workspace_Index = event;
    this.Selected_Board_Index = 0;
  }

  create_boards(bname: string) {
    this.printindexstatus();

    this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards.push(new Board(bname));
    this.Selected_Board_Index = this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards.length - 1;
    // this.Selected_board.Board_Title = bname; 
    
    this.toast.success('Board Create Success!', 'Success!', {
      timeOut:1500
    });    
  }

  Create_Dropdown_Option(dopname: string, kdropdown_index: number) {
    this.printindexstatus();

    console.log("kdropdown_index : " + kdropdown_index);
    this.Loaded_Wrokspaces[this.Selected_Workspace_Index].
      List_Of_Boards[this.Selected_Board_Index].
      List_Of_Groups[this.Selected_Group_Index].
      List_Of_Items[this.Selected_Group_Index].List_Of_Dropdown_columns[kdropdown_index].List_Of_Dropdown_Options.push(new KDropdownOption(dopname));

  }

  kstatus_option() {
    this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups[this.Selected_Group_Index].List_Of_Items.push()
  }



  printindexstatus() {
    console.log("************************************************************");
    console.log("this.Selected_Workspace_Index : " + this.Selected_Workspace_Index);
    console.log("this.Selected_Board_Index : " + this.Selected_Board_Index);
    console.log("this.Selected_Group_Index : " + this.Selected_Group_Index);
    console.log("************************************************************");
  }


  create_Group(gname: string) {

    this.printindexstatus();

    var nwgroup = new Group(gname);


    this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups.push(nwgroup);

    this.DBService_.UpdateWorkspace(this.Loaded_Wrokspaces[this.Selected_Workspace_Index]).subscribe(Data_ => {
      console.log(Data_);

      this.toast.success('Group Create Success!', 'Success!', {
        timeOut:1500
      });       
    })

  }

  DeleteTaskGroup(group_: Group) 
  {
    const index: number = this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups.indexOf(group_);
    if (index !== -1) {
      this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups.splice(index, 1);
    }         
    this.DBService_.DeleteTaskGroup(group_).subscribe((list_) => {
      console.log("Delete Task_Group : " + JSON.stringify(list_));
     
     this.toast.success('Task Delete Group Success!', 'Success!', {
       timeOut:1500
     });
    })
  }
 




  tabClick(event) {

    console.log(event);
    this.Selected_Board_Index = event.index;



    // this.Selected_board.Board_Title = event.tab.textLabel;
    // this.Selected_Group.Group_Title =this.Selected_board.Board_Title


  }


  create_Update() {
    this.Selected_Item.Item_Updates.push(new Item_Update(this.Temp_Item_Update.Item_Update_Content, this.Temp_Item_Update.Item_Update_files));
  }

  create_Column(Column_Types_: Column_Types): void {

    switch (Column_Types_) {

      case Column_Types.date:
        this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].Board_Template.List_Of_Columns.push
          (
            new Column("Test Date", Column_Types.date,
              this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups[0].List_Of_Items[0].List_Of_Date_columns.length)
          );

        for (var j = 0; j < this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups.length; j++) {
          for (var i = 0; i < this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups[j].List_Of_Items.length; i++) {
            this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups[j].List_Of_Items[i].List_Of_Date_columns.push(new KDate("Test Date"));
          }
        }

        break;

      case Column_Types.status:
        this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].Board_Template.List_Of_Columns.push(new Column("Test Status", Column_Types.status,
          this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups[0].List_Of_Items[0].List_Of_Status_columns.length)
        );
        for (var j = 0; j < this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups.length; j++) {
          for (var i = 0; i < this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups[j].List_Of_Items.length; i++) {
            this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups[j].List_Of_Items[i].List_Of_Status_columns.push(new KStatus("Test Status"));
          }
        }
        break;

      case Column_Types.timeline:
        this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].Board_Template.List_Of_Columns.push(new Column("Test Timeline", Column_Types.timeline,
          this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups[0].List_Of_Items[0].List_Of_Timeline_columns.length)
        );

        for (var j = 0; j < this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups.length; j++) {
          for (var i = 0; i < this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups[j].List_Of_Items.length; i++) {
            this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups[j].List_Of_Items[i].List_Of_Timeline_columns.push(new KTimeline("Test Timeline"));
          }
        }

        break;

      case Column_Types.dropdown:
        this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].Board_Template.List_Of_Columns.push(new Column("Test Dropdown", Column_Types.dropdown,
          this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups[0].List_Of_Items[0].List_Of_Dropdown_columns.length)
        );
        for (var j = 0; j < this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups.length; j++) {
          for (var i = 0; i < this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups[j].List_Of_Items.length; i++) {
            this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups[j].List_Of_Items[i].List_Of_Dropdown_columns.push(new KDropdown("Test Dropdown"));
          }
        }

        break;


      case Column_Types.kpeople:

        this.printindexstatus();

        this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].Board_Template.List_Of_Columns.push(new Column("People", Column_Types.kpeople,
          this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups[0].List_Of_Items[0].List_Of_People_columns.length)
        );

        for (var j = 0; j < this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups.length; j++) {
          for (var i = 0; i < this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups[j].List_Of_Items.length; i++) {
            this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups[j].List_Of_Items[i].List_Of_People_columns.push(new KPeople("Select People"));
          }
        }

        break;

      case Column_Types.ktext:
        this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].Board_Template.List_Of_Columns.push(new Column("Text", Column_Types.ktext,
          this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups[0].List_Of_Items[0].List_Of_Text_columns.length)
        );

        for (var j = 0; j < this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups.length; j++) {
          for (var i = 0; i < this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups[j].List_Of_Items.length; i++) {
            this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups[j].List_Of_Items[i].List_Of_Text_columns.push(new KText("Text"));
          }
        }
        break;

      case Column_Types.number:
        this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].Board_Template.List_Of_Columns.push(new Column("Number", Column_Types.number,
          this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups[0].List_Of_Items[0].List_Of_Number_columns.length)
        );

        for (var j = 0; j < this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups.length; j++) {
          for (var i = 0; i < this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups[j].List_Of_Items.length; i++) {
            this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups[j].List_Of_Items[i].List_Of_Number_columns.push(new KNumber("Number"));
          }
        }

        break;

      case Column_Types.check:
        this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].Board_Template.List_Of_Columns.push(new Column("Check", Column_Types.check,
          this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups[0].List_Of_Items[0].List_Of_Check_Box_columns.length)
        );
        for (var j = 0; j < this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups.length; j++) {
          for (var i = 0; i < this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups[j].List_Of_Items.length; i++) {
            this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups[j].List_Of_Items[i].List_Of_Check_Box_columns.push(new KCheck_Box("Check"));
          }
        }

        break;

      case Column_Types.formula:
        this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].Board_Template.List_Of_Columns.push(new Column("Formula", Column_Types.formula,
          this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups[0].List_Of_Items[0].List_Of_Formula.length)
        );
        for (var j = 0; j < this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups.length; j++) {
          for (var i = 0; i < this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups[j].List_Of_Items.length; i++) {
            this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups[j].List_Of_Items[i].List_Of_Formula.push(new KFormula("Formula"));
          }
        }
        break;


      case Column_Types.dummy:
        this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].Board_Template.List_Of_Columns.push(new Column("dummy", Column_Types.dummy,
          this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups[0].List_Of_Items[0].List_Of_dummy_name_columns.length)
        );
        for (var j = 0; j < this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups.length; j++) {
          for (var i = 0; i < this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups[j].List_Of_Items.length; i++) {
            this.Loaded_Wrokspaces[this.Selected_Workspace_Index].List_Of_Boards[this.Selected_Board_Index].List_Of_Groups[j].List_Of_Items[i].List_Of_dummy_name_columns.push(new dummy("dummy"));
          }
        }

        break;
    }

  }



  //update already items






  //Timeline Duration
  calculateDiff(start_dateOn) {

    let end_dateOnDate = new Date(this.ktimeline_end_date);

    let start_dateOnDate = new Date(start_dateOn);

    start_dateOnDate.setDate(start_dateOnDate.getDate());

    let differenceInTime = end_dateOnDate.getTime() - start_dateOnDate.getTime();
    // To calculate the no. of days between two dates
    let differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

    return differenceInDays;
  }

  /*calculateDiff(start_dateOn, end_dateOn){
     
    let todayDate = new Date();
  
  
    let start_dateOnDate = new Date(start_dateOn);
  
  
    start_dateOnDate.setDate(start_dateOnDate.getDate());
    
    
    let differenceInTime = todayDate.getTime() - start_dateOnDate.getTime();
    // To calculate the no. of days between two dates
    let differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24)); 
    return differenceInDays;
  }*/




  /*onPaste(e: any ) {
    console.log(e);
    const items = (e.clipboardData || e.originalEvent.clipboardData).items;
    let blob = null;
    for (const item of items) {
      if (item.type.indexOf('image') === 0) {
        blob = item.getAsFile();
        console.log(blob);
      }
    }
  }*/



  /**
   * Paste from clipboard
   */
  onPaste(event: any) {
    const items = (event.clipboardData || event.originalEvent.clipboardData).items;
    let blob: File = null;

    for (const item of items) {
      if (item.type.indexOf('image') === 0) {
        blob = item.getAsFile();
      }
    }

    // load image if there is a pasted image
    if (blob !== null) {
      const reader = new FileReader();
      reader.onload = (evt: any) => {
        //   console.log(evt.target.result); // data url!
        //this.imgRenderer.nativeElement.src = evt.target.result;
        this.images.push(evt.target.result);
        console.log("File Name: " + evt.target.result);
        //save local storage
        //get location src
        //store src string

        this.Temp_Item_Files.push(blob);
      };
      reader.readAsDataURL(blob);
    }
  }

  onInput(content: string) {
    console.log("New content: ", content);
  }


  /* reset(){    
     this.del(event);
     this.Temp_Item_Update.Item_Update_Content ="";     
     this.imgRenderer.nativeElement.src =  "";
      this.Temp_Item_Files;
 
   }
  */




  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }




  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          console.log(event.target.result);
          this.images.push(event.target.result);
          this.Temp_Item_Files.push(event.target.result)

        }

        reader.readAsDataURL(event.target.files[i]);
      }
    }
    event.srcElement.value = null;
  }
  deleteImage(url: any) {
    const index = this.images.indexOf(url);
    this.images.splice(index, 1);
    this.Temp_Item_Files.splice(index, 1);
  }

  del(url: any) {
    const index = this.images.indexOf(url);
    this.images.splice(index[0]);
  }

  w3_open() {
    
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("openNav").style.display = 'none';
    
  }
  w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("openNav").style.display = "inline-block";
  }
}














