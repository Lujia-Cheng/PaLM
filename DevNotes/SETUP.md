# Guide to download this repo & aid development

## Download

> Prerequisites:
>
> - `git` (or equivalent like Github Desktop, VS Code github extension, etc. and some basic knowledge)
> - `npm` (package management program, provided by [Node.js](https://nodejs.org))

1. Find a place that you want to put this repo in. Either create a new folder or where you commonly store projects.

2. Open Terminal by right clicking folder, and clone (copy) this repo by:

   `git clone https://github.com/Lujia-Cheng/PaLM.git`

3. It might take a while. But when it's done, tell Terminal to goto the `./frontend` by

   `cd frontend`

4. This last step is definitely going to take good while, because it's downloading all the packages we need for development.

   `npm install`

## Run project 

1. Make sure we're in the `./frontend` folder by checking the terminal. It should have something like `...\(your_folder_name)\PaLM\frontend>`. If not, refer to step 3 above.

2. Simply start the app below. Or do some extra reading from React's [guide](./frontend/README.md).

   `npm start`

3. A webpage will open in your browser. And it'll automatically update as you modify the code in [App.js](./frontend/src/App.js)

## DB structures

Identify upstream db API & structures, assuming we already have database setup on AWS

## Framework & languages

TBD

## Misc

synonym handling like common abbr. aiding physician searching
