# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

### Changed

### Fixed

---

## [1.0.0-alpha.1] - 2026-02-09

First alpha release. Core flows are in place; expect changes and possible bugs.

### Added

- **Authentication** – Sign up/sign in, and session handling via Better Auth.
- **Video rooms** – Create and join rooms by language and topic.
- **Roulette matching** – Find a random partner for real-time voice/video practice.
- **WebRTC** – Peer-to-peer audio and video in rooms and roulette.
- **Real-time backend** – Socket.io for room and roulette events.
- **Redis** – Caching and presence.
- **Frontend** – React with Vite app, TanStack Router, Zustand, shadcn/ui, Tailwind CSS.
- **Backend** – Express API, MongoDB (Mongoose).
- **Docker** – 'Dockerfile' for frontend and backend, docker-compose.
- **CI/CD** – Lint scripts, GitHub Actions workflows, Husky and lint-staged for pre-commit checks.

[Unreleased]: https://github.com/vakhno/aklo/compare/v1.0.0-alpha.1...HEAD
[1.0.0-alpha.1]: https://github.com/vakhno/aklo/releases/tag/v1.0.0-alpha.1
