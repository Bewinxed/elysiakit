import {t} from 'elysia'
export default (app: ElysiaApp) =>
  app.get('', ({ params: { id } }: {
    params: {
      id: number
    }
  }) => {
    console.log(id);
    return ({ wut: `${id} ay in paris` })
  }
  , {
    params: t.Object({
      id: t.Numeric()
    })
  })
  
