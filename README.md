# GraphiQL App

Hello, my dear reader. If you here, you must know next. This project was created by "Chill&Fun", a group of students
Rolling Scope School.

This project serves as a GraphQL sandbox where you can test your queries. The application supports various endpoints.
The application is developed using React.js, with Redux Toolkit employed as the state manager. React-router is used for routing, and the
project is built using Vite. For more detailed information about the project, please refer to the package.json file.
Commands and project structure are described below.

## Get started

1. Clone this repository `git clone https://github.com/SlavaPankov/GraphiQL-App`
2. Change directory to eCommerce `cd ./GraphiQL-app`
3. Install all dependencies `npm install`

## Usage

1. Start project on development server `npm run dev`
2. Production build `npm run build`
3. Development build `npm run prepare`
4. Check ESLint errors `npm run lint`
5. Install husky `npm run prepare`
6. Fix prettier errors `npm run format:fix`
7. Check types `npm run typecheck`
8. Run tests `npm run test`
9. Run tests with coverage info `npm run test:coverage`
10. Run tests in dev mode `npm run test:dev`

## Structure folder

```
├── public                          # static assets
|   ├── fonts                       # project fonts (woff2)
|   ├── localization                # localization folder
|   ├── styles                      # styles
├── src                             # sources files
|   ├── __tests__                   # tests files
|   |   ├── cfg                     # configuration files for tests
|   |   ├── components              # tests for components
|   |   ├── mocks                   # data mocks
|   |   ├── pages                   # tests for pages
|   |   └── utils                   # tests for utils
|   ├── assets                      # static assets
|   |   ├── images                  # project images
|   |   └── styles                  # global styles for project
|   |       ├── mixins              # mixins folder
|   |       ├── _fonts.scss         # mixin for fonts
|   |       ├── _mixins.scss        # mixin inclusions file
|   |       ├── _settings.scss      # base project settings
|   |       ├── _vars.scss          # style vars for project
|   |       └── main.scss           # global styles for project
|   ├── components                  # client components folder
|   ├── context                     # contexts folder
|   ├── firebase                    # folder for firebase settings
|   ├── hooks                       # custom project hooks
|   ├── pages                       # client pages folder
|   ├── store                       # store folder
|   ├── types                       # types folder
|   |   ├── enums                   # global enums folder
|   |   ├── intefaces               # global interfaces folder
|   |   └── types                   # global types folder
|   ├── utils                       # utils for project
|   ├── App.tsx                     # App component
|   └── main.tsx                    # main component
└── .eslintrc.cjs                   # ESLint settings
└── .gitignore                      # gitignore file
└── .prettierrc                     # prettier settings
└── index.html                      # base template
└── package.json                    # file with build settings and installed packages
└── README.md                       # build documentation
└── tsconfig.json                   # typescript configuration file
└── tsconfig.node.json              # typescript configuration in node.js environment
└── vite.config.ts                  # vite configuration file
```
