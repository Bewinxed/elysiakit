// src/routes/api/[...slugs]/+server.ts
import type { RequestHandler } from './$types';
import { app } from '../../../elysia/backend';

export const fallback = ({ request }) => app.handle(request);
