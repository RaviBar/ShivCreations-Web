import 'next';

declare module 'next' {
  interface PageProps {
    params?: Record<string, string | string[]>; // Override params to be a plain object
    searchParams?: Record<string, string | string[]>;
  }
}