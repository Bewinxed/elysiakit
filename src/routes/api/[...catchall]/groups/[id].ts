import {t} from 'elysia'
export default (app: ElysiaApp) =>
  app.patch('', ({ params: { id }, body }) => {
    console.log(id);
    return ({ user: `user ${id} has been edited to ${body.name}}`})
  }
  , {
    params: t.Object({
      id: t.Numeric()
    },),
    body: t.Object({
        name: t.String()
        },)
        
  })
  
