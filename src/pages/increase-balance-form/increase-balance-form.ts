import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {Store} from '@ngrx/store'
import {UPDATE_BALANCE, ADD_TO_BALANCE_REPORT} from '../../reducers/balance.reducer';
import { WrongDataService } from '../../providers/alert.wrong.data';

@Component({
    selector: 'page-increase-balance-form',
    templateUrl: 'increase-balance-form.html'
})
export class IncreaseBalanceFormPage {
    data;
    balance;
    operation;
    newTotalSum;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public viewCtrl: ViewController,
                private store: Store<any>,
                public wrongData: WrongDataService) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad IncreaseBalanceFormPage');
        this.balance = this.navParams.get('balanceData');
        this.operation = this.navParams.get('operation');
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    updateTotalMoney(data) {
        let newData = this.updateMoney(data.value, this.balance);
        console.log(newData)
        if( !this.wrongData.validateTotalSum(newData) ){
            this.wrongData.showAlertError()
        }else{
            this.store.dispatch({type: UPDATE_BALANCE, payload: newData});
            console.log("ADD TO REPORT", data.value)
            this.store.dispatch({type: ADD_TO_BALANCE_REPORT, payload: data.value});
            this.dismiss();
        }

    }

    updateMoney(input, def) {
        if(this.operation === 'plus'){
            this.newTotalSum = {[input.currency]: def[input.currency] + Number(input.money)};
        }else{
            this.newTotalSum = {[input.currency]: def[input.currency] - Number(input.money)};
        }

        console.log(this.newTotalSum)

        return Object.assign({}, def, this.newTotalSum)
    }

}
