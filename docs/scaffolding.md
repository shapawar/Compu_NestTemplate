## `Nest Scoffolding Structure for compumatrice's projects`

```
Nest-Scaffolding
├── dbscript                   # DB scripts
├── dist                       # Production deployment file
    └── ...    
├── docs                       # Docs files 
├── logs
    ├── all.logs.log           # Logging files
    └──  ... 
├── secured                    # For security files       
├── src                        # Typescript starter files
    ├── devutils               # For DEV utility(Only for development)         
        ├── users  
            └── ...  
    ├── errorcodes                 # For custom error codes and messages configuration      
        └── ...        
    ├── interfaces                 # Interface files   
        ├──  metadata.interface.ts
        ├──  task.interface.ts
        └── ...
    ├── middleware                 # Middleware files
        ├── auth.middleware.ts 
        ├── default.middleware.ts 
        ├── errorhandler.middleware.ts 
        ├── logger.middleware.ts       
        └──  ...                                
    ├──  ping                       # Ping route for helth check
        ├──  ping.controller.ts  
        └── ... 
    ├──  Views                      # View files
        ├──  main.ejs 
        └── ... 
    ├──  app.module.ts              # Parent file module
    ├──  main.ts                    # Entry file 
    └── ...       
├── test                            # Test case files     
    └── ...
├── .gitignore                      # Gitignore files
├── package.json                    # package.json files
├── README.md                       # README file
├── tsconfig.json                   # tsconfig file 
└── tslint.json                     # tslint file

```

## `Scaffolding in details`


# dbscript:
* This dirctory used for store appilication tables query, functions, stored procedures, triggers function and more information about application database.

# dist:
* This directory includes all metadata of src file used for running on production level

# docs:
* This directory includes all docs file with .md extention and app design documentation.

# logs:
 * This file contains all auto generated log files by winston.

# secured:
 * All security related stuff will go here.

# src:
 * This directory contain all subdirectory that directory used for development purpose.

 ## devutils
 * This directory is used for implementing all bussiness logic purpose and used for development purpose to build and unit test block code quickly to minimize errors if any while developing main functionalities.

 ## errorcodes:
 * This file contains the error handler functions and also used for setting up error configuration that are used for handling error in whole applications.

## interface
* This directory contains all interfaces files.

### metadata.interfaces.ts
* This file are used to create metadata object and send to every api response.

## middleware:
* It includes all middlewares that will usefull in whole application e.g. auth.middleware.js, default.middleware.js 

### auth.middleware.ts
* This file is used for handle autehntication of user before processing any data/method.

### default.middleware.ts
* This file is used for bind the value to api response data and execute br before processing any data/method.

### error.middleware.ts
* This file is used for handling custom error and system error generated  from thought out whole application.

### logger.middleware.ts
* This file is used for configuring all logger functionality that are used for prints log in console as well as write error logs into log file

## ping:
* This directory includes ping route and that will be usefull for app helth check 

## views
 * This directory contains all users view files.

## app.module.ts
* This file is used for initialize all module, service, and contoller.

## main.ts
* This file is useful for initializ component based routing, modules,custom and default middlewares.

# test
 * This directory file inclued all test cases files.

# .gitignore
 * This file used for avoiding push unwanted code to github/svn.


# package.json:
* This file includes dependencies, devDependencies, scripts to run app, and more.


