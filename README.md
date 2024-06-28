# Omni API

Omni API is a project designed to showcase the speed and efficiency of a very fast API. It demonstrates rapid data retrieval capabilities, making it an ideal example of a high-performance API.

## Features

- Very fast search functionality
- Minimal latency for query processing
- Optimized for high performance
- Scalable architecture
- Supports :
    - Redis
    - Neon DB

## Technologies Used

- Prisma ORM
- Neon DB(PostgreSQL)
- Next.js (for frontend integration)
- Hono
- CloudFlare Workers
- Upstash
## Installation

1. Clone the repository: `https://github.com/rishabhpandey106/omni-api.git`
2. Navigate to the project directory: `cd omni-api`
3. Install dependencies: `npm install`
4. Set up environment variables: Create a `.env` file and provide the required values.
5. Set up the `wrangler.toml` file and provide the required vars values.
6. Deploy the backend on cloudflare workers: `npm run deploy`
7. Start the development server: `npm run dev`

## Usage

1. Send GET requests to `/api/search` with the query parameter `t` to search for data.
   Example: `GET /api/search?t=your-query-here`
2. Send GET requests to `/api/search/psql` with the query parameter `t` to search for data.
   Example: `GET /api/search/psql?t=your-query-here`

## Contribution

Contributions are welcome! Fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
