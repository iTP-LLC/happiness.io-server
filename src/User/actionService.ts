import { BaseService } from '../connectors/baseService'

export class ActionService extends BaseService {
  // items = items
  constructor() {
    super('action')
  }

  // TODO: replaced by actual dynamoDB api
  // start of db calls ->
  // findByIds = (ids: Array<string>): Promise<typeof items> =>
  //   new Promise(resolve =>
  //     resolve(this.items.filter(({ id: itemId }) => ids.includes(itemId)))
  //   )
  // <- end of db calls
}
