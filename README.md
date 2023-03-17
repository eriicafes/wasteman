# Wasteman

Wateman is a waste management application aimed at regulating waste disposal and environmental sanitation in an intiutive and easy manner by utilizing social integrations.

### This repository consists of an Express server and a Next.js client.

## Server

To run the server application first change directory to the server:

```bash
cd server
```

Optionally provide a port to run server (the default is 5000).

```bash
PORT=# port here
```

Run application using the command below:

```bash
npm run dev
```

## Client

To run the client application first change directory to the client:

```bash
cd client
```

Run application using the command below:

```bash
npm run dev
```

## Development Tools

For ease of development the following tools are recommended:

- Prettier - Code formatter (VSCode Extension)
- Tailwind CSS IntelliSense (VSCode Extension)
- PostCSS Language Support (VSCode Extension)
- Todo Tree (VSCode Extension)

## Code Style

To maintain a uniform codebase we use prettier for enforcing code style, pull requests or commits directly to the main branch will be checked for consistency with code style.
Before your pull request is ready to merge please consider running the command below:

```bash
npm run format # checks if code style meets code style
```

For minor inconsistencies that result in only warnings when the above command is run, you can automatically fix the warning by running the command below:

```bash
npm run format # attempts to modify the code to meet code style
```
