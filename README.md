# README

## 1. Setup

---

### 1.1. Initialize Project

---

```bash
npm init vite@latest hackernews-react -- --template react-ts
cd hackernews-react
npm install
```

### 1.2. Development Dependencies

---

#### 1.2.1. Prettier

---

```bash
npm install -D prettier prettier-plugin-sh
```

#### 1.2.2. ESLint

---

```bash
npm init @eslint/config
```

```log
Need to install the following packages:
  @eslint/create-config
Ok to proceed? (y) y
✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · commonjs
✔ Which framework does your project use? · react
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser, node
✔ What format do you want your config file to be in? · JavaScript

Local ESLint installation not found.
The config that you've selected requires the following dependencies:

eslint-plugin-react@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest eslint@latest
✔ Would you like to install them now with npm? · No / Yes
Installing eslint-plugin-react@latest, @typescript-eslint/eslint-plugin@latest, @typescript-eslint/parser@latest, eslint@latest

added 168 packages, and audited 278 packages in 5s

87 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
Successfully created .eslintrc.cjs file in /home/hryssmz/projects/real-world-app-ts/hackernews-react
```

```sh
npm install -D eslint-config-prettier eslint-plugin-react-hooks
```

### 1.3. Dependencies

---

#### 1.3.1. Apollo Client

---

```sh
npm install @apollo/client graphql
```
