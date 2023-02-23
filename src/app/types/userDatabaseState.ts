import { UserData } from "./userData";

export class UserDatabaseState {
  userState: UserState
  user: UserData

  constructor(user: UserData, userState: UserState) {
    this.user = user
    this.userState = userState
  }
}

enum UserState {
  EXISTS,
  NOT_EXISTS
}