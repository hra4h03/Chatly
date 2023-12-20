# Chatly

Chatly is a simple chat application built with React and Nest. It allows users to create chat rooms and send messages to each other in real time.
The messages are not stored in a database, so they are lost when the server is restarted.

## Installation

```bash
$ pnpm --filter client install
$ pnpm --filter server install
```

## Running the app

```bash
# development
$ pnpm --filter client run start:dev
$ pnpm --filter server run start:dev
```