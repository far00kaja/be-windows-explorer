# Elysia with Bun runtime

## Getting Started
aplikasi ini digunakan sebagai service untuk frontend windows explorer. untuk memulai aplikasi ini silahkan buat file ``.env.local`` untuk membuat environtment variable berikut untuk mengkoneksikan ke database

```
DB_USER=postgres
DB_HOST=localhost
DB_PORT=5432
DB_PASSWORD=postgres
DB_NAME=db_windows_explorer2
```

Untuk memulai aplikasi ini silahkan lakukan prompt berikut
```bash
bun install
```

## Development
To start the development server run:
```bash
bun run dev
```

## Migrate Database
```bash
bun run db:migrate
```

## Test
```bash
bun test
```

Open http://localhost:3000/ with your browser to see the result for default port.
Open http://localhost:3000/swagger with your browser to see documentation API.