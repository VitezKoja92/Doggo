# DoggoApp

DoggoApp is the application is meant to be used by dog breeders in order to keep records about their dogs. 

## Learnig phase and useful tips for app development

### Ionic

* Everytime we create a new service we need to **provide** it in `app.module.ts` in order to be able to use it. We can do that by adding `NewService` in `providers` part of the `app.module.ts`, or we can create a shared module, used only for services, **provide** our `NewService` in that module, end then **import** a shared module in `app.module.ts` by adding it in `imports` part. Check the [link](https://angular-2-training-book.rangle.io/handout/modules/shared-modules-di.html).

* We use `<ion-navbar>` to add elements in the navigation bar. E.g. If we want to add a button, conaining '+' icon on the right part of the navigation bar, we will use the following code: 
    ```html
    <ion-navbar>
        <ion-buttons end>
            <button ion-button icon-only>
                <ion-icon name="add" (click)="method()"></ion-icon>
            </button>
        </ion-buttons>
    </ion-navbar>
    ```
    Note that `end` means that it will be on the right side of the navigation bar, `icon-only` means that it won't have the background and border, but only the icon.

* Regarding the button, if we add `block` directive, we make sure that the button will span the full width of its parent. To do so, we also need to add `ion-button` directive to that button, as in the following example:

    ```html
    <button ion-button block>My Button</button>
    ```

* Each page has it's own built-in methods:
    * ionViewDidLoad - gets triggered when the page is loaded
    * ionViewWillEnter - is executed whenever the page is about to be loaded
    * ionVewDidEnter - is executed whenever we enter the page, no metter if the whole content of the page is loaded
    Check others at [link](https://ionicframework.com/docs/api/navigation/NavController/).

* Use `navCtrl.push(newPage)` in order to add page to the stack, but as we don't want to have pages repeating in our stack of pages, we should also use `navCtrl.pop()` in order to remove page from the stack. This can be used in case of 'Back' button, or in case of button which being pressed leads to the previous page.

* Each Ionic app is able to `import Storage from '@ionic/storage'`. This will enable us to use different kind of storages. If we use ionic as a web app, it will probably use LocalStorage, otherwise, if we run it on a phone, it will use phone's memory or SQLite database. After importing this, we can inject it using constructor in any page. In most of the cases it should be injected in some service which will communicate with the database. When we inject a service (Storage) in another service (OurService), we need to announce that OurService is `@Injectable()`. Another thing that needs to be done is providing Storage in `app.module.ts` or in shared module. After injecting we can add data, or get data from the storage:
    * `this.storage.set('doggos', this.localVaraiableForDoggos);`
    * `this.storage.get('doggos')`. Keep in mind that get returns an promise, so we need to call `.then` on it.

* In [native](https://ionicframework.com/docs/native/) section of ionic documentation we can find all tthe packages that cordova provide to us. These can be used for implementing all native device's features e.g. camera, storage, location etc.

* As we use navigation controller, we can also use `ModalController`. This controller enables us to pop up some layout over the current page. This layout will slide from the bottom and occupie the screen. It can contain any page we want: 
    ```typescript
    this.modalCtrl.create(MyDoggoPage, params);
    ```
    We can see that we can pass **params** to each Modal, and they can be accessed in Modal by injecting `private navParams: NavParams`, and by using `this.navParams.data` we can access all of them. **NavParams** can be used also in case of pages, literally anywhere where NavController is used. ModalController is not the part of the stack of pages, so in order to close it (make it slide down) we need to use `ViewController` in `MyDoggoPage`, in the following way: 
    ```typescript
    this.viewCtrl.dismiss();
    ```

* We can use [AngularMaps](https://angular-maps.com/) in case we need to show some location in our app. This package is used to provide google maps into an angular app. In order to configure angular google maps, we need to provide the [API key](https://developers.google.com/maps/documentation/javascript/?hl=de) in `app.module.ts`. We do this by adding the following code in `imports` part of the module:
    ```typescript
        imports: [
            AgmCoreModule.forRoot({
                apiKey: 'generatedAPIKey'
            })
        ]
    ```

* Useful [link](https://codingthesmartway.com/angular-4-3-httpclient-accessing-rest-web-services-with-angular/) for fetching data from angualr services.

### Node.js

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Give examples
```

### Installing

A step by step series of examples that tell you have to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Danilo Krasić** - [GitHub](https://github.com/VitezKoja92)

## License

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
