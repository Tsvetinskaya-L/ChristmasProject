import { AppController } from './components/app/app.controller'
import { AppModel } from './components/app/app.model'
import { AppView } from './components/app/app.view'

const app = new AppController(new AppModel(), new AppView())

app.restorePage()
