import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard-admin-example',
  templateUrl: './dashboard-admin-example.component.html',
  styleUrls: ['./dashboard-admin-example.component.scss'],
  providers: [ApiService]
})
export class DashboardAdminExampleComponent {
    //типы шаблонов
    @ViewChild('readOnlyTemplate', {static: false}) readOnlyTemplate: TemplateRef<any>|undefined;
    @ViewChild('editTemplate', {static: false}) editTemplate: TemplateRef<any>|undefined;

    editedUser: User|null = null;
    users!: Array<User>;
    isNewRecord: boolean = false;
    statusMessage: string = "";

  constructor(private api: ApiService) {}

  ngOnInit() {}
  //загрузка пользователей
  private loadUsers() {
    this.api.getUsers().subscribe((data: Array<User>) => {
      this.users = data;
      console.log(this.users)
    });
  }



  // добавление пользователя
  addUser() {
    this.editedUser = new User('', '', 0);
    this.users.push(this.editedUser);
    this.isNewRecord = true;
  }



  // редактирование пользователя
  editUser(user: User) {
    this.editedUser = new User(user._id, user.name, user.age);
  }



  // загружаем один из двух шаблонов
  loadTemplate(user: User) {
    if (this.editedUser && this.editedUser._id === user._id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }



  // сохраняем пользователя
  saveUser() {
    if (this.isNewRecord) {
      // добавляем пользователя
      this.api.createUser(this.editedUser as User).subscribe((_) => {
        (this.statusMessage = 'Данные успешно добавлены'), this.loadUsers();
      });
      this.isNewRecord = false;
      this.editedUser = null;
    } else {
      // изменяем пользователя
      this.api.updateUser(this.editedUser as User).subscribe((_) => {
        (this.statusMessage = 'Данные успешно обновлены'), this.loadUsers();
      });
      this.editedUser = null;
    }
  }



  // отмена редактирования
  cancel() {
    // если отмена при добавлении, удаляем последнюю запись
    if (this.isNewRecord) {
      this.users.pop();
      this.isNewRecord = false;
    }
    this.editedUser = null;
  }



  // удаление пользователя
  deleteUser(user: User) {
    this.api.deleteUser(user._id).subscribe((_) => {
      (this.statusMessage = 'Данные успешно удалены'), this.loadUsers();
    });
  }
}

export class User{
  constructor(
      public _id: string,
      public name: string,
      public age: number) { }
}
