import { NgModule} from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ChartModule } from 'angular2-highcharts';
declare var require: any;
import { IonicApp, IonicModule} from 'ionic-angular';
import { MyApp } from './app.component';
import { MainPage } from '../pages/main/main';
import { LoginPage } from '../pages/login/login';
import { BalancePage } from '../pages/balance/balance';
import { CurrencyExchangePage } from '../pages/currency-exchange/currency-exchange';
import { CostFormPage } from '../pages/cost-form/cost-form';
import { IncreaseBalanceFormPage } from '../pages/increase-balance-form/increase-balance-form';
import { StatisticsPage } from '../pages/statistics/statistics';
import { OptionsPage } from '../pages/options/options';

import { Device } from '@ionic-native/device';

import { authEffects } from '../effects/auth.effects';
import { expensesEffects } from '../effects/expenses.effects';
import { balanceEffects } from '../effects/balance.effects';
import { tokensEffects } from '../effects/tokens.effects';
import { AngularFireModule } from 'angularfire2';
import { WrongDataService } from '../providers/alert.wrong.data';
import { ParseDataService } from '../providers/parse.data';
import { PushNotificationService } from '../providers/push.notifications';
import { CurrencyExchangeService } from '../providers/currency.exchange';
import { root } from '../reducers/root.reducer';

import { firebaseConfig } from '../config/firebase';

import { Push } from '@ionic-native/push';

import {
  CloudSettings,
  CloudModule
} from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '021362a9',
  },
  'push': {
    'sender_id': '853086407371',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};

@NgModule({
  declarations: [
    MyApp,
    MainPage,
    LoginPage,
    BalancePage,
    CurrencyExchangePage,
    CostFormPage,
    IncreaseBalanceFormPage,
    StatisticsPage,
    OptionsPage

  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    StoreModule.provideStore(root),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    }),
    EffectsModule.run(authEffects),
    EffectsModule.run(expensesEffects),
    EffectsModule.run(balanceEffects),
    EffectsModule.run(tokensEffects),
    ChartModule.forRoot(
        require('highcharts')
        , require('../../node_modules/highcharts/highcharts-more.js')
    ),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MainPage,
    LoginPage,
    BalancePage,
    CurrencyExchangePage,
    CostFormPage,
    IncreaseBalanceFormPage,
    StatisticsPage,
    OptionsPage
  ],
  providers: [WrongDataService, Push, PushNotificationService, Device, ParseDataService, CurrencyExchangeService]
})
export class AppModule {}
