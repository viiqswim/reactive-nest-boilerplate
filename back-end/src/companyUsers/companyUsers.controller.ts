import { Controller } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";

import { User } from "../entity";
import { CompanyUsersService } from "./companyUsers.service";

@Crud({
  model: {
    type: User,
  },
  params: {
    id: {
      field: 'id',
      type: 'number',
      primary: true,
    },
    companyId: {
      field: 'userId',
      type: 'number'
    },
  },
  query: {
    join: {
      company: {},
    },
  },
})
@Controller("companies/:companyId/users")
export class CompanyUsersController implements CrudController<User> {
  constructor(public service: CompanyUsersService) {}
}
