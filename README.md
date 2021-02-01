# Timelapse Visualization

Unofficial Timelapse Visualization app. Not Splunk supported. 

## Using the app

In order to generate a timeslider for your dashboard, you'll want to create a section in "timesliders" inside of package.json. Currently there are four timesliders supported:

* Time Sliders that are broken down by Hours between two dates
* Time Sliders that are broken down by Days between two dates

In order to create these, create a dashboard. Using the dashboard_id, define inside of package.json the type of slider you want. The example below would use a different timeslider for four different dashboards, with ids timelapse1, timelapse2, timelapse3, timelapse4. 
```
"timesliders": [
        {
            "dashboard_id": "timelapse1",
            "start": "2021-01-01 00:00:00",
            "end": "2021-01-30 00:00:00",
            "style": "DaysBetween"
        },
        {
            "dashboard_id": "timelapse2",
            "start": "2020-11-01 00:00:00",
            "end": "",
            "style": "DaysSince"
        },
        {
            "dashboard_id": "timelapse3",
            "start": "2020-11-01 00:00:00",
            "end": "2020-11-07 05:00:00",
            "style": "HoursBetween"
        },
        {
            "dashboard_id": "timelapse4",
            "start": "2021-01-20 00:00:00",
            "end": "",
            "style": "HoursSince"
        }
    ]
```

## Prerequisite 
* Install [nodejs](https://nodejs.org/en/) 10.x.
* Install Splunk Enterprise locally and have $SPLUNK_HOME env variable setup.
* In Windows environment, to avoid any file permission issues start the command prompt with "Run as Administrator" to run the commands mentioned in the [Development](#development) section.

## Development
* `npm install` - install dependencies.
* `npm run dev` - start the project in dev mode. This command will symlink the project into your Splunk instance. 
* Restart your Splunk instance if it's the first time you setup this project. `Dashboard Examples .Conf 2019` application should shows up in app bar.


## How to create a new page
* Add an xml file in `resources/default/data/ui/views`.
* Modify `resources/default/data/ui/nav/default.xml` to include your new page.
* Create a new folder under `src/pages/` with the same name of the new xml file.
* Create `index.jsx` and bootstrap the page using `@splunk/react-page`.
* Restart Splunk, your new page should shows up.


# Package the app

Use the following steps to package the Dashboard app. 

Requirements:
* Make
* [Docker](https://docs.docker.com/install/)

Steps:
* Run `make build-image` to build the image to package the app.
* Run `make run` to package the app with NodeJS.
    * The app (`tgz`) will be created in the `splunkapps` folder.
* To start Splunk (`8.0`) with the dashboard app run `make start` (username: `admin` password: `changemeplease1`).
* Remove all containers run `make down`
