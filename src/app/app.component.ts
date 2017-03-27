import {Component, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store'

import {Platform, MenuController, Nav} from 'ionic-angular';

import {StatusBar, Splashscreen} from 'ionic-native';

import {MainPage} from '../pages/main/main';
import {LoginPage} from '../pages/login/login';
import {BalancePage} from '../pages/balance/balance';
import {ReportPage} from '../pages/report/report';
// import {
//     Push,
//     PushToken
// } from '@ionic/cloud-angular';

// import { Push, PushObject, PushOptions } from '@ionic-native/push';





import {authState, CHECK_AUTH} from '../reducers/auth.reducer';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    // make HelloIonicPage the root (or first) page
    rootPage: any;
    pages: Array<{title: string, component: any}>;
    authInfo;

    constructor(public platform: Platform,
                public menu: MenuController,
                private store: Store<authState>) {
        this.store.dispatch({type: CHECK_AUTH});
        this.initializeApp();
        this.authInfo = this.store.select('auth');


        // set our app's pages
        this.pages = [
            {title: 'Make Budget Expenses', component: MainPage},
            {title: 'Balance', component: BalancePage},
            {title: 'Expenses Report', component: ReportPage}

        ];

        // this.push.register()
        //     .then((t) => {
        //     return this.push.saveToken(t);
        // }).then((t: PushToken) => {
        //     console.log('Token saved:', t.token);
        // });
        //
        // this.push.rx.notification()
        //     .subscribe((msg) => {
        //         alert(msg.title + ': ' + msg.text);
        //     });

        this.initPushNotification();
    }
    initPushNotification(){
        // if (!this.platform.is('cordova')) {
        //     console.warn("Push notifications not initialized. Cordova is not available - Run in physical device");
        //     return;
        // }
        // let push = Push.init({
        //     android: {
        //         senderID: "853086407371"
        //     },
        //     ios: {
        //         alert: "true",
        //         badge: false,
        //         sound: "true"
        //     },
        //     windows: {}
        // });
        //
        // push.on('registration', (data) => {
        //     console.log("device token ->", data.registrationId);
        //     //TODO - send device token to server
        // });
        // push.on('notification', (data) => {
        //     console.log('message', data.message);
        //     let self = this;
        //     //if user using app and push notification comes
        //     if (data.additionalData.foreground) {
        //         // if application open, show popup
        //         // let confirmAlert = this.alertCtrl.create({
        //         //     title: 'New Notification',
        //         //     message: data.message,
        //         //     buttons: [{
        //         //         text: 'Ignore',
        //         //         role: 'cancel'
        //         //     }, {
        //         //         text: 'View',
        //         //         handler: () => {
        //         //             //TODO: Your logic here
        //         //             self.nav.push(DetailsPage, {message: data.message});
        //         //         }
        //         //     }]
        //         // });
        //         // confirmAlert.present();
        //         alert(data.message);
        //     } else {
        //         //if user NOT using app and push notification comes
        //         //TODO: Your logic on click of push notification directly
        //         self.nav.push(MainPage, {message: data.message});
        //         console.log("Push notification clicked");
        //     }
        // });
        // push.on('error', (e) => {
        //     console.log(e.message);
        // });

        // const options: PushOptions = {
        //     android: {
        //         senderID: '853086407371'
        //     },
        //     ios: {
        //         alert: 'true',
        //         badge: true,
        //         sound: 'false'
        //     },
        //     windows: {}
        // };

        // const pushObject: PushObject = this.push.init(options);
        //
        // pushObject.on('notification').subscribe(notification => console.log('Received a notification', notification));
        //
        // pushObject.on('registration').subscribe(registration => console.log('Device registered', registration));
        //
        // pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
    }

    initializeApp() {

        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
        });


    }


    openPage(page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        this.nav.setRoot(page.component);
    }

    ngOnInit() {
        this.authInfo.subscribe(a => {
            if (a.authChecked) {
                this.rootPage = (a.currentUser ? MainPage : LoginPage);
            }
        });
    }
}
